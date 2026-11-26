"use client";

/**
 * MBY Studio — Professional recommendation form
 * R2.21-H.11 | Bilingual local preview only
 *
 * R10.3C: Development-only OTP submission workflow; publication remains manual.
 * Legal consent text is imported from the established catalog.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { routePaths } from "@/i18n/routes";
import {
  RECOMMENDATION_CONSENTS,
  RECOMMENDATION_CONSENT_TYPES,
  type RecommendationConsentType,
  type RecommendationLocale,
} from "@/lib/recommendation-consents";
import { getRecommendationFormCopy } from "@/lib/recommendation-form-copy";
import { getRecommendationFormOptions } from "@/lib/recommendation-form-options";
import { normalizeLinkedInProfileUrl } from "@/lib/recommendation-linkedin";
import styles from "./recommendation-form.module.css";

type Props = { locale: RecommendationLocale };
type FormFields = {
  fullName: string;
  email: string;
  linkedin: string;
  role: string;
  organization: string;
  sectorOther: string;
  relationship: string;
  quote: string;
};

// The public form is enabled only through an explicit build-time switch.
// API permissions are enforced independently on the server.
const formUiEnabled = process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_MBY_RECOMMENDATIONS_ENABLED === "true";
const turnstileSiteKey = process.env.NEXT_PUBLIC_MBY_TURNSTILE_SITE_KEY || "";

type Stage = "editing" | "requesting" | "code" | "verifying" | "verified" | "submitting" | "complete";
type ApiSuccess = { ok: true; challenge_id?: string; confirmation_token?: string };

const initialFields: FormFields = {
  fullName: "", email: "", linkedin: "", role: "", organization: "",
  sectorOther: "", relationship: "", quote: "",
};

const initialPermissions = Object.fromEntries(
  RECOMMENDATION_CONSENT_TYPES.map(type => [type, false])
) as Record<RecommendationConsentType, boolean>;

function getInitials(fullName: string): string {
  return fullName.trim().split(/\s+/).filter(Boolean)
    .map(part => Array.from(part)[0]?.toLocaleUpperCase() ?? "").join(".");
}

export function RecommendationForm({ locale }: Props) {
  const copy = getRecommendationFormCopy(locale);
  const options = getRecommendationFormOptions(locale);
  const catalog = RECOMMENDATION_CONSENTS[locale];

  const [fields, setFields] = useState<FormFields>(initialFields);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [identityChoice, setIdentityChoice] = useState<"fullName" | "initials">("initials");
  const [sectorChoice, setSectorChoice] = useState("");
  const [templateChoice, setTemplateChoice] = useState("");
  const [linkedinTouched, setLinkedinTouched] = useState(false);
  const [stage, setStage] = useState<Stage>("editing");
  const [challengeId, setChallengeId] = useState("");
  const [confirmationToken, setConfirmationToken] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackKind, setFeedbackKind] = useState<"info" | "error">("info");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);

  // Same client-side Turnstile mechanism as the Contact form. A token is
  // consumed when requesting the code; the final POST requires a fresh one.
  useEffect(() => {
    if (!formUiEnabled || !turnstileSiteKey || !scriptReady ||
        !turnstileContainer.current || !window.turnstile || turnstileId.current) return;
    const id = window.turnstile.render(turnstileContainer.current, {
      sitekey: turnstileSiteKey,
      callback: (value: unknown) => setTurnstileToken(String(value)),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    turnstileId.current = id;
    return () => {
      window.turnstile?.remove?.(id);
      turnstileId.current = null;
    };
  }, [scriptReady]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (turnstileId.current) window.turnstile?.reset(turnstileId.current);
  }

  function invalidateApproval() {
    // Any change invalidates a previously verified exact submission snapshot.
    setStage("editing");
    setChallengeId("");
    setConfirmationToken("");
    setOtpCode("");
    setFeedback("");
  }

  const busy = stage === "requesting" || stage === "verifying" || stage === "submitting";
  const locked = busy || stage === "complete";

  const validLinkedin = normalizeLinkedInProfileUrl(fields.linkedin);

  const publicIdentity = useMemo(
    () => identityChoice === "fullName"
      ? fields.fullName.trim()
      : getInitials(fields.fullName),
    [identityChoice, fields.fullName]
  );

  const sectorValue = sectorChoice === "other"
    ? fields.sectorOther.trim()
    : options.sectors.find(item => item[0] === sectorChoice)?.[1] ?? "";
  const needsSector = fields.organization.trim().length === 0;
  const selectedTemplate = options.templates.find(item => item.id === templateChoice);

  function updateField(key: keyof FormFields, value: string) {
    if (locked) return;
    invalidateApproval();
    setFields(previous => ({ ...previous, [key]: value }));
  }

  function updatePermission(type: RecommendationConsentType, granted: boolean) {
    if (locked) return;
    invalidateApproval();
    setPermissions(previous => ({ ...previous, [type]: granted }));
  }

  function inputField(
    key: keyof FormFields,
    label: string,
    config: { required?: boolean; type?: string; maxLength?: number; minLength?: number } = {}
  ) {
    return (
      <label className={styles.label} key={key}>
        <span>{label}{config.required ? " *" : ""}</span>
        <input
          className={styles.control}
          disabled={locked}
          type={config.type ?? "text"}
          value={fields[key]}
          required={config.required}
          minLength={config.minLength}
          maxLength={config.maxLength}
          autoComplete={key === "fullName" ? "name" : key === "email" ? "email" : "off"}
          onChange={event => updateField(key, event.target.value)}
        />
      </label>
    );
  }

  function normalizedData() {
    return {
      author_full_name: fields.fullName.trim(),
      author_email: fields.email.trim().toLowerCase(),
      professional_role: fields.role.trim(),
      organization_name: fields.organization.trim(),
      industry_sector: sectorValue,
      professional_relationship: fields.relationship.trim(),
      linkedin_url: validLinkedin ?? "",
      locale,
      quote: fields.quote.trim(),
    };
  }

  function consentInputs() {
    return RECOMMENDATION_CONSENT_TYPES.map(type => {
      const granted = !!permissions[type];
      let value: string | undefined;
      if (granted) {
        if (type === "publish_identity") value = publicIdentity;
        if (type === "publish_role") value = fields.role.trim();
        if (type === "publish_organization") value = fields.organization.trim();
        if (type === "publish_industry_sector") value = sectorValue;
        if (type === `publish_relationship_${locale}`) value = fields.relationship.trim();
        if (type === "publish_linkedin") value = validLinkedin ?? undefined;
      }
      return value ? { type, granted, value } : { type, granted };
    });
  }

  function isValidSubmission() {
    const data = normalizedData();
    return data.author_full_name.length >= 2 && data.author_full_name.length <= 120 &&
      /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.author_email) &&
      data.author_email.length <= 254 &&
      data.professional_role.length >= 2 && data.professional_role.length <= 150 &&
      data.organization_name.length <= 180 && data.industry_sector.length <= 120 &&
      !!(data.organization_name || data.industry_sector) &&
      data.professional_relationship.length >= 5 && data.professional_relationship.length <= 250 &&
      !!validLinkedin && data.quote.length >= 20 && data.quote.length <= 4000 &&
      (!permissions.publish_organization || !!data.organization_name) &&
       (!permissions.publish_industry_sector || !!data.industry_sector) &&
      !permissions[`publish_relationship_${locale === "fr" ? "en" : "fr"}`] &&
      RECOMMENDATION_CONSENT_TYPES.every(type => !catalog[type].required || permissions[type]);
  }

  // Explain missing/invalid fields and *required* authorizations on an attempted action.
  // This is UX only: isValidSubmission() and all server validation stay in place.
  function getValidationIssues(): string[] {
    const data = normalizedData();
    const problems: string[] = [];
    if (data.author_full_name.length < 2 || data.author_full_name.length > 120) problems.push(copy.fields.fullName);
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.author_email) || data.author_email.length > 254) problems.push(copy.fields.email);
    if (!validLinkedin) problems.push(copy.fields.linkedin);
    if (data.professional_role.length < 2 || data.professional_role.length > 150) problems.push(copy.fields.role);
    if (data.organization_name.length > 180) problems.push(copy.fields.organization);
    if (!data.organization_name && !data.industry_sector) problems.push(copy.fields.sector);
    if (data.industry_sector.length > 120) problems.push(copy.fields.sector);
    if (data.professional_relationship.length < 5 || data.professional_relationship.length > 250) problems.push(copy.fields.relationship);
    if (data.quote.length < 20 || data.quote.length > 4000) problems.push(copy.fields.quote);
    if (permissions.publish_organization && !data.organization_name) problems.push(copy.fields.organization);
    if (permissions.publish_industry_sector && !data.industry_sector) problems.push(copy.fields.sector);
    for (const type of RECOMMENDATION_CONSENT_TYPES) {
      if (catalog[type].required && !permissions[type]) {
        problems.push(catalog[type].label);
      }
    }
    if (permissions[`publish_relationship_${locale === "fr" ? "en" : "fr"}`]) {
      problems.push(locale === "fr" ? "Autorisation de traduction non applicable" : "Non-applicable translation permission");
    }
    return Array.from(new Set(problems));
  }

  function reportIncompleteSubmission() {
    const problems = getValidationIssues();
    setFeedbackKind("error");
    setFeedback(
      (locale === "fr" ? "Veuillez compléter ou corriger les champs et autorisations obligatoires :" : "Please complete or correct the required fields and permissions:") +
      (problems.length ? "\n• " + problems.join("\n• ") : "\n" + (locale === "fr" ? "Vérifiez les données saisies." : "Please review your entries."))
    );
  }
  async function postJson(endpoint: string, data: Record<string, unknown>): Promise<ApiSuccess> {
    const response = await fetch(endpoint, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), cache: "no-store",
    });
    if (!response.ok) throw new Error(String(response.status));
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) throw new Error("invalid response");
    return result as ApiSuccess;
  }

  async function requestCode() {
    if (!formUiEnabled || busy) return;
    if (!isValidSubmission()) {
      reportIncompleteSubmission();
      return;
    }
    if (!turnstileToken) {
      setFeedbackKind("error"); setFeedback(locale === "fr" ? "Terminez la vérification antispam." : "Complete the anti-spam verification.");
      return;
    }
    setStage("requesting"); setFeedback("");
    try {
      const result = await postJson("/api/recommendations/otp/request/", {
        email: normalizedData().author_email, locale, token: turnstileToken, website: "",
      });
      if (typeof result.challenge_id !== "string") throw new Error("missing challenge");
      setChallengeId(result.challenge_id);
      setOtpCode("");
      setStage("code");
      setFeedbackKind("info"); setFeedback(locale === "fr" ? "Code envoyé. Vérifiez votre boîte courriel (validité : 10 minutes)." : "Code sent. Check your inbox (valid for 10 minutes).");
    } catch {
      setStage("editing");
      setFeedbackKind("error");
      setFeedback(
      locale === "fr"
       ? "Impossible d’envoyer le code de vérification. Veuillez réessayer plus tard."
       : "Unable to send the verification code. Please try again later."
   );
    } finally { resetTurnstile(); }
  }

  async function verifyCode() {
    if (!formUiEnabled || stage !== "code" || !/^\d{6}$/.test(otpCode) || !challengeId) return;
    setStage("verifying"); setFeedback("");
    try {
      const result = await postJson("/api/recommendations/otp/verify/", {
        ...normalizedData(), consents: consentInputs(), challenge_id: challengeId, code: otpCode,
      });
      if (typeof result.confirmation_token !== "string" || result.confirmation_token.length !== 64) throw new Error("invalid confirmation");
      setConfirmationToken(result.confirmation_token);
      setStage("verified");
      setFeedbackKind("info"); setFeedback(locale === "fr" ? "Courriel vérifié. Terminez la vérification antispam pour envoyer la recommandation." : "Email verified. Complete the anti-spam verification to submit your recommendation.");
    } catch {
      setStage("code");
      setFeedbackKind("error"); setFeedback(locale === "fr" ? "Code invalide, expiré ou vérification indisponible. Vérifiez le code ; après expiration, recommencez la demande." : "Invalid or expired code, or verification unavailable. Check the code; request a new one after expiry.");
    }
  }

  async function submitRecommendation() {
    if (!formUiEnabled || stage !== "verified" || !challengeId || !confirmationToken || busy) return;
    if (!isValidSubmission()) {
      reportIncompleteSubmission();
      return;
    }
    if (!turnstileToken) {
      setFeedbackKind("error"); setFeedback(locale === "fr" ? "Terminez la nouvelle vérification antispam." : "Complete the new anti-spam verification.");
      return;
    }
    setStage("submitting"); setFeedback("");
    try {
      await postJson("/api/recommendations/", {
        ...normalizedData(), consents: consentInputs(), challenge_id: challengeId,
        confirmation_token: confirmationToken, token: turnstileToken, website: "",
      });
      setStage("complete");
      setFeedbackKind("info"); setFeedback(locale === "fr" ? "Recommandation reçue pour examen. Aucune publication automatique." : "Recommendation received for review. No automatic publication.");
    } catch {
      // The final API consumes the confirmation before writing to PostgreSQL.
      // Never retry automatically: the user must start a new OTP workflow.
      setStage("editing"); setChallengeId(""); setConfirmationToken(""); setOtpCode("");
      setFeedbackKind("error"); setFeedback(locale === "fr" ? "Soumission non confirmée. Vérifiez si la recommandation a été reçue avant de recommencer avec un nouveau code." : "Submission not confirmed. Check whether it was received before requesting a new code.");
    } finally { resetTurnstile(); }
  }

  function insertTemplate() {
    if (!selectedTemplate) return;
    // Avoid silently destroying text already written by an author.
    if (fields.quote.trim() && !window.confirm(options.templateConfirm)) return;
    updateField("quote", selectedTemplate.text);
  }

  return (
    <div className={styles.form}>
      <header>
        <h1 className={styles.pageTitle}>{copy.title}</h1>
        <p className={styles.intro}>{copy.introduction}</p>
        <p className={styles.help}>
  {locale === "fr"
    ? "Votre participation est volontaire. Avant de transmettre vos renseignements, veuillez consulter notre "
    : "Your participation is voluntary. Before submitting your personal information, please review our "}
  <Link
    href={routePaths.privacy[locale]}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "underline" }}
  >
    {locale === "fr"
      ? "politique de confidentialité"
      : "privacy policy"}
  </Link>
  {"."}
</p>
      </header>

      <section className={styles.section} aria-labelledby="recommendation-identity">
        <h2 id="recommendation-identity" className={styles.sectionTitle}>{copy.sections.identity}</h2>
        <p className={styles.help}>{copy.hints.privateIdentity}</p>
        {inputField("fullName", copy.fields.fullName, { required: true, minLength: 2, maxLength: 120 })}
        {inputField("email", copy.fields.email, { required: true, type: "email", maxLength: 254 })}
        <label className={styles.label} htmlFor="recommendation-linkedin-url">
          <span>{copy.fields.linkedin} *</span>
          <input
            id="recommendation-linkedin-url"
            className={styles.control}
            disabled={locked}
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            maxLength={500}
            required
            value={fields.linkedin}
            placeholder="https://www.linkedin.com/in/nom-du-profil"
            aria-invalid={linkedinTouched && !!fields.linkedin.trim() && !validLinkedin}
            aria-describedby="recommendation-linkedin-help recommendation-linkedin-feedback"
            onChange={event => updateField("linkedin", event.target.value)}
            onBlur={() => {
              setLinkedinTouched(true);
              const normalized = normalizeLinkedInProfileUrl(fields.linkedin);
              if (normalized) updateField("linkedin", normalized);
            }}
          />
        </label>
        <p id="recommendation-linkedin-help" className={styles.help}>{copy.hints.linkedin}</p>
        <p id="recommendation-linkedin-feedback" className={validLinkedin ? styles.successHint : styles.errorHint} role="status">
          {fields.linkedin.trim()
            ? validLinkedin
              ? locale === "fr"
                ? "Format du lien LinkedIn valide (propriété du compte non vérifiée)."
                : "Valid LinkedIn URL format (account ownership not verified)."
              : linkedinTouched
                ? locale === "fr"
                  ? "Entrez un profil individuel LinkedIn : linkedin.com/in/nom-du-profil."
                  : "Enter an individual LinkedIn profile: linkedin.com/in/profile-name."
                : ""
            : locale === "fr"
              ? "Exemple : linkedin.com/in/nom-du-profil (https:// sera ajouté automatiquement)."
              : "Example: linkedin.com/in/profile-name (https:// will be added automatically)."}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="recommendation-professional">
        <h2 id="recommendation-professional" className={styles.sectionTitle}>{copy.sections.professional}</h2>
        {inputField("role", copy.fields.role, { required: true, minLength: 2, maxLength: 150 })}
        {inputField("organization", copy.fields.organization, { minLength: 2, maxLength: 180 })}
        <label className={styles.label}>
          <span>{copy.fields.sector}{needsSector ? " *" : ""}</span>
          <select
            className={`${styles.control} ${styles.select}`}
            disabled={locked}
            value={sectorChoice}
            required={needsSector}
            onChange={event => {
              const next = event.target.value;
               invalidateApproval();
               setSectorChoice(next);
              if (next !== "other") updateField("sectorOther", "");
            }}
          >
            <option value="">{options.sectorLabel}</option>
            {options.sectors.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
            <option value="other">{options.sectorOther}</option>
          </select>
        </label>
        {sectorChoice === "other" && (
          <label className={styles.label}>
            <span>{options.sectorOtherLabel} *</span>
            <input
              className={styles.control}
              disabled={locked}
              value={fields.sectorOther}
              onChange={event => updateField("sectorOther", event.target.value)}
              required
              minLength={2}
              maxLength={120}
            />
          </label>
        )}
        <p className={styles.help}>{copy.hints.organizationOrSector}</p>
        {needsSector && !sectorValue && <p className={styles.errorHint}>{options.sectorRequired}</p>}
        {inputField("relationship", copy.fields.relationship, { required: true, minLength: 5, maxLength: 250 })}
      </section>

      <section className={styles.section} aria-labelledby="recommendation-quote">
        <h2 id="recommendation-quote" className={styles.sectionTitle}>{copy.sections.recommendation}</h2>
        <label className={styles.label}>
          <span>{options.templateLabel}</span>
          <select
            className={`${styles.control} ${styles.select}`}
            disabled={locked}
            value={templateChoice}
            onChange={event => setTemplateChoice(event.target.value)}
          >
            <option value="">{options.templatePlaceholder}</option>
            {options.templates.map(template => (
              <option key={template.id} value={template.id}>{template.label}</option>
            ))}
          </select>
        </label>
        <p className={styles.help}>{options.templateHint}</p>
        <button type="button" className={styles.templateButton}
          disabled={locked || !selectedTemplate} onClick={insertTemplate}>
          {options.templateApply}
        </button>
        <label className={styles.label}>
          <span>{copy.fields.quote} *</span>
          <textarea
            className={styles.control}
            disabled={locked}
            style={{ resize: "vertical" }}
            value={fields.quote}
            onChange={event => updateField("quote", event.target.value)}
            minLength={20} maxLength={4000} rows={7} required
          />
        </label>
        <p className={styles.help}>{copy.hints.quote}</p>
        <fieldset className={styles.identityChoice}>
          <legend style={{ fontWeight: 700 }}>{copy.fields.publicIdentity}</legend>
          {(["fullName", "initials"] as const).map(option => (
            <label key={option}>
              <input type="radio" name="recommendation-public-identity"
                checked={identityChoice === option}
                disabled={locked}
                onChange={() => { invalidateApproval(); setIdentityChoice(option); }} />
              {copy.identityOptions[option]}
            </label>
          ))}
          <p className={styles.previewName}>{publicIdentity || "—"}</p>
          <p className={styles.help}>{options.identityDisclosure}</p>
        </fieldset>
      </section>

      <section className={styles.section} aria-labelledby="recommendation-consents">
        <h2 id="recommendation-consents" className={styles.sectionTitle}>{copy.sections.permissions}</h2>
        <p className={styles.help}>{copy.hints.permissions}</p>
        {RECOMMENDATION_CONSENT_TYPES.map(type => {
          const definition = catalog[type];
          const isOtherLanguageRelationship = (type === "publish_relationship_fr" || type === "publish_relationship_en") && type !== `publish_relationship_${locale}`;
          const canApprove = !isOtherLanguageRelationship && (type !== "publish_organization" || !!fields.organization.trim()) && (type !== "publish_industry_sector" || !!sectorValue);
          return (
            <label className={styles.consent} key={type}>
              <input
                type="checkbox"
                checked={permissions[type] && canApprove}
                disabled={!canApprove || locked}
                required={definition.required}
                onChange={event => updatePermission(type, event.target.checked)}
              />
              <span className={styles.consentBody}>
                <span className={styles.consentHeader}>
                  <strong className={styles.consentTitle}>{definition.label}</strong>
                  <span className={definition.required ? styles.requiredBadge : styles.optionalBadge}>
                    {definition.required ? options.requiredBadge : options.optionalBadge}
                  </span>
                </span>

                  <span className={styles.help}>{definition.notice}</span>
                   {type === "publish_role" && (
                    <small className={styles.help}>
                     {copy.hints.rolePublication}
                    </small>
               )}

                {isOtherLanguageRelationship &&
                  <small className={styles.help}>{options.consentOtherLanguage}</small>}
              </span>
            </label>
          );
        })}
      </section>

      {!formUiEnabled ? (
        <div role="status" className={styles.notice}>
          <strong>{copy.unavailable}</strong>
          <p>{copy.pending}</p>
        </div>
      ) : (
        <section className={styles.section} aria-label={locale === "fr" ? "Vérification par courriel" : "Email verification"}>
          <h2 className={styles.sectionTitle}>{locale === "fr" ? "Vérification du courriel" : "Email verification"}</h2>
          <p className={styles.help}>{locale === "fr"
            ? "Votre adresse courriel est vérifiée avant l'envoi. Chaque recommandation est examinée avant toute publication."
            : "Your email address is verified before submission. Every testimonial is reviewed before publication."}</p>
          {turnstileSiteKey ? (
            <>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive" onReady={() => setScriptReady(true)} />
              <div ref={turnstileContainer} aria-label={locale === "fr" ? "Vérification antispam" : "Anti-spam verification"} />
            </>
          ) : <p className={styles.errorHint}>{locale === "fr" ? "Clé publique Turnstile non configurée." : "Turnstile public site key is not configured."}</p>}
          {(stage === "editing" || stage === "requesting") && (
            <button type="button" className={styles.submitButton}
              style={{ opacity: 1, cursor: "pointer" }}
              disabled={busy}
              onClick={requestCode}>
              {stage === "requesting" ? (locale === "fr" ? "Envoi du code…" : "Sending code…") :
                (locale === "fr" ? "Recevoir mon code de vérification" : "Send my verification code")}
            </button>
          )}
          {(stage === "code" || stage === "verifying") && (
            <div className={styles.label}>
              <label htmlFor="recommendation-otp-code">{locale === "fr" ? "Code à six chiffres" : "Six-digit code"}</label>
              <input id="recommendation-otp-code" className={styles.control}
                type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                value={otpCode} disabled={busy}
                onChange={event => setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))} />
              <button type="button" className={styles.submitButton}
                style={{ opacity: 1, cursor: "pointer" }}
                disabled={busy || !/^\d{6}$/.test(otpCode)} onClick={verifyCode}>
                {stage === "verifying" ? (locale === "fr" ? "Vérification…" : "Verifying…") :
                  (locale === "fr" ? "Vérifier mon code" : "Verify my code")}
              </button>
            </div>
          )}
          {(stage === "verified" || stage === "submitting") && (
            <button type="button" className={styles.submitButton}
              style={{ opacity: 1, cursor: "pointer" }}
              disabled={busy} onClick={submitRecommendation}>
              {stage === "submitting" ? (locale === "fr" ? "Soumission…" : "Submitting…") : copy.submit}
            </button>
          )}
          {stage === "complete" && <strong>{locale === "fr" ? "Soumission terminée." : "Submission complete."}</strong>}
          <p role="status" aria-live={feedbackKind === "error" ? "assertive" : "polite"} className={feedbackKind === "error" ? styles.submissionWarning : styles.submissionInfo}>{feedback}</p>
        </section>
      )}
    </div>
  );
}
