import { SITE, CONTACT, SOCIALS } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/assets/logo.png`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cra 21 # 18 - 2, Piso 1",
      addressLocality: "Baranoa",
      addressRegion: "Atlántico",
      addressCountry: "CO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "sales",
      areaServed: "CO",
      availableLanguage: "Spanish",
    },
    sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareJsonLd({
  name,
  description,
  url,
  image,
  brand,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    image: image ?? `${SITE.url}${SITE.ogImage}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
    },
    publisher: {
      "@type": "Organization",
      name: brand ?? SITE.legalName,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
