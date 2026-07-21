export const CV_URL_PT = "/cv/francisco-pontes-cv-pt.pdf";
export const CV_URL_EN = "/cv/francisco-pontes-cv-en.pdf";

export function getCvUrl(lang: "pt" | "en") {
  return lang === "en" ? CV_URL_EN : CV_URL_PT;
}
