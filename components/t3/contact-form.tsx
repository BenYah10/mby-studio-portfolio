/** MBY Studio T4.02 — localized contact UI; no email addresses or credentials shipped to clients. */
"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Script from "next/script";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { routePaths } from "@/i18n/routes";

declare global { interface Window { turnstile?: { render:(element:HTMLElement,options:Record<string,unknown>)=>string; reset:(id:string)=>void; remove?:(id:string)=>void; }; } }
const copy = {
  fr: {name:"Nom complet",email:"Adresse courriel",organization:"Organisation (facultatif)",subject:"Objet de votre demande",message:"Votre message",privacy:"J'accepte que mes coordonnées et mon message soient utilisés pour répondre à ma demande.",send:"Envoyer mon message",sending:"Envoi en cours…",success:"Merci. Votre message a été transmis.",error:"L'envoi n'a pas abouti. Veuillez réessayer plus tard.",paused:"Le formulaire de contact professionnel sera activé après l'incorporation officielle de MBY Consulting et la finalisation de ses démarches d'immatriculation et d'enregistrement fiscal. Merci de votre compréhension.",verification:"Veuillez terminer la vérification antispam.",required:"Tous les champs obligatoires doivent être remplis.",subjects:["Demande de mandat","Collaboration","Recrutement","Autre"],character:"Maximum 2 000 caractères",challenge:"Vérification antispam"},
  en: {name:"Full name",email:"Email address",organization:"Organization (optional)",subject:"Subject",message:"Your message",privacy:"I agree that my contact information and message may be used to respond to my request.",send:"Send message",sending:"Sending…",success:"Thank you. Your message has been submitted.",error:"Your message could not be submitted. Please try again later.",paused:"The professional contact form will become available after MBY Consulting is officially incorporated and its business registration and tax registration formalities are completed. Thank you for your understanding.",verification:"Please complete the spam verification.",required:"Please fill in the required fields.",subjects:["Project inquiry","Collaboration","Recruitment","Other"],character:"Maximum 2,000 characters",challenge:"Spam verification"},
} as const;
const enabled = process.env.NEXT_PUBLIC_MBY_CONTACT_FORM_ENABLED === "true";
const siteKey = process.env.NEXT_PUBLIC_MBY_TURNSTILE_SITE_KEY || "";
export function ContactForm({locale}:{locale:Locale}) {
 const c=copy[locale]; const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [message,setMessage]=useState(""); const [token,setToken]=useState(""); const [scriptReady,setScriptReady]=useState(false);
 const widgetElement=useRef<HTMLDivElement>(null); const widgetId=useRef<string|null>(null);
 useEffect(()=>{ if(!enabled||!siteKey||!scriptReady||!widgetElement.current||!window.turnstile||widgetId.current)return;
   const id=window.turnstile.render(widgetElement.current,{sitekey:siteKey,callback:(value:unknown)=>setToken(String(value)),"expired-callback":()=>setToken(""),"error-callback":()=>setToken("")});widgetId.current=id;
   return ()=>{if(widgetId.current){window.turnstile?.remove?.(widgetId.current);widgetId.current=null;}};
 },[scriptReady]);
 async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(!enabled||status==="sending")return;
  const form=event.currentTarget;const d=new FormData(form);if(!token){setMessage(c.verification);setStatus("error");return;}
  setStatus("sending");setMessage("");try{
   const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({locale,name:d.get("name"),email:d.get("email"),organization:d.get("organization"),subject:d.get("subject"),message:d.get("message"),consent:d.get("consent")==="yes",website:d.get("website"),token})});
   if(!response.ok)throw new Error("send failed");form.reset();setStatus("success");setMessage(c.success);
  }catch{setStatus("error");setMessage(c.error);}finally{setToken("");if(widgetId.current)window.turnstile?.reset(widgetId.current);}
 }
 return <section className="t3-contact-wrap" aria-label={locale==="fr"?"Formulaire de contact":"Contact form"}>
 {enabled&&siteKey&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setScriptReady(true)}/>}
 {!enabled && <div className="t3-contact-availability" role="status" aria-live="polite">
   <strong>{locale === "fr" ? "Formulaire de contact temporairement indisponible" : "Contact form temporarily unavailable"}</strong>
   <p>{c.paused}</p>
 </div>}
 <form className="t3-contact-form" onSubmit={submit}>
 <div className="t3-contact-grid"><label>{c.name} *<input required autoComplete="name" name="name" maxLength={100} disabled={!enabled||status==="sending"}/></label><label>{c.email} *<input required type="email" autoComplete="email" name="email" maxLength={254} disabled={!enabled||status==="sending"}/></label></div>
 <label>{c.organization}<input autoComplete="organization" name="organization" maxLength={120} disabled={!enabled||status==="sending"}/></label>
 <label>{c.subject} *<select name="subject" defaultValue="" required disabled={!enabled||status==="sending"}><option value="" disabled>—</option>{c.subjects.map((subject,i)=><option value={String(i)} key={subject}>{subject}</option>)}</select></label>
 <label>{c.message} *<textarea name="message" rows={7} minLength={10} maxLength={2000} required disabled={!enabled||status==="sending"}/><small>{c.character}</small></label>
 <label className="t3-consent"><input name="consent" type="checkbox" value="yes" required disabled={!enabled||status==="sending"}/><span>{c.privacy} <Link href={routePaths.privacy[locale]} target="_blank" rel="noopener noreferrer" style={{color:"#315f9c",textDecoration:"underline"}}>{locale === "fr" ? "Lire la politique de confidentialité" : "Read the privacy policy"}</Link></span></label>
 <div className="t3-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 {enabled&&siteKey&&<div aria-label={c.challenge} ref={widgetElement}/>}
 <button className="t3-button" type="submit" disabled={!enabled||!siteKey||status==="sending"||status==="success"}>{status==="sending"?c.sending:c.send}</button>
 <>{enabled && <p className="t3-contact-status" role="status" aria-live="polite">{!siteKey ? c.paused : message}</p>}</>
 </form></section>;
}
