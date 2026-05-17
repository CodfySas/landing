import type { Metadata } from "next";
import { HeroVigxa } from "@/components/vigxa/hero-vigxa";
import { ScrollyVigxa } from "@/components/vigxa/scrolly-vigxa";
import { FeaturesVigxa } from "@/components/vigxa/features-vigxa";
import { ComplianceVigxa } from "@/components/vigxa/compliance-vigxa";
import { PricingVigxa } from "@/components/vigxa/pricing-vigxa";
import { CtaVigxa } from "@/components/vigxa/cta-vigxa";
import { VigxaPageScene } from "@/components/shared/vigxa-page-scene";
import { SoftwareJsonLd } from "@/components/shared/json-ld";
import { EXTERNAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Vigxa - Software para Constructoras Colombianas",
  description:
    "Plataforma 360° para constructoras: proyectos, presupuestos APU, actas, facturación electrónica DIAN, SG-SST, nómina y portal de interventoría. Prueba 15 días gratis.",
  alternates: { canonical: "/vigxa" },
  openGraph: {
    title: "Vigxa - El sistema integral para tu constructora",
    description:
      "Cotización, presupuesto, ejecución, actas, facturación DIAN, SG-SST y portal externo en una sola plataforma diseñada para constructoras colombianas.",
  },
};

export default function VigxaPage() {
  return (
    <div className="relative bg-[#0c0a05]">
      <SoftwareJsonLd
        name="Vigxa"
        description="Software de gestión 360° para constructoras: proyectos, presupuestos, actas, SG-SST, nómina y facturación electrónica DIAN."
        url={EXTERNAL.vigxa}
        brand="Vigxa by CODFY"
      />
      <VigxaPageScene />
      <div className="relative z-10">
        <HeroVigxa />
        <ScrollyVigxa />
        <FeaturesVigxa />
        <ComplianceVigxa />
        <PricingVigxa />
        <CtaVigxa />
      </div>
    </div>
  );
}
