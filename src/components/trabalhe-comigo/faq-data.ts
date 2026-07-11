import type { Bilingual } from "@/lib/language-context";

export const FAQ_ITEMS: Array<{ question: Bilingual; answer: Bilingual }> = [
  {
    question: { pt: "Você trabalha 100% remoto?", en: "Do you work 100% remote?" },
    answer: {
      pt: "Sim. Atendo remoto para o Brasil e exterior, em português e inglês. Toda comunicação, entrega e suporte acontecem online.",
      en: "Yes. I work remotely for Brazil and abroad, in Portuguese and English. All communication, delivery and support happen online.",
    },
  },
  {
    question: { pt: "Como funciona o pagamento?", en: "How does payment work?" },
    answer: {
      pt: "No modelo por pacote, o mais comum: fechamos contrato com escopo e valor definidos, e o pagamento é dividido em 50% no início e 50% na entrega da solução pronta. Também dá pra trabalhar por hora ou num plano mensal, conforme o projeto.",
      en: "In the package model, the most common one: we sign a contract with a defined scope and price, and payment is split 50% upfront and 50% on delivery of the finished solution. It's also possible to work hourly or on a monthly plan, depending on the project.",
    },
  },
  {
    question: { pt: "De quem fica o código no final?", en: "Who owns the code at the end?" },
    answer: {
      pt: "Seu. A propriedade intelectual é transferida na entrega: repositório, credenciais e tudo que for necessário para você seguir independente.",
      en: "Yours. Intellectual property is transferred on delivery: repository, credentials and everything needed for you to move forward independently.",
    },
  },
  {
    question: { pt: "Tem contrato de verdade?", en: "Is there a real contract?" },
    answer: {
      pt: "Sempre. Todo projeto começa com contrato de prestação de serviços e proposta com escopo documentado. Nada roda no boca a boca.",
      en: "Always. Every project starts with a service agreement and a proposal with documented scope. Nothing runs on a handshake.",
    },
  },
  {
    question: { pt: "Quanto tempo leva um projeto?", en: "How long does a project take?" },
    answer: {
      pt: "Depende do escopo. Um site institucional pode sair em semanas; um sistema ou app completo leva de alguns meses. Use o gerador de proposta acima para uma estimativa na hora.",
      en: "It depends on the scope. A corporate website can ship in weeks; a full system or app takes a few months. Use the proposal generator above for an instant estimate.",
    },
  },
  {
    question: { pt: "E depois da entrega, tenho suporte?", en: "Do I get support after delivery?" },
    answer: {
      pt: "Sim. Há um período de garantia para correções e a opção de um plano mensal para evolução contínua do produto.",
      en: "Yes. There's a warranty period for fixes and the option of a monthly plan for continuous product evolution.",
    },
  },
];
