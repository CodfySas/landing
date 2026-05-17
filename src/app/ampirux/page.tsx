import type { Metadata } from "next";
import { HeroAmpirux } from "@/components/ampirux/hero-ampirux";
import { FeaturesAmpirux } from "@/components/ampirux/features-ampirux";
import { DashboardAmpirux } from "@/components/ampirux/dashboard-ampirux";
import { PricingAmpirux } from "@/components/ampirux/pricing-ampirux";
import { ResponsiveAmpirux } from "@/components/ampirux/responsive-ampirux";
import { CtaAmpirux } from "@/components/ampirux/cta-ampirux";
import { SoftwareJsonLd } from "@/components/shared/json-ld";
import { EXTERNAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ampirux - Software para Barberías",
  description:
    "Gestiona citas, inventario, ventas y métricas de tu barbería desde una sola plataforma. Facturación electrónica, agenda y reportes. Optimiza tu negocio con Ampirux.",
  alternates: { canonical: "/ampirux" },
  openGraph: {
    title: "Ampirux - El Software Definitivo para tu Barbería",
    description:
      "Sistema integral para barberías. Agenda de citas, inventario, ventas, métricas y facturación electrónica.",
  },
};

export default function AmpiruxPage() {
  return (
    <>
      <SoftwareJsonLd
        name="Ampirux"
        description="Software integral para barberías: gestión de citas, inventario, ventas, métricas y facturación electrónica."
        url={EXTERNAL.ampirux}
        brand="Ampirux by CODFY"
      />
      <HeroAmpirux />
      <FeaturesAmpirux />
      <DashboardAmpirux />
      <PricingAmpirux />
      <ResponsiveAmpirux />
      <CtaAmpirux />
    </>
  );
}
