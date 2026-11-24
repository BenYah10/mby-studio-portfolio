
/**
 * MBY Studio — Recommendation OTP Redis transport
 * R2.21-I.8.2 | Test environment only
 *
 * Server-only access to Upstash Redis REST.
 * Supports atomic Lua operations through EVAL.
 *
 * No logging of secrets, OTPs or personal information.
 * Fails closed when Redis is unavailable.
 */

import "server-only";

type RedisScriptResult = {
  ok: boolean;
  result: unknown;
};

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Execute an atomic Lua script against Upstash Redis.
 *
 * Scripts must be defined by trusted server code.
 * Never pass visitor-supplied Lua source.
 */
export async function executeRecommendationOtpScript(
  script: string,
  keys: readonly string[],
  args: readonly string[]
): Promise<RedisScriptResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (
    !url ||
    !url.startsWith("https://") ||
    !token ||
    !script ||
    keys.length === 0
  ) {
    return { ok: false, result: null };
  }

  try {
    const response = await fetch(url.replace(/\/$/, ""), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        script,
        String(keys.length),
        ...keys,
        ...args,
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
    });

    if (!response.ok) {
      return { ok: false, result: null };
    }

    const data: unknown = await response.json();

    if (
      !isRecord(data) ||
      data.error != null ||
      !Object.prototype.hasOwnProperty.call(data, "result")
    ) {
      return { ok: false, result: null };
    }

    return {
      ok: true,
      result: data.result,
    };
  } catch {
    return { ok: false, result: null };
  }
}
