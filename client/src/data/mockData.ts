import { z } from "zod";

export type ContentType = "master_prompt" | "architecture" | "conversion_system" | "narrative_engine";
export type ContentLevel = "Fundacional" | "Avançado" | "Especialista";
export type ContentTool = "ChatGPT Plus" | "Claude 3.5 Sonnet" | "Midjourney v6" | "Gemini Advanced" | "Agnóstico";
export type VisualType = "prompt_anatomy" | "framework_map" | "funnel_illustration" | "script_storyboard";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  content: string; // Markdown content
  image: string;
  tags: string[];
  level: ContentLevel;
  tools: ContentTool[];
  isPremium?: boolean;
  isNew?: boolean;
  relatedIds?: string[];
  visualType: VisualType;
  visualData: any;
}

export interface Category {
  id: string;
  title: string;
  items: ContentItem[];
}

import thumbPrompts from "../assets/images/thumb-prompts.png";
import thumbFrameworks from "../assets/images/thumb-frameworks.png";
import thumbCopys from "../assets/images/thumb-copys.png";
import thumbScripts from "../assets/images/thumb-scripts.png";
import heroBg from "../assets/images/hero-bg.png";

export const assets = {
  heroBg,
  thumbPrompts,
  thumbFrameworks,
  thumbCopys,
  thumbScripts
};

const getVisualData = (type: ContentType) => {
  if (type === 'master_prompt') {
    return {
      type: "prompt_anatomy" as VisualType,
      data: {
        blocks: [
          { name: "SYSTEM INSTRUCTION", role: "Define a base cognitiva e regras absolutas.", color: "border-purple-500", text: "text-purple-400" },
          { name: "CONTEXTO", role: "Alinha a IA com o cenário atual do mercado.", color: "border-blue-500", text: "text-blue-400" },
          { name: "PARÂMETROS DE EXECUÇÃO", role: "Limita o formato e tom de voz da saída.", color: "border-emerald-500", text: "text-emerald-400" },
          { name: "CHAIN-OF-THOUGHT", role: "Força o raciocínio em etapas antes da resposta.", color: "border-orange-500", text: "text-orange-400" }
        ],
        outputPreview: "Análise estratégica de 4 quadrantes com alta precisão."
      }
    };
  }
  
  if (type === 'architecture') {
    return {
      type: "framework_map" as VisualType,
      data: {
        nodes: [
          { id: 1, title: "Input Cru", desc: "Transcrição ou Dados Desestruturados" },
          { id: 2, title: "Fase 1: Extração", desc: "Mapeamento de Padrões e Sinais" },
          { id: 3, title: "Fase 2: Síntese", desc: "Construção do Core Message" },
          { id: 4, title: "Output Final", desc: "Estratégia Pronta para Escala" }
        ]
      }
    };
  }

  if (type === 'conversion_system') {
    return {
      type: "funnel_illustration" as VisualType,
      data: {
        stages: [
          { name: "Problema (Atenção)", metric: "100% Retenção Inicial" },
          { name: "Agitação (Interesse)", metric: "60% Chegam Aqui" },
          { name: "Causa (Desejo)", metric: "Construção de Lógica" },
          { name: "Transformação (Ação)", metric: "Alta Taxa de Conversão" }
        ]
      }
    };
  }

  return {
    type: "script_storyboard" as VisualType,
    data: {
      scenes: [
        { time: "0-3s", name: "O Gancho Visual", desc: "Quebra de padrão, movimento brusco, promessa forte.", img: thumbScripts },
        { time: "3-15s", name: "A Ponte", desc: "Conecta a promessa inicial com a dor real do usuário.", img: thumbScripts },
        { time: "15-45s", name: "O Mecanismo", desc: "Explica COMO funciona, gerando 'Aha Moment'.", img: thumbScripts },
        { time: "45-60s", name: "CTA Indireto", desc: "Chamada para ação focada em curiosidade (Ex: 'Olha o link na bio').", img: thumbScripts }
      ]
    }
  };
};

const createMockContent = (type: ContentType, title: string) => {
  if (type === 'master_prompt') {
    return `
# ${title}
## Engenharia de Contexto
Este prompt foi desenvolvido para hackear a janela de contexto de modelos LLM de ponta, forçando-os a adotar uma persona estrita antes de gerar qualquer output. Ele utiliza a técnica de **Chain-of-Thought (CoT)** combinada com **Few-Shot Prompting**.

## O Código-Fonte (Prompt)
\`\`\`markdown
[SYSTEM INSTRUCTION: INITIATE OMNI-EXPERT MODE]

Aja como um Estrategista de Elite com 20 anos de experiência em [INSERIR_NICHO], com especialização profunda em psicologia comportamental e análise de dados.

CONTEXTO:
Estou lançando um produto focado em [INSERIR_PRODUTO]. O maior desafio do meu público é [INSERIR_DOR_PRINCIPAL]. 

PARÂMETROS DE EXECUÇÃO:
1. Tom de Voz: Autoritário, cirúrgico, sem jargões desnecessários, focado em resultados.
2. Formato de Saída: Matriz de 4 quadrantes (Ação, Impacto, Esforço, Risco) seguida de um plano de execução de 3 fases.
3. Restrições: Não use listas genéricas. Traga apenas insights contraintuitivos ou táticas de alto nível.

PROCESSO DE PENSAMENTO (CoT):
Antes de gerar a resposta final, analise silenciosamente o mercado de [INSERIR_NICHO] e identifique 3 falhas comuns que os concorrentes cometem. Use essas falhas como base para a estratégia.

EXECUTE.
\`\`\`

## Guia de Implementação
- **Temperatura Recomendada:** 0.4 (para maior precisão analítica).
- **Variáveis Chave:** Preencha os colchetes com máxima especificidade. "Vendas" é fraco; "Vendas B2B High-Ticket de SaaS" é forte.
- **Caso de Uso Principal:** Planejamento estratégico inicial antes de criar campanhas ou produtos.
`;
  }
  
  if (type === 'architecture') {
    return `
# ${title}
## Visão Sistêmica
Este framework não é um mero comando; é uma arquitetura de múltiplos passos desenhada para orquestrar LLMs em esteiras de produção complexas.

## Diagrama Lógico
\`[Fase 1: Extração] -> [Fase 2: Síntese] -> [Fase 3: Expansão] -> [Fase 4: Refinamento]\`

## Prompt da Fase 1: A Extração de Ouro
\`\`\`markdown
Eu vou te fornecer uma transcrição crua de uma reunião de 1 hora.
Sua tarefa é agir como um Analista de Sinais.

DIRETRIZES DE EXTRAÇÃO:
- Ignore "small talk" e introduções.
- Extraia apenas: 
  A) Padrões de comportamento do cliente.
  B) Objeções não verbais (hesitações, repetições).
  C) Gatilhos emocionais acionados.

FORMATO:
JSON estruturado contendo { "padroes": [], "objecoes": [], "gatilhos": [] }

[COLE A TRANSCRIÇÃO AQUI]
\`\`\`

## Prompt da Fase 2: Síntese Estratégica
\`\`\`markdown
Assuma o papel de Head de Produto. 
Usando o JSON gerado no passo anterior, construa um argumento de vendas central (Core Message) que invalide diretamente a objeção mais crítica identificada.
\`\`\`

## Instruções de Escala
Você pode automatizar esta arquitetura conectando a API da OpenAI ao Make.com, passando o output da Fase 1 diretamente como input da Fase 2.
`;
  }

  return `
# ${title}
## Engenharia Reversa
Este material foi criado através da desconstrução das peças de maior conversão do mercado global nos últimos 6 meses, traduzindo a estrutura psicológica para prompts de IA.

## A Estrutura Base
A estrutura segue o modelo **PACT** (Problema, Agitação, Causa, Transformação).

## O Prompt Gerador
\`\`\`markdown
Você é um Copywriter de Resposta Direta de Elite, especializado em funis de alto ticket.

Sua tarefa é criar um VSL (Video Sales Letter) Lead de 3 minutos usando o framework PACT.

DADOS DO PRODUTO:
- Oferta: [INSERIR]
- Mecanismo Único: [INSERIR]
- Inimigo Comum: [INSERIR]

REGRAS ESTILÍSTICAS:
- Frases curtas (máximo 15 palavras).
- Padrões de interrupção a cada 3 parágrafos.
- Nível de leitura: 6ª série (Simples e direto).

Estruture o output com marcações visuais de edição:
[Corte Rápido]
[Zoom In]
[Música de Tensão]
\`\`\`

## Notas do Autor
O segredo deste prompt não é pedir um texto de vendas, mas sim forçar o LLM a pensar em elementos de ritmo de vídeo ([Corte Rápido]), o que afeta drasticamente a cadência do texto gerado, tornando-o muito mais dinâmico.
`;
};

const createMockItems = (
  count: number,
  type: ContentType,
  image: string,
  prefix: string,
  tools: ContentTool[]
): ContentItem[] => {
  const premiumTitles = [
    'O Sistema de Persuasão Omnicanal',
    'Matriz de Criação de Autoridade',
    'Prompt Zero: Inicialização de Contexto Profundo',
    'Engenharia de Prompt para High-Ticket',
    'Arquitetura de Funil Autônomo',
    'Protocolo de Síntese de Conhecimento',
    'O Cérebro de Copywriting de Elite'
  ];

  return Array.from({ length: count }).map((_, i) => {
    const title = `${premiumTitles[i % premiumTitles.length]} - V.${Math.floor(Math.random() * 5) + 1}.0`;
    const visual = getVisualData(type);
    
    return {
      id: `${type}-${i + 1}`,
      type,
      title: title,
      description: `Uma estrutura profunda de engenharia de prompts focada em extrair o máximo poder cognitivo dos modelos de linguagem para ${['escala de conversão', 'análise sistêmica', 'produção de escala', 'estratégia avançada'][i % 4]}.`,
      content: createMockContent(type, title),
      image,
      tags: [
        ['Engenharia Avançada', 'Lógica de Sistemas', 'Chain-of-Thought'][i % 3],
        ['Alta Conversão', 'Escala', 'Automação'][i % 3],
        ['Estratégia', 'Tático', 'Operacional'][i % 3]
      ],
      level: ['Especialista', 'Avançado', 'Avançado'][i % 3] as ContentLevel,
      tools: [tools[i % tools.length]],
      isPremium: i % 4 === 0,
      isNew: i < 3,
      visualType: visual.type,
      visualData: visual.data,
    };
  });
};

const allPrompts = createMockItems(20, "master_prompt", thumbPrompts, "Master", ["Claude 3.5 Sonnet", "ChatGPT Plus"]);
const allFrameworks = createMockItems(20, "architecture", thumbFrameworks, "Arquitetura", ["Agnóstico"]);
const allCopys = createMockItems(20, "conversion_system", thumbCopys, "Sistema", ["ChatGPT Plus", "Claude 3.5 Sonnet"]);
const allScripts = createMockItems(20, "narrative_engine", thumbScripts, "Narrativa", ["Claude 3.5 Sonnet", "Gemini Advanced"]);

export const allContent = [...allPrompts, ...allFrameworks, ...allCopys, ...allScripts];

export const homeCategories: Category[] = [
  {
    id: "trending-elite",
    title: "Em Alta Entre Especialistas",
    items: [allPrompts[0], allFrameworks[2], allCopys[5], allScripts[1], allPrompts[10], allFrameworks[7]],
  },
  {
    id: "architectures",
    title: "Arquiteturas Sistêmicas",
    items: allFrameworks.slice(0, 10),
  },
  {
    id: "master-prompts",
    title: "Master Prompts (Engenharia Profunda)",
    items: allPrompts.slice(0, 10),
  },
  {
    id: "conversion",
    title: "Sistemas de Conversão",
    items: allCopys.slice(0, 10),
  },
  {
    id: "narrative",
    title: "Motores Narrativos",
    items: allScripts.slice(0, 10),
  },
];

const heroVisual = getVisualData('architecture');
export const heroContent: ContentItem = {
  id: "hero-featured",
  type: "architecture",
  title: "A Matriz de Criação Infinita V.2",
  description: "Uma arquitetura de engenharia de prompt avançada que utiliza multi-agentes simulados e chain-of-thought para escalar produção de conteúdo mantendo 100% de coerência tonal e autoridade técnica. O segredo dos Top Players.",
  content: createMockContent('architecture', 'A Matriz de Criação Infinita V.2'),
  image: heroBg,
  tags: ["Masterclass", "Chain-of-Thought", "Multi-agentes"],
  level: "Especialista",
  tools: ["Claude 3.5 Sonnet", "ChatGPT Plus"],
  isPremium: true,
  isNew: true,
  visualType: heroVisual.type,
  visualData: heroVisual.data,
};