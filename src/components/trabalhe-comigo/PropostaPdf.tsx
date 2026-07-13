"use client";

/* Os <Image> abaixo são do @react-pdf/renderer (documento PDF), não <img> HTML. */
/* eslint-disable jsx-a11y/alt-text */

import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Lang } from "@/lib/language-context";
import type { Proposal } from "./types";
import {
  BRAND,
  clausulasLegais,
  docLabels,
  formasPagamento,
  formatBRL,
  investimentoTexto,
  porteLabel,
} from "@/lib/proposta/proposta-doc";

const VIOLET = "#6d28d9";
const FUCHSIA = "#c026d3";
const INK = "#1f2430";
const MUTED = "#5b6472";
const LINE = "#e6e3ef";

const s = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 78, paddingHorizontal: 44, fontSize: 10, color: INK, lineHeight: 1.5 },
  watermark: {
    position: "absolute",
    top: 350,
    left: 8,
    fontSize: 38,
    letterSpacing: 2,
    color: "#c026d3",
    opacity: 0.1,
    transform: "rotate(-38deg)",
    fontFamily: "Helvetica-Bold",
  },
  headerBand: {
    backgroundColor: "#0e0e14",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 132, height: 29, objectFit: "contain" },
  headerRight: { alignItems: "flex-end" },
  docTitle: { fontFamily: "Helvetica-Bold", fontSize: 15, color: "#ffffff" },
  metaLine: { fontSize: 8.5, color: "#b9b3c9" },
  accent: { height: 3, marginTop: 10, marginBottom: 18, borderRadius: 2, backgroundColor: VIOLET },
  proponenteBox: { flexDirection: "row", flexWrap: "wrap", marginTop: 2 },
  proponenteItem: { fontSize: 8.5, color: MUTED, marginRight: 12, marginBottom: 2 },
  proponenteNome: { fontFamily: "Helvetica-Bold", fontSize: 10, color: INK },
  tipo: { fontFamily: "Helvetica-Bold", fontSize: 17, color: INK, marginBottom: 2 },
  portePill: { fontSize: 8, color: VIOLET, marginBottom: 12 },
  sectionLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1,
    color: VIOLET,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: 16,
  },
  paragraph: { fontSize: 10, color: INK },
  bullet: { flexDirection: "row", marginBottom: 3 },
  bulletDot: { color: FUCHSIA, marginRight: 6, fontFamily: "Helvetica-Bold" },
  bulletText: { flex: 1, fontSize: 10 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    fontSize: 8.5,
    color: INK,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  fasesWrap: { marginLeft: 8, borderLeftWidth: 1, borderColor: LINE, marginTop: 2 },
  faseRow: { flexDirection: "row", marginBottom: 8 },
  faseNum: {
    width: 16,
    height: 16,
    marginLeft: -8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: VIOLET,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textAlign: "center",
    paddingTop: 3,
  },
  faseBody: { flex: 1 },
  faseTitulo: { fontFamily: "Helvetica-Bold", fontSize: 10, color: INK },
  faseDesc: { fontSize: 9, color: MUTED, marginTop: 1 },
  grid2: { flexDirection: "row", gap: 12, marginTop: 4 },
  box: { flex: 1, borderWidth: 1, borderColor: LINE, borderRadius: 6, padding: 10 },
  boxLabel: { fontSize: 8, color: MUTED, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 },
  boxValue: { fontFamily: "Helvetica-Bold", fontSize: 13, color: INK },
  boxValueAccent: { fontFamily: "Helvetica-Bold", fontSize: 13, color: FUCHSIA },
  boxSub: { fontSize: 8.5, color: MUTED, marginTop: 2 },
  legalItem: { flexDirection: "row", marginBottom: 3 },
  legalNum: { width: 14, fontSize: 8.5, color: VIOLET, fontFamily: "Helvetica-Bold" },
  legalText: { flex: 1, fontSize: 8.5, color: MUTED },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: LINE,
    paddingTop: 8,
  },
  footerText: { fontSize: 7.5, color: MUTED, lineHeight: 1.4 },
  qr: { width: 40, height: 40 },
});

type Props = {
  proposal: Proposal;
  numero: string;
  dataEmissao: string;
  validade: string;
  lang: Lang;
  qrDataUrl?: string;
};

export default function PropostaPdf({ proposal, numero, dataEmissao, validade, lang, qrDataUrl }: Props) {
  const L = docLabels(lang);
  const clausulas = clausulasLegais(lang);
  const investLinha = investimentoTexto(proposal.investimento, lang);
  const horaLinha =
    proposal.investimento.horaBRL !== null
      ? `${lang === "pt" ? "ou" : "or"} ${formatBRL(proposal.investimento.horaBRL)}/h`
      : null;
  const pagamentos = formasPagamento(lang);

  return (
    <Document title={`${L.documento} ${numero}`} author={BRAND.nome}>
      <Page size="A4" style={s.page}>
        <Text style={s.watermark} fixed>
          {L.semValidade}
        </Text>

        {/* Cabeçalho (faixa escura pra logo aparecer) */}
        <View style={s.headerBand}>
          <Image style={s.logo} src={BRAND.logoUrl} />
          <View style={s.headerRight}>
            <Text style={s.docTitle}>{L.documento}</Text>
            <Text style={s.metaLine}>
              {L.numero}: {numero}
            </Text>
            <Text style={s.metaLine}>
              {L.emissao}: {dataEmissao} · {L.validade}: {validade}
            </Text>
          </View>
        </View>
        <View style={s.accent} />

        <Text style={s.tipo}>{proposal.tipo}</Text>
        <Text style={s.portePill}>
          {L.porte}: {porteLabel(proposal.porte, lang)}
        </Text>

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.resumo}
        </Text>
        <Text style={s.paragraph}>{proposal.resumo}</Text>

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.escopo}
        </Text>
        {proposal.entregaveis.map((e, i) => (
          <View style={s.bullet} key={i} wrap={false}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={s.bulletText}>{e}</Text>
          </View>
        ))}

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.fases}
        </Text>
        <View style={s.fasesWrap}>
          {proposal.fases.map((f, i) => (
            <View style={s.faseRow} key={i} wrap={false}>
              <Text style={s.faseNum}>{i + 1}</Text>
              <View style={s.faseBody}>
                <Text style={s.faseTitulo}>{f.titulo}</Text>
                <Text style={s.faseDesc}>{f.descricao}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.stack}
        </Text>
        <View style={s.chipsRow}>
          {proposal.stack.map((tech, i) => (
            <Text style={s.chip} key={i}>
              {tech}
            </Text>
          ))}
        </View>

        <View style={s.grid2} wrap={false}>
          <View style={s.box}>
            <Text style={s.boxLabel}>{L.prazo}</Text>
            <Text style={s.boxValue}>{proposal.prazoEstimado}</Text>
          </View>
          <View style={s.box}>
            <Text style={s.boxLabel}>{L.investimento}</Text>
            <Text style={s.boxValueAccent}>{investLinha}</Text>
            {horaLinha && <Text style={s.boxSub}>{horaLinha}</Text>}
          </View>
        </View>

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.formasPagamento}
        </Text>
        {pagamentos.map((p, i) => (
          <View style={s.bullet} key={i} wrap={false}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={s.bulletText}>{p}</Text>
          </View>
        ))}

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.proponente}
        </Text>
        <Text style={s.proponenteNome}>
          {BRAND.nome} · {BRAND.cargo[lang]}
        </Text>
        <View style={s.proponenteBox}>
          <Text style={s.proponenteItem}>{BRAND.email}</Text>
          <Text style={s.proponenteItem}>{BRAND.whatsapp}</Text>
          <Text style={s.proponenteItem}>{BRAND.site}</Text>
          <Text style={s.proponenteItem}>{BRAND.github}</Text>
          <Text style={s.proponenteItem}>{BRAND.linkedin}</Text>
        </View>

        <Text style={s.sectionLabel} minPresenceAhead={40}>
          {L.juridico}
        </Text>
        {clausulas.map((c, i) => (
          <View style={s.legalItem} key={i} wrap={false}>
            <Text style={s.legalNum}>{i + 1}.</Text>
            <Text style={s.legalText}>{c}</Text>
          </View>
        ))}

        {/* Rodapé fixo */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            {BRAND.nome} · {porteLabel(proposal.porte, lang)}
            {"\n"}
            {BRAND.site} · {BRAND.email} · {BRAND.whatsapp}
          </Text>
          {qrDataUrl ? <Image style={s.qr} src={qrDataUrl} /> : null}
        </View>
      </Page>
    </Document>
  );
}
