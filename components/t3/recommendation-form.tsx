"use client";

/**
 * MBY Studio — Professional recommendation form
 * R2.21-H.11 | Bilingual local preview only
 *
 * No fetch, submit handler, persistence, or automatic publication.
 * Legal consent text is imported from the established catalog.
 */

import { useMemo, useState } from "react";
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

const initialFields: FormFields = {
  fullName: "", email: "", linkedin: "", role: "", organization: "",
  sectorOther: "", relationship: "", quote: "",
};

const initialPermissions = Object.fromEntries(
  RECOMMENDATION_CONSENT_TYPES.map(type => [type, false])
) as Record<RecommendationConsentType, boolean>;

function getInitials(fullName: string): string {
  return fullName.trim().split(/\s+/).filter(Boolean)
    .map(part => part[0]?.toLocaleUpperCase() ?? "").join(".");
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
    setFields(previous => ({ ...previous, [key]: value }));
  }

  function updatePermission(type: RecommendationConsentType, granted: boolean) {
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
            value={sectorChoice}
            required={needsSector}
            onChange={event => {
              const next = event.target.value;
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
          disabled={!selectedTemplate} onClick={insertTemplate}>
          {options.templateApply}
        </button>
        <label className={styles.label}>
          <span>{copy.fields.quote} *</span>
          <textarea
            className={styles.control}
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
                onChange={() => setIdentityChoice(option)} />
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
          const canApprove = !isOtherLanguageRelationship && (type !== "publish_organization" || !!fields.organization.trim());
          return (
            <label className={styles.consent} key={type}>
              <input
                type="checkbox"
                checked={permissions[type] && canApprove}
                disabled={!canApprove}
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
                {isOtherLanguageRelationship &&
                  <small className={styles.help}>{options.consentOtherLanguage}</small>}
              </span>
            </label>
          );
        })}
      </section>

      <div role="status" className={styles.notice}>
        <strong>{copy.unavailable}</strong>
        <p>{copy.pending}</p>
      </div>
      <button type="button" disabled className={styles.submitButton}>{copy.submit}</button>
    </div>
  );
}
