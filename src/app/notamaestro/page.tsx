import type { Metadata } from "next";
import { HeroNM } from "@/components/notamaestro/hero-nm";
import { FeaturesNM } from "@/components/notamaestro/features-nm";
import { BenefitsNM } from "@/components/notamaestro/benefits-nm";
import { NotaMaestroPageScene } from "@/components/shared/notamaestro-page-scene";
import { SoftwareJsonLd } from "@/components/shared/json-ld";
import { EXTERNAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "NotaMaestro - Software de Gestión Escolar",
  description:
    "La plataforma integral para la gestión educativa: notas, asistencias, boletines digitales, mallas curriculares y más. Diseñada para colegios e instituciones educativas en Colombia.",
  alternates: { canonical: "/notamaestro" },
  openGraph: {
    title: "NotaMaestro - Software Educativo de CODFY",
    description:
      "Transforma la gestión educativa de tu institución con NotaMaestro. Gestión completa de notas, asistencias y boletines.",
  },
};

export default function NotaMaestroPage() {
  return (
    <div className="relative bg-[#160c02]">
      <SoftwareJsonLd
        name="NotaMaestro"
        description="Software educativo integral para colegios e instituciones educativas: notas, asistencias, boletines digitales y mucho más."
        url={EXTERNAL.notamaestro}
        brand="NotaMaestro by CODFY"
      />
      <NotaMaestroPageScene />
      <div className="relative z-10">
        <HeroNM />
        <FeaturesNM />
        <BenefitsNM />
      </div>
    </div>
  );
}
