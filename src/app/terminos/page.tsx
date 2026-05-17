import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de los servicios de CODFY S.A.S., incluyendo NotaMaestro, Ampirux y desarrollo de software a medida.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

function renderParagraph(text: string, key: string) {
  // Bold markdown (**word**) → <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <p key={key} className="leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-codfy-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle hero band */}
      <section className="relative isolate overflow-hidden bg-codfy-ink pt-32 pb-16">
        <div className="absolute inset-0 gradient-mesh-codfy opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-codfy/15 text-codfy-light ring-1 ring-codfy/30">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {terms.title}
              </h1>
              <p className="mt-1 text-xs text-white/55 md:text-sm">
                Última actualización: {terms.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="mb-12 text-base leading-relaxed text-neutral-700 md:text-lg">
          {terms.intro}
        </p>

        <div className="space-y-12 text-sm text-neutral-700 md:text-base">
          {terms.sections.map((section, idx) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="font-display text-xl font-bold text-codfy-ink md:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => renderParagraph(p, `${idx}-${i}`))}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <p className="text-sm text-neutral-600">
            ¿Tienes preguntas sobre estos términos?{" "}
            <Link
              href="/#contacto"
              className="font-semibold text-codfy underline-offset-4 hover:underline"
            >
              Contáctanos
            </Link>{" "}
            y te responderemos a la brevedad.
          </p>
        </div>
      </section>
    </div>
  );
}
