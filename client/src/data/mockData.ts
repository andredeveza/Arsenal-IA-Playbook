import { z } from "zod";

export type ContentType = "prompt" | "framework" | "copy" | "script";
export type ContentLevel = "Iniciante" | "Intermediário" | "Avançado";
export type ContentTool = "ChatGPT" | "Claude" | "Midjourney" | "Gemini" | "Geral";

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
}

export interface Category {
  id: string;
  title: string;
  items: ContentItem[];
}

// Generate mock data for the arsenal
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

const createMockItems = (
  count: number,
  type: ContentType,
  image: string,
  prefix: string,
  tools: ContentTool[]
): ContentItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${type}-${i + 1}`,
    type,
    title: `${prefix} ${i + 1}: ${['Mestre da Conversão', 'Gênio Analítico', 'Criador de Mundos', 'Estrategista Viral'][i % 4]}`,
    description: `Um ${type} poderoso para elevar seus resultados a outro nível. Ideal para profissionais exigentes.`,
    content: `
# ${prefix} ${i + 1}
## O Problema
Muitas vezes você não consegue o resultado esperado porque não estruturou corretamente a requisição.

## O ${type === 'prompt' ? 'Prompt' : type === 'framework' ? 'Framework' : type === 'copy' ? 'Copy' : 'Script'}
\`\`\`markdown
Aja como um especialista em [Sua Área].
Eu preciso que você me ajude a [Seu Objetivo].
Considere os seguintes parâmetros:
1. Público-alvo: [Público]
2. Tom de voz: [Tom]
3. Formato: [Formato]
\`\`\`

## Como usar
1. Copie o texto acima
2. Substitua os campos entre colchetes
3. Cole no seu LLM favorito
    `,
    image,
    tags: [
      ['Marketing', 'Vendas', 'Copywriting'][i % 3],
      ['SEO', 'Social Media', 'E-mail'][i % 3],
      ['Estratégia', 'Tático', 'Operacional'][i % 3]
    ],
    level: ['Iniciante', 'Intermediário', 'Avançado'][i % 3] as ContentLevel,
    tools: [tools[i % tools.length]],
    isPremium: i % 5 === 0,
    isNew: i < 5,
  }));
};

const allPrompts = createMockItems(25, "prompt", thumbPrompts, "Prompt", ["ChatGPT", "Claude"]);
const allFrameworks = createMockItems(25, "framework", thumbFrameworks, "Framework", ["Geral"]);
const allCopys = createMockItems(25, "copy", thumbCopys, "Copy", ["ChatGPT", "Claude", "Gemini"]);
const allScripts = createMockItems(25, "script", thumbScripts, "Script", ["ChatGPT", "Claude"]);

export const allContent = [...allPrompts, ...allFrameworks, ...allCopys, ...allScripts];

export const homeCategories: Category[] = [
  {
    id: "continue-watching",
    title: "Continue Explorando",
    items: [allPrompts[0], allFrameworks[2], allCopys[5], allScripts[1], allPrompts[10], allFrameworks[7]],
  },
  {
    id: "new-releases",
    title: "Adicionados Recentemente",
    items: allContent.filter(item => item.isNew).slice(0, 10),
  },
  {
    id: "prompts-master",
    title: "Prompts de Mestre (Top 1%)",
    items: allPrompts.slice(0, 12),
  },
  {
    id: "frameworks-strategy",
    title: "Frameworks Estratégicos",
    items: allFrameworks.slice(0, 12),
  },
  {
    id: "viral-scripts",
    title: "Scripts Virais para Vídeos",
    items: allScripts.slice(0, 12),
  },
  {
    id: "high-ticket-copy",
    title: "Copys High-Ticket",
    items: allCopys.slice(0, 12),
  },
  {
    id: "premium-exclusive",
    title: "Arsenal Premium Exclusivo",
    items: allContent.filter(item => item.isPremium).slice(0, 15),
  },
];

export const heroContent: ContentItem = {
  id: "hero-featured",
  type: "framework",
  title: "A Matriz de Criação Infinita",
  description: "O framework definitivo utilizado por top creators para gerar meses de conteúdo em apenas algumas horas usando Inteligência Artificial avançada.",
  content: "# A Matriz de Criação Infinita\n\nEste é o framework principal...",
  image: heroBg,
  tags: ["Masterclass", "Conteúdo", "Estratégia"],
  level: "Avançado",
  tools: ["ChatGPT", "Claude"],
  isPremium: true,
  isNew: true,
};
