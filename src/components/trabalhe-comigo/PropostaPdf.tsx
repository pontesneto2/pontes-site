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
  investimentoTexto,
  porteLabel,
} from "@/lib/proposta/proposta-doc";

const VIOLET = "#6d28d9";
const FUCHSIA = "#c026d3";
const INK = "#1f2430";
const MUTED = "#5b6472";
const LINE = "#e6e3ef";
const SOFT = "#f7f6fb";

const s = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 64, paddingHorizontal: 44, fontSize: 10, color: INK, lineHeight: 1.5 },
  watermark: {
    position: "absolute",
    top: 320,
    left: 90,
    fontSize: 90,
    color: "#000000",
    opacity: 0.04,
    transform: "rotate(-38deg)",
    fontFamily: "Helvetica-Bold",
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 132, height: 29, objectFit: "contain" },
  headerRight: { alignItems: "flex-end" },
  docTitle: { fontFamily: "Helvetica-Bold", fontSize: 15, color: INK },
  metaLine: { fontSize: 8.5, color: MUTED },
  accent: { height: 3, marginTop: 12, marginBottom: 18, borderRadius: 2, backgroundColor: VIOLET },
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
  faseCard: { borderWidth: 1, borderColor: LINE, borderRadius: 6, padding: 9, marginBottom: 6, backgroundColor: SOFT },
  faseHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  faseTitulo: { fontFamily: "Helvetica-Bold", fontSize: 10, color: INK },
  fasePrazo: { fontSize: 8.5, color: VIOLET },
  faseDesc: { fontSize: 9, color: MUTED },
  grid2: { flexDirection: "row", gap: 12, marginTop: 4 },
  box: { flex: 1, borderWidth: 1, borderColor: LINE, borderRadius: 6, padding: 10 },
  boxLabel: { fontSize: 8, color: MUTED, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 },
  boxValue: { fontFamily: "Helvetica-Bold", fontSize: 13, color: INK },
  boxValueAccent: { fontFamily: "Helvetica-Bold", fontSize: 13, color: FUCHSIA },
  boxSub: { fontSize: 8.5, color: MUTED, marginTop: 2 },
  legalItem: { flexDirection: "row", marginBottom: 3 },
  legalNum: { width: 14, fontSize: 8.5, color: VIOLET, fontFamily: "Helvetica-Bold" },
  legalText: { flex: 1, fontSize: 8.5, color: MUTED },
  aceiteRow: { flexDirection: "row", gap: 24, marginTop: 10 },
  aceiteCol: { flex: 1 },
  aceiteLine: { borderTopWidth: 1, borderColor: "#b9b4c9", marginTop: 26, paddingTop: 4 },
  aceiteName: { fontSize: 8.5, color: MUTED },
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
  nomeCliente?: string;
};

export default function PropostaPdf({ proposal, numero, dataEmissao, validade, lang, qrDataUrl, nomeCliente }: Props) {
  const L = docLabels(lang);
  const clausulas = clausulasLegais(lang);
  const investLinha = investimentoTexto(proposal.investimento, lang);
  const horaLinha =
    proposal.investimento.horaBRL !== null
      ? `${lang === "pt" ? "ou" : "or"} R$ ${proposal.investimento.horaBRL}/h`
      : null;

  return (
    <Document title={`${L.documento} ${numero}`} author={BRAND.nome}>
      <Page size="A4" style={s.page}>
        <Text style={s.watermark} fixed>
          {L.preliminar}
        </Text>

        {/* Cabeçalho */}
        <View style={s.headerRow}>
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

        <Text style={s.sectionLabel}>{L.resumo}</Text>
        <Text style={s.paragraph}>{proposal.resumo}</Text>

        <Text style={s.sectionLabel}>{L.escopo}</Text>
        {proposal.entregaveis.map((e, i) => (
          <View style={s.bullet} key={i}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={s.bulletText}>{e}</Text>
          </View>
        ))}

        <Text style={s.sectionLabel}>{L.fases}</Text>
        {proposal.fases.map((f, i) => (
          <View style={s.faseCard} key={i}>
            <View style={s.faseHead}>
              <Text style={s.faseTitulo}>{f.titulo}</Text>
              <Text style={s.fasePrazo}>{f.prazo}</Text>
            </View>
            <Text style={s.faseDesc}>{f.descricao}</Text>
          </View>
        ))}

        <Text style={s.sectionLabel}>{L.stack}</Text>
        <View style={s.chipsRow}>
          {proposal.stack.map((tech, i) => (
            <Text style={s.chip} key={i}>
              {tech}
            </Text>
          ))}
        </View>

        <View style={s.grid2}>
          <View style={s.box}>
            <Text style={s.boxLabel}>{L.prazo}</Text>
            <Text style={s.boxValue}>{proposal.prazoEstimado}</Text>
          </View>
          <View style={s.box}>
            <Text style={s.boxLabel}>{L.investimento}</Text>
            <Text style={s.boxValueAccent}>{investLinha}</Text>
            {horaLinha && <Text style={s.boxSub}>{horaLinha}</Text>}
            <Text style={s.boxSub}>{proposal.pagamentoSugerido}</Text>
          </View>
        </View>

        <Text style={s.sectionLabel}>{L.juridico}</Text>
        {clausulas.map((c, i) => (
          <View style={s.legalItem} key={i}>
            <Text style={s.legalNum}>{i + 1}.</Text>
            <Text style={s.legalText}>{c}</Text>
          </View>
        ))}

        <Text style={s.sectionLabel}>{L.aceite}</Text>
        <View style={s.aceiteRow}>
          <View style={s.aceiteCol}>
            <View style={s.aceiteLine}>
              <Text style={s.aceiteName}>
                {L.cliente}
                {nomeCliente ? `: ${nomeCliente}` : ""}
              </Text>
              <Text style={s.aceiteName}>
                {L.deAcordo} · {L.data}: ___/___/______
              </Text>
            </View>
          </View>
          <View style={s.aceiteCol}>
            <View style={s.aceiteLine}>
              <Text style={s.aceiteName}>
                {L.prestador}: {BRAND.nome}
              </Text>
              <Text style={s.aceiteName}>{BRAND.email}</Text>
            </View>
          </View>
        </View>

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
