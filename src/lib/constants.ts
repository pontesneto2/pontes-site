// Link de download direto do Drive: os botões "Baixar CV" / "Download CV"
// baixam o PDF em vez de abrir o preview do Drive.
export const CV_URL_PT =
  "https://drive.google.com/uc?export=download&id=1NGGBTy9kzAPm5Os6we_jaeevsU-_zavX";
export const CV_URL_EN =
  "https://drive.google.com/uc?export=download&id=1SnpBriLaSGLh-tU5bdhbW2lX5C23GvSy";

export function getCvUrl(lang: "pt" | "en") {
  return lang === "en" ? CV_URL_EN : CV_URL_PT;
}
