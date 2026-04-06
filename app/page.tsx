"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { generateSignatureHtml, SignatureValues } from "@/lib/generateSignature";

const DEFAULT_VALUES: SignatureValues = {
  firstName: "",
  lastName: "",
  position: "",
  tel: "+49 209 389489 0",
  email: "",
};

type CopyState = "idle" | "copied" | "error";

export default function GeneratorPage() {
  const [values, setValues] = useState<SignatureValues>(DEFAULT_VALUES);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [showHtml, setShowHtml] = useState(false);
  const router = useRouter();

  const signatureHtml = generateSignatureHtml(values);

  function handleChange(field: keyof SignatureValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(signatureHtml);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  }, [signatureHtml]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const isReady =
    values.firstName.trim() &&
    values.lastName.trim() &&
    values.position.trim() &&
    values.tel.trim() &&
    values.email.trim();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0971/8959/3463/files/logo_eratec_germany.svg"
                alt="ERATEC-GERMANY GmbH"
                className="h-9 w-auto"
              />
              <div className="hidden sm:block h-5 w-px bg-gray-200" />
              <span className="hidden sm:block text-sm font-medium text-gray-600">
                Signatur Generator
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn-secondary text-xs px-3 py-2"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            E-Mail Signatur erstellen
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Fülle die Felder aus und kopiere deine fertige Signatur in deinen E-Mail Client.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* ── LEFT: Form ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Red accent bar */}
            <div className="h-1 bg-[#e30613]" />

            <div className="p-6 sm:p-8">
              <h2 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">
                  1
                </span>
                Deine Daten eingeben
              </h2>

              <div className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Vorname</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="z.B. Max"
                      value={values.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Nachname</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="z.B. Mustermann"
                      value={values.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="label">Position / Titel</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="z.B. Sales Manager"
                    value={values.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                  />
                </div>

                {/* Tel */}
                <div>
                  <label className="label">Telefon</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+49 209 389489 0"
                    value={values.tel}
                    onChange={(e) => handleChange("tel", e.target.value)}
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Deine direkte Durchwahl oder die Hauptnummer
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="label">E-Mail Adresse</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="vorname.nachname@eratec-germany.com"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              {/* Fixed info */}
              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Unveränderliche Felder
                </p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e30613] font-semibold w-10">Web</span>
                    <span>www.eratec-germany.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e30613] font-semibold w-10">Adr.</span>
                    <span>Magdeburger Str. 16B, 45881 Gelsenkirchen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e30613] font-semibold w-10">Social</span>
                    <span>LinkedIn, Instagram, Facebook, YouTube, TikTok</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + Copy ── */}
          <div className="space-y-4">
            {/* Preview card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-1 bg-[#e30613]" />

              <div className="p-6 sm:p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">
                    2
                  </span>
                  Vorschau
                </h2>

                {/* Signature preview */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateSignatureHtml(values),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Copy action card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">
                    3
                  </span>
                  Signatur kopieren &amp; einrichten
                </h2>
                <p className="text-sm text-gray-500 mb-5 ml-8">
                  Kopiere den HTML-Code und füge ihn in deinen E-Mail Client ein.
                </p>

                {/* Steps */}
                <div className="mb-5 space-y-2 ml-2">
                  {[
                    "HTML-Code unten kopieren",
                    "In deinem E-Mail Programm → Einstellungen → Signatur öffnen",
                    "\"HTML einfügen\" oder Editor öffnen und den Code einfügen",
                    "Speichern – fertig!",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>

                {/* Copy buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    disabled={!isReady}
                    className="btn-primary flex-1"
                    title={!isReady ? "Bitte alle Felder ausfüllen" : ""}
                  >
                    {copyState === "copied" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Kopiert!
                      </>
                    ) : copyState === "error" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Fehler – bitte manuell kopieren
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        HTML kopieren
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowHtml((v) => !v)}
                    className="btn-secondary"
                  >
                    {showHtml ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        Ausblenden
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        HTML anzeigen
                      </>
                    )}
                  </button>
                </div>

                {!isReady && (
                  <p className="mt-3 text-xs text-amber-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Bitte alle Felder ausfüllen um die Signatur zu kopieren.
                  </p>
                )}

                {/* HTML textarea (hidden by default) */}
                {showHtml && (
                  <div className="mt-4">
                    <textarea
                      readOnly
                      value={signatureHtml}
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                      className="w-full h-48 rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-600 resize-none outline-none focus:border-[#e30613] focus:ring-2 focus:ring-[#e30613]/10 transition-all"
                    />
                    <p className="mt-1.5 text-xs text-gray-400">
                      Klicke ins Textfeld, um den gesamten Code zu markieren.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-400 text-center">
            ERATEC-GERMANY GmbH &mdash; Internes Signatur-Tool
          </p>
        </div>
      </footer>
    </div>
  );
}
