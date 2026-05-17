import type { Metadata } from "next";
import { HeroHome } from "@/components/sections/hero-home";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { CustomSoftware } from "@/components/sections/custom-software";
import { Contact } from "@/components/sections/contact";
import { OrganizationJsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "CODFY - Software para Transformación Digital",
  description:
    "Construimos soluciones tecnológicas a medida que impulsan el crecimiento de tu empresa. Software empresarial, SaaS para barberías (Ampirux) y educación (NotaMaestro).",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HeroHome />
      <About />
      <Products />
      <CustomSoftware />
      <Contact />
    </>
  );
}
