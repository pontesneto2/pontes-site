"use client";

import Link from "next/link";
import { ArrowLeft, Printer, ShieldCheck } from "lucide-react";

const DISCIPLINAS = [
  { nome: "Língua Portuguesa", notas: [8.5, 9.0, 8.0, 8.8], media: 8.6 },
  { nome: "Matemática", notas: [7.5, 8.0, 7.8, 8.2], media: 7.9 },
  { nome: "História", notas: [9.0, 8.5, 9.2, 9.0], media: 8.9 },
  { nome: "Geografia", notas: [8.0, 7.5, 8.5, 8.0], media: 8.0 },
  { nome: "Física", notas: [6.5, 7.0, 7.5, 7.2], media: 7.1 },
  { nome: "Química", notas: [7.0, 6.8, 7.5, 7.0], media: 7.1 },
  { nome: "Biologia", notas: [8.5, 8.8, 8.0, 8.5], media: 8.5 },
  { nome: "Inglês", notas: [9.5, 9.0, 9.2, 9.5], media: 9.3 },
  { nome: "Educação Física", notas: [9.0, 9.5, 9.0, 9.5], media: 9.3 },
  { nome: "Formação Militar", notas: [9.8, 9.5, 9.7, 9.6], media: 9.7 },
];

function fmt(n: number) {
  return n.toFixed(1).replace(".", ",");
}

export default function BoletimExemploPage() {
  return (
    <div className="min-h-screen bg-[#0b0b12] print:bg-white py-10 sm:py-16 print:py-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 print:px-0 print:max-w-none">
        {/* Toolbar — não aparece na impressão */}
        <div className="print:hidden flex items-center justify-between gap-3 mb-8">
          <Link
            href="/case/sistema-escolar-policia"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao estudo de caso
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 hover:scale-[1.03] transition-all duration-300"
          >
            <Printer className="h-4 w-4" />
            Imprimir / Salvar como PDF
          </button>
        </div>

        <p className="print:hidden mb-6 text-xs text-zinc-500 leading-relaxed max-w-2xl">
          Protótipo de boletim individual gerado pelo sistema, com dados fictícios para fins de demonstração. Use o
          botão acima para ver como fica a exportação em PDF — o navegador abre o diálogo de impressão, de onde dá
          para escolher &quot;Salvar como PDF&quot;.
        </p>

        {/* ── Boletim ── */}
        <div className="rounded-[20px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(88,28,155,0.35)] bg-white text-[#1c1c1c] print:rounded-none print:border-0 print:shadow-none">
          {/* Cabeçalho */}
          <div className="bg-[#122d4d] text-white px-8 py-7 sm:px-10 sm:py-8 flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20">
                  <ShieldCheck className="h-5 w-5 text-blue-200" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Sistema Escolar PMCE
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">2º Colégio da Polícia Militar</h1>
              <p className="text-sm text-blue-100/80 mt-1">Cel. Hervano Macêdo Júnior · Fortaleza — CE</p>
            </div>
            <div className="text-right shrink-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                Boletim de Desempenho
              </span>
              <span className="block text-3xl sm:text-4xl font-black mt-1">2026</span>
            </div>
          </div>

          {/* Dados do aluno */}
          <div className="px-8 py-6 sm:px-10 sm:py-7 border-b border-zinc-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              <div className="col-span-2 sm:col-span-2">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Aluno(a)
                </span>
                <span className="block text-base font-bold text-[#122d4d]">João Pedro Alves Ferreira</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Matrícula
                </span>
                <span className="block text-base font-bold text-[#122d4d]">2024-0837</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Turma
                </span>
                <span className="block text-base font-bold text-[#122d4d]">2º EM B</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Ano Letivo
                </span>
                <span className="block text-sm font-semibold text-zinc-700">2026 · Ensino Médio</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Turno
                </span>
                <span className="block text-sm font-semibold text-zinc-700">Integral</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Responsável
                </span>
                <span className="block text-sm font-semibold text-zinc-700">Marta Alves Ferreira</span>
              </div>
            </div>
          </div>

          {/* Notas por disciplina */}
          <div className="px-8 py-6 sm:px-10 sm:py-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#122d4d] mb-3">
              Notas por Disciplina
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#122d4d] text-white">
                    <th className="text-left font-semibold px-3 py-2.5 rounded-l-lg">Disciplina</th>
                    <th className="text-center font-semibold px-3 py-2.5">1º Bim</th>
                    <th className="text-center font-semibold px-3 py-2.5">2º Bim</th>
                    <th className="text-center font-semibold px-3 py-2.5">3º Bim</th>
                    <th className="text-center font-semibold px-3 py-2.5">4º Bim</th>
                    <th className="text-center font-semibold px-3 py-2.5">Média</th>
                    <th className="text-center font-semibold px-3 py-2.5 rounded-r-lg">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {DISCIPLINAS.map((d, idx) => (
                    <tr key={d.nome} className={idx % 2 === 1 ? "bg-zinc-50" : ""}>
                      <td className="px-3 py-2.5 font-semibold text-zinc-800 border-b border-zinc-100">{d.nome}</td>
                      {d.notas.map((n, i) => (
                        <td key={i} className="text-center px-3 py-2.5 text-zinc-600 border-b border-zinc-100">
                          {fmt(n)}
                        </td>
                      ))}
                      <td className="text-center px-3 py-2.5 font-bold text-[#122d4d] border-b border-zinc-100">
                        {fmt(d.media)}
                      </td>
                      <td className="text-center px-3 py-2.5 border-b border-zinc-100">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                          Aprovado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Resumo final */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Média Geral
                </span>
                <span className="block text-xl font-black text-[#122d4d] mt-0.5">8,4</span>
              </div>
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Frequência
                </span>
                <span className="block text-xl font-black text-[#122d4d] mt-0.5">96,5%</span>
              </div>
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Comportamento
                </span>
                <span className="block text-base font-bold text-[#122d4d] mt-1.5">Excelente</span>
              </div>
              <div className="rounded-xl bg-[#122d4d] px-4 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  Situação Final
                </span>
                <span className="block text-base font-bold text-white mt-1.5">Aprovado</span>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="px-8 py-5 sm:px-10 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
            <div>
              <p>Documento emitido eletronicamente em 23/07/2026.</p>
              <p>
                Autenticidade: <span className="font-mono font-semibold text-zinc-600">PMCE-2026-0837-BOL</span> ·
                valide em www.com3brasil.com.br
              </p>
            </div>
            <div className="text-right">
              <p className="border-t border-zinc-300 pt-1 mt-1 sm:mt-0">Direção — Cel. Francisco</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
