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
type ActiveTab = "outlook" | "gmail" | "apple" | "other";

// Download signature as .htm file (best for Outlook Desktop)
function downloadHtmFile(html: string, name: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `signatur-${name.toLowerCase().replace(/\s+/g, "-")}.htm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Copy raw HTML source code to clipboard
async function copyHtmlSource(html: string): Promise<void> {
  await navigator.clipboard.writeText(html);
}

export default function GeneratorPage() {
  const [values, setValues] = useState<SignatureValues>(DEFAULT_VALUES);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [activeTab, setActiveTab] = useState<ActiveTab>("outlook");
  const router = useRouter();

  const signatureHtml = generateSignatureHtml(values);
  const fullName = `${values.firstName} ${values.lastName}`.trim();

  function handleChange(field: keyof SignatureValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  const handleCopyHtml = useCallback(async () => {
    try {
      await copyHtmlSource(signatureHtml);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  }, [signatureHtml]);

  const handleDownload = useCallback(() => {
    downloadHtmFile(signatureHtml, fullName || "eratec");
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 2500);
  }, [signatureHtml, fullName]);

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

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: "outlook", label: "Outlook", icon: "📧" },
    { id: "gmail", label: "Gmail", icon: "✉️" },
    { id: "apple", label: "Apple Mail", icon: "🍎" },
    { id: "other", label: "Andere", icon: "⚙️" },
  ];

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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">E-Mail Signatur erstellen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Fülle die Felder aus und richte deine Signatur mit der Anleitung unten ein.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* ── LEFT: Form ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="h-1 bg-[#e30613]" />
            <div className="p-6 sm:p-8">
              <h2 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">1</span>
                Deine Daten eingeben
              </h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Vorname</label>
                    <input type="text" className="input-field" placeholder="z.B. Max" value={values.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Nachname</label>
                    <input type="text" className="input-field" placeholder="z.B. Mustermann" value={values.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">Position / Titel</label>
                  <input type="text" className="input-field" placeholder="z.B. Sales Manager" value={values.position} onChange={(e) => handleChange("position", e.target.value)} />
                </div>
                <div>
                  <label className="label">Telefon</label>
                  <input type="tel" className="input-field" placeholder="+49 209 389489 0" value={values.tel} onChange={(e) => handleChange("tel", e.target.value)} />
                  <p className="mt-1.5 text-xs text-gray-400">Deine direkte Durchwahl oder die Hauptnummer</p>
                </div>
                <div>
                  <label className="label">E-Mail Adresse</label>
                  <input type="email" className="input-field" placeholder="vorname.nachname@eratec-germany.com" value={values.email} onChange={(e) => handleChange("email", e.target.value)} />
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Unveränderliche Felder</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2"><span className="text-[#e30613] font-semibold w-10">Web</span><span>www.eratec-germany.com</span></div>
                  <div className="flex items-center gap-2"><span className="text-[#e30613] font-semibold w-10">Adr.</span><span>Magdeburger Str. 16B, 45881 Gelsenkirchen</span></div>
                  <div className="flex items-center gap-2"><span className="text-[#e30613] font-semibold w-10">Social</span><span>LinkedIn, Instagram, Facebook, YouTube, TikTok</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + Setup ── */}
          <div className="space-y-4">
            {/* Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-1 bg-[#e30613]" />
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">2</span>
                  Vorschau
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
                  <div dangerouslySetInnerHTML={{ __html: signatureHtml }} />
                </div>
              </div>
            </div>

            {/* Setup instructions per client */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e30613] text-white text-xs font-bold">3</span>
                  Signatur einrichten
                </h2>

                {/* Validation warning */}
                {!isReady && (
                  <div className="mb-5 flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Bitte alle Felder ausfüllen.
                  </div>
                )}

                {/* Tab selector */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 text-xs sm:text-sm font-medium py-2 px-2 rounded-md transition-all ${
                        activeTab === tab.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <span className="hidden sm:inline mr-1">{tab.icon}</span> {tab.label}
                    </button>
                  ))}
                </div>

                {/* ── Outlook ── */}
                {activeTab === "outlook" && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Empfohlen: Datei herunterladen</p>
                      <p className="text-xs text-blue-700 mb-3">Die .htm Datei wird direkt in Outlook als Signatur erkannt — kein manuelles Kopieren nötig.</p>
                      <div className="space-y-2 text-xs text-blue-800 mb-4">
                        <div className="flex gap-2"><span className="font-bold w-4">1.</span> Datei herunterladen (Button unten)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">2.</span> Datei verschieben nach:<br/><code className="bg-blue-100 px-1.5 py-0.5 rounded text-[11px] mt-0.5 inline-block">%APPDATA%\Microsoft\Signatures\</code></div>
                        <div className="flex gap-2"><span className="font-bold w-4">3.</span> Outlook neu starten</div>
                        <div className="flex gap-2"><span className="font-bold w-4">4.</span> Neue E-Mail → Signatur auswählen</div>
                      </div>
                    </div>
                    <button onClick={handleDownload} disabled={!isReady} className="btn-primary w-full py-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Outlook-Datei herunterladen (.htm)
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                      <div className="relative flex justify-center"><span className="px-3 bg-white text-xs text-gray-400">oder</span></div>
                    </div>

                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Alternative: Outlook Web (365)</p>
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex gap-2"><span className="font-bold w-4">1.</span> HTML-Code kopieren (Button unten)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">2.</span> Outlook Web → Einstellungen → E-Mail → Verfassen</div>
                        <div className="flex gap-2"><span className="font-bold w-4">3.</span> Bei Signatur den HTML-Code einfügen</div>
                      </div>
                    </div>
                    <button onClick={handleCopyHtml} disabled={!isReady} className="btn-secondary w-full">
                      {copyState === "copied" ? (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Kopiert!</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> HTML-Code kopieren</>
                      )}
                    </button>
                  </div>
                )}

                {/* ── Gmail ── */}
                {activeTab === "gmail" && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                      <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex gap-2"><span className="font-bold w-4">1.</span> HTML-Code kopieren (Button unten)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">2.</span> Gmail öffnen → Einstellungen (Zahnrad) → Alle Einstellungen</div>
                        <div className="flex gap-2"><span className="font-bold w-4">3.</span> Reiter &quot;Allgemein&quot; → Signatur → Neue Signatur erstellen</div>
                        <div className="flex gap-2"><span className="font-bold w-4">4.</span> Im Signatur-Editor: HTML einfügen (Strg+V / Cmd+V)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">5.</span> Nach unten scrollen → &quot;Änderungen speichern&quot;</div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                      <p className="text-xs text-amber-700">
                        <strong>Hinweis:</strong> Gmail kann manche Formatierungen leicht anpassen. Die Signatur sieht beim Empfänger aber korrekt aus.
                      </p>
                    </div>
                    <button onClick={handleCopyHtml} disabled={!isReady} className="btn-primary w-full py-3">
                      {copyState === "copied" ? (
                        <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Kopiert!</>
                      ) : (
                        <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> HTML-Code kopieren</>
                      )}
                    </button>
                  </div>
                )}

                {/* ── Apple Mail ── */}
                {activeTab === "apple" && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                      <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex gap-2"><span className="font-bold w-4">1.</span> HTML-Code kopieren (Button unten)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">2.</span> Apple Mail → Einstellungen → Signaturen</div>
                        <div className="flex gap-2"><span className="font-bold w-4">3.</span> Neuer Account → &quot;+&quot; klicken → Name vergeben</div>
                        <div className="flex gap-2"><span className="font-bold w-4">4.</span> Im Signatur-Textfeld: HTML einfügen (Cmd+V)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">5.</span> Apple Mail schließen und neu öffnen</div>
                      </div>
                    </div>
                    <button onClick={handleCopyHtml} disabled={!isReady} className="btn-primary w-full py-3">
                      {copyState === "copied" ? (
                        <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Kopiert!</>
                      ) : (
                        <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> HTML-Code kopieren</>
                      )}
                    </button>
                  </div>
                )}

                {/* ── Other ── */}
                {activeTab === "other" && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Thunderbird / andere Clients</p>
                      <div className="space-y-2 text-xs text-gray-700">
                        <div className="flex gap-2"><span className="font-bold w-4">1.</span> HTML-Code kopieren (Button unten)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">2.</span> In deinem E-Mail Programm → Kontoeinstellungen → Signatur</div>
                        <div className="flex gap-2"><span className="font-bold w-4">3.</span> &quot;HTML verwenden&quot; aktivieren (falls vorhanden)</div>
                        <div className="flex gap-2"><span className="font-bold w-4">4.</span> HTML-Code einfügen und speichern</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleCopyHtml} disabled={!isReady} className="btn-primary flex-1 py-3">
                        {copyState === "copied" ? (
                          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> Kopiert!</>
                        ) : (
                          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> HTML-Code kopieren</>
                        )}
                      </button>
                      <button onClick={handleDownload} disabled={!isReady} className="btn-secondary flex-1 py-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        .htm Datei
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-400 text-center">ERATEC-GERMANY GmbH &mdash; Internes Signatur-Tool</p>
        </div>
      </footer>
    </div>
  );
}
