interface OfferCatalogSchema {
  name: string;
  listElements: {
    type: string;
    name: string;
    description: string;
    offers: {
      price?: string;
      currency: string;
      availability: string;
    }[];
  }[];
}

interface OrganizationSchema {
  name: string;
  /** Registered legal name, when it differs from the trading name */
  legalName?: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    contactType: string;
    phone?: string;
    email?: string;
    url?: string;
    availableLanguage: string;
  };
  hasOfferCatalog?: unknown;
  socialMediaUrls?: string[];
}

export const createWebsiteSchema = (name: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url
  };
};

export const createOrganizationSchema = (data: OrganizationSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    legalName: data.legalName,
    url: data.url,
    logo: data.logo,
    "@id": data.url + "/#organization",
    description: data.description,
    contactPoint: data.contactPoint,
    hasOfferCatalog: data.hasOfferCatalog ?? undefined,
    sameAs: data.socialMediaUrls ?? []
  };
};

export const createHomepageSchema = (data: OrganizationSchema) => [
  createWebsiteSchema(data.name, data.url),
  createOrganizationSchema(data)
];

export const createProviderSchema = (context: {
  name: string;
  id: string;
  addressRegion: string;
  addressCountry: string;
}) => {
  const { name, id, addressRegion, addressCountry } = context;
  return {
    "@type": "LocalBusiness",
    name,
    "@id": id,
    address: {
      "@type": "PostalAddress",
      addressRegion,
      addressCountry
    }
  };
};

export const createBreadcrumbSchema = (breadcrumbs: { id: string; name: string }[]) => {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": crumb.id, name: crumb.name }
    }))
  };
};

export const createImageObjectSchema = (url: string, width?: number, height?: number) => {
  return {
    "@type": "ImageObject",
    width: width ?? 512,
    height: height ?? 269,
    url
  };
};

export const createSimpleOrganizationSchema = (url: string, name: string, logoUrl: string) => {
  return {
    "@type": "Organization",
    name,
    logo: createImageObjectSchema(logoUrl),
    url
  };
};

export const createOfferCatalogSchema = (data: OfferCatalogSchema) => {
  return {
    "@type": "OfferCatalog",
    name: data.name,
    itemListElement: data.listElements.map(({ type, name, description, offers }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": type,
        name,
        description,
        offers: offers.map(({ price, currency: priceCurrency, availability }) => ({
          "@type": "Offer",
          price,
          priceCurrency,
          availability
        }))
      }
    }))
  };
};

interface PersonSchema {
  name: string;
  jobTitle: string;
  image?: string;
  description?: string;
  email?: string;
  url?: string;
  worksFor?: {
    name: string;
    url: string;
  };
  alumniOf?: {
    name: string;
    type?: "CollegeOrUniversity" | "EducationalOrganization";
  }[];
  knowsAbout?: string[];
}

interface ContactPageSchema {
  name: string;
  url: string;
  description?: string;
  mainEntity?: {
    /** Defaults to Organization; use Person for a solo trader */
    type?: "Organization" | "Person";
    name: string;
    url: string;
    contactPoint?: {
      contactType: string;
      email?: string;
      telephone?: string;
      url?: string;
      availableLanguage?: string;
    };
  };
}

export const createPersonSchema = (data: PersonSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    image: data.image,
    description: data.description,
    email: data.email,
    url: data.url,
    worksFor: data.worksFor
      ? {
          "@type": "Organization",
          name: data.worksFor.name,
          url: data.worksFor.url
        }
      : undefined,
    alumniOf: data.alumniOf?.map((school) => ({
      "@type": school.type || "CollegeOrUniversity",
      name: school.name
    })),
    knowsAbout: data.knowsAbout
  };
};

export const createContactPageSchema = (data: ContactPageSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: data.name,
    url: data.url,
    description: data.description,
    mainEntity: data.mainEntity
      ? {
          "@type": data.mainEntity.type ?? "Organization",
          name: data.mainEntity.name,
          url: data.mainEntity.url,
          contactPoint: data.mainEntity.contactPoint
        }
      : undefined
  };
};

interface FAQItem {
  question: string;
  answer: string;
}

export const createFAQPageSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
};

interface ServiceSchema {
  name: string;
  description?: string;
  /** LocalBusiness/Organization node offering the service, e.g. createProviderSchema() */
  provider?: unknown;
  /** Defaults to the service name */
  serviceType?: string;
}

export const createServiceSchema = (data: ServiceSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: data.provider,
    serviceType: data.serviceType ?? data.name
  };
};

interface ProductSchema {
  name: string;
  description?: string;
  /** Brand name, usually the company selling the product */
  brand?: string;
  /** Organization named as the seller on every offer */
  seller?: string;
  /** ISO 4217 code, defaults to USD */
  currency?: string;
  /** Prices may carry symbols or copy ("$99 / year"); entries with no digits are dropped */
  offers?: { name: string; price: string }[];
}

export const createProductSchema = (data: ProductSchema) => {
  const offers = (data.offers ?? [])
    .map((offer) => ({ name: offer.name, price: offer.price.replace(/[^0-9.]/g, "") }))
    .filter((offer) => offer.price.length > 0)
    .map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: data.currency ?? "USD",
      availability: "https://schema.org/InStock",
      seller: data.seller ? { "@type": "Organization", name: data.seller } : undefined
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    brand: data.brand ? { "@type": "Brand", name: data.brand } : undefined,
    offers: offers.length ? offers : undefined
  };
};

/** Seconds to an ISO 8601 duration, e.g. 192 -> "PT3M12S" */
const toISODuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = Math.round(seconds % 60);
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}${remainder || !seconds ? `${remainder}S` : ""}`;
};

interface MediaObjectSchema {
  name: string;
  /** Direct URL to the media file */
  contentUrl: string;
  description?: string;
  /** Length in seconds; emitted as an ISO 8601 duration */
  duration?: number;
  /** MIME type, e.g. "audio/mpeg" */
  encodingFormat?: string;
  /** BCP 47 tag or language name */
  inLanguage?: string;
  /** ISO 8601 date */
  uploadDate?: string;
  /** Person/Organization node credited with the recording, e.g. createPersonSchema() */
  creator?: unknown;
}

interface VideoObjectSchema extends MediaObjectSchema {
  /** Required by Google for video rich results */
  thumbnailUrl?: string;
  /** Player URL, when it differs from contentUrl */
  embedUrl?: string;
}

export const createAudioObjectSchema = (data: MediaObjectSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    name: data.name,
    contentUrl: data.contentUrl,
    description: data.description,
    duration: data.duration ? toISODuration(data.duration) : undefined,
    encodingFormat: data.encodingFormat,
    inLanguage: data.inLanguage,
    uploadDate: data.uploadDate,
    creator: data.creator
  };
};

export const createVideoObjectSchema = (data: VideoObjectSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data.name,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
    thumbnailUrl: data.thumbnailUrl,
    description: data.description,
    duration: data.duration ? toISODuration(data.duration) : undefined,
    encodingFormat: data.encodingFormat,
    inLanguage: data.inLanguage,
    uploadDate: data.uploadDate,
    creator: data.creator
  };
};

export const createItemListSchema = (name: string, items: unknown[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item
    }))
  };
};

interface SoftwareSourceCodeSchema {
  name: string;
  url: string;
  description?: string;
  id?: string;
  version?: string;
  license?: string;
  programmingLanguage?: string[];
  runtimePlatform?: string;
  codeRepository?: string;
  image?: string;
  author?: unknown;
  hasPart?: unknown[];
}

export const createSoftwareSourceCodeSchema = (data: SoftwareSourceCodeSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": data.id,
    name: data.name,
    url: data.url,
    description: data.description,
    version: data.version,
    license: data.license ? `https://spdx.org/licenses/${data.license}.html` : undefined,
    programmingLanguage: data.programmingLanguage,
    runtimePlatform: data.runtimePlatform,
    codeRepository: data.codeRepository,
    image: data.image,
    author: data.author,
    hasPart: data.hasPart
  };
};
