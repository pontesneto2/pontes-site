import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
        },
      },
    },
    {
      url: `${siteUrl}/case/imidooh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/imidooh` } },
    },
    {
      url: `${siteUrl}/en/case/imidooh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/imidooh` } },
    },
    {
      url: `${siteUrl}/case/ucopiloto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/ucopiloto` } },
    },
    {
      url: `${siteUrl}/en/case/ucopiloto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/ucopiloto` } },
    },
    {
      url: `${siteUrl}/case/sda-ceara`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/sda-ceara` } },
    },
    {
      url: `${siteUrl}/en/case/sda-ceara`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/sda-ceara` } },
    },
    {
      url: `${siteUrl}/case/paa-leite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/paa-leite` } },
    },
    {
      url: `${siteUrl}/en/case/paa-leite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/paa-leite` } },
    },
    {
      url: `${siteUrl}/case/sda-indicadores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/sda-indicadores` } },
    },
    {
      url: `${siteUrl}/en/case/sda-indicadores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/sda-indicadores` } },
    },
    {
      url: `${siteUrl}/case/secaf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/secaf` } },
    },
    {
      url: `${siteUrl}/en/case/secaf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/secaf` } },
    },
    {
      url: `${siteUrl}/case/sistema-escolar-policia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/en/case/sistema-escolar-policia` } },
    },
    {
      url: `${siteUrl}/en/case/sistema-escolar-policia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "pt-BR": `${siteUrl}/case/sistema-escolar-policia` } },
    },
    {
      url: `${siteUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { en: `${siteUrl}/en/privacidade` } },
    },
    {
      url: `${siteUrl}/en/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.25,
      alternates: { languages: { "pt-BR": `${siteUrl}/privacidade` } },
    },
    {
      url: `${siteUrl}/trabalhe-comigo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/en/trabalhe-comigo` } },
    },
    {
      url: `${siteUrl}/en/trabalhe-comigo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { "pt-BR": `${siteUrl}/trabalhe-comigo` } },
    },
    {
      url: `${siteUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
