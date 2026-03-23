import { z } from "zod";

export type ContentType = "master_prompt" | "architecture" | "conversion_system" | "narrative_engine";
export type ContentLevel = "Iniciante" | "Intermediário" | "Avançado" | "Mestre";
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

const getVisualData = (type: ContentType, level: ContentLevel) => {
  if (type === 'master_prompt') {
    const blocks = level === 'Iniciante' ? [
      { name: "TAREFA", role: "O que a IA deve fazer", color: "border-blue-500", text: "text-blue-400" },
      { name: "CONTEXTO", role: "Informação básica", color: "border-green-500", text: "text-green-400" }
    ] : level === 'Intermediário' ? [
      { name: "PAPEL", role: "Persona a ser adotada", color: "border-purple-500", text: "text-purple-400" },
      { name: "TAREFA", role: "Ação específica", color: "border-blue-500", text: "text-blue-400" },
      { name: "REGRAS", role: "Restrições de formato", color: "border-orange-500", text: "text-orange-400" }
    ] : level === 'Avançado' ? [
      { name: "SYSTEM", role: "Instrução cognitiva base", color: "border-red-500", text: "text-red-400" },
      { name: "CONTEXTO PROFUNDO", role: "Cenário detalhado", color: "border-blue-500", text: "text-blue-400" },
      { name: "FEW-SHOT", role: "Exemplos de saída", color: "border-green-500", text: "text-green-400" },
      { name: "RESTRIÇÕES", role: "Limites estritos", color: "border-orange-500", text: "text-orange-400" }
    ] : [
      { name: "SYSTEM INSTRUCTION", role: "Define a base cognitiva e regras absolutas.", color: "border-purple-500", text: "text-purple-400" },
      { name: "CONTEXTO", role: "Alinha a IA com o cenário atual do mercado.", color: "border-blue-500", text: "text-blue-400" },
      { name: "PARÂMETROS DE EXECUÇÃO", role: "Limita o formato e tom de voz da saída.", color: "border-emerald-500", text: "text-emerald-400" },
      { name: "CHAIN-OF-THOUGHT", role: "Força o raciocínio em etapas antes da resposta.", color: "border-orange-500", text: "text-orange-400" }
    ];

    return {
      type: "prompt_anatomy" as VisualType,
      data: {
        blocks,
        outputPreview: level === 'Mestre' ? "Análise estratégica de 4 quadrantes com alta precisão." : 
                       level === 'Avançado' ? "Texto altamente persuasivo e formatado perfeitamente." :
                       level === 'Intermediário' ? "Resposta estruturada seguindo as regras." :
                       "Resposta simples e direta à pergunta."
      }
    };
  }
  
  if (type === 'architecture') {
    const nodes = level === 'Iniciante' ? [
      { id: 1, title: "Input", desc: "Texto Base" },
      { id: 2, title: "Output", desc: "Resumo" }
    ] : level === 'Intermediário' ? [
      { id: 1, title: "Coleta", desc: "Dados Iniciais" },
      { id: 2, title: "Processamento", desc: "Análise IA" },
      { id: 3, title: "Revisão", desc: "Ajuste Final" }
    ] : level === 'Avançado' ? [
      { id: 1, title: "Extração", desc: "Identificação de Sinais" },
      { id: 2, title: "Síntese", desc: "Criação de Lógica" },
      { id: 3, title: "Expansão", desc: "Geração de Conteúdo" }
    ] : [
      { id: 1, title: "Input Cru", desc: "Transcrição ou Dados Desestruturados" },
      { id: 2, title: "Fase 1: Extração", desc: "Mapeamento de Padrões e Sinais" },
      { id: 3, title: "Fase 2: Síntese", desc: "Construção do Core Message" },
      { id: 4, title: "Output Final", desc: "Estratégia Pronta para Escala" }
    ];

    return {
      type: "framework_map" as VisualType,
      data: { nodes }
    };
  }

  if (type === 'conversion_system') {
    const stages = level === 'Iniciante' ? [
      { name: "Atenção", metric: "Visitas" },
      { name: "Ação", metric: "Cliques" }
    ] : level === 'Intermediário' ? [
      { name: "Problema", metric: "Engajamento" },
      { name: "Solução", metric: "Interesse" },
      { name: "Oferta", metric: "Vendas" }
    ] : [
      { name: "Problema (Atenção)", metric: "100% Retenção Inicial" },
      { name: "Agitação (Interesse)", metric: "60% Chegam Aqui" },
      { name: "Causa (Desejo)", metric: "Construção de Lógica" },
      { name: "Transformação (Ação)", metric: "Alta Taxa de Conversão" }
    ];

    return {
      type: "funnel_illustration" as VisualType,
      data: { stages }
    };
  }

  const scenes = level === 'Iniciante' ? [
    { time: "0-5s", name: "Introdução", desc: "Apresenta o tema do vídeo.", img: thumbScripts },
    { time: "5-30s", name: "Conteúdo", desc: "Explica o assunto principal.", img: thumbScripts },
    { time: "30-40s", name: "Encerramento", desc: "Pede like e inscrição.", img: thumbScripts }
  ] : level === 'Intermediário' ? [
    { time: "0-3s", name: "Gancho", desc: "Chama a atenção rápido.", img: thumbScripts },
    { time: "3-20s", name: "História", desc: "Conta uma breve narrativa.", img: thumbScripts },
    { time: "20-40s", name: "Lição", desc: "Entrega o valor.", img: thumbScripts },
    { time: "40-50s", name: "CTA", desc: "Chamada para ação clara.", img: thumbScripts }
  ] : [
    { time: "0-3s", name: "O Gancho Visual", desc: "Quebra de padrão, movimento brusco, promessa forte.", img: thumbScripts },
    { time: "3-15s", name: "A Ponte", desc: "Conecta a promessa inicial com a dor real do usuário.", img: thumbScripts },
    { time: "15-45s", name: "O Mecanismo", desc: "Explica COMO funciona, gerando 'Aha Moment'.", img: thumbScripts },
    { time: "45-60s", name: "CTA Indireto", desc: "Chamada para ação focada em curiosidade.", img: thumbScripts }
  ];

  return {
    type: "script_storyboard" as VisualType,
    data: { scenes }
  };
};

const createMockContent = (type: ContentType, title: string, level: ContentLevel) => {
  if (level === 'Iniciante') {
    return `
# ${title}
## O Básico Funciona
Este prompt é perfeito para quem está começando e precisa de resultados rápidos sem complicação. Ele entrega exatamente o que é pedido de forma direta.

## Objetivo
Gerar textos introdutórios de forma rápida e com tom de voz adaptável.

## Contexto e Papel
A IA atua como um assistente geral de redação, sem necessidade de assumir uma persona muito complexa. O foco é na clareza.

## O Prompt
\`\`\`markdown
Escreva um texto sobre [SEU TEMA].
O texto deve ser voltado para [SEU PÚBLICO].
Por favor, use um tom de voz [ESCOLHA O TOM].
\`\`\`

## Entradas Esperadas
- **[SEU TEMA]:** Assunto principal (ex: Benefícios da meditação)
- **[SEU PÚBLICO]:** Quem vai ler (ex: Iniciantes no assunto)
- **[ESCOLHA O TOM]:** Como o texto deve soar (ex: Amigável, formal)

## Exemplo de Uso
\`\`\`markdown
Escreva um texto sobre os benefícios da meditação matinal.
O texto deve ser voltado para pessoas que acordam cedo mas se sentem cansadas.
Por favor, use um tom de voz acolhedor e motivacional.
\`\`\`

## Quando usar
- Para rascunhos rápidos.
- Quando você precisa de ideias iniciais.
- Para textos curtos de redes sociais.

## Quando NÃO usar
- Para criar artigos profundos ou técnicos.
- Quando for necessária uma estratégia complexa de vendas.
- Para gerar código ou análises de dados.

## Variações e Dicas
Se o texto ficar muito longo, adicione "Seja breve" ou "Use no máximo 3 parágrafos" ao final do prompt.
`;
  }
  
  if (level === 'Intermediário') {
    return `
# ${title}
## Estrutura Aprimorada
Para usuários que já entendem o básico e querem mais controle sobre o resultado da IA. Este prompt introduz regras de formatação e restrições.

## Objetivo
Criar conteúdo bem estruturado com opções de escolha, forçando a IA a seguir diretrizes específicas.

## Contexto e Papel
A IA assume o papel de um especialista em uma área determinada, garantindo que o vocabulário e a abordagem estejam adequados ao nicho.

## O Prompt
\`\`\`markdown
Aja como um especialista em [SUA ÁREA].
Sua tarefa é criar [TIPO DE CONTEÚDO] sobre [TEMA].

REGRAS:
1. O público-alvo é [PÚBLICO] com nível de conhecimento [NÍVEL].
2. O objetivo principal do texto é [OBJETIVO].
3. O tom de voz deve ser [TOM DE VOZ].
4. O formato DEVE incluir uma introdução atraente, 3 pontos principais (bullet points) e uma conclusão com chamada para ação.

Por favor, forneça 2 opções diferentes com abordagens distintas para eu escolher.
\`\`\`

## Estrutura de Saída
O prompt exige uma estrutura fixa (Introdução -> 3 Pontos -> Conclusão + CTA) e retorna múltiplas opções, facilitando o trabalho de curadoria.

## Quando usar
- Para criar posts de blog ou newsletters.
- Quando você precisa de diferentes ângulos para o mesmo assunto.
- Para padronizar o formato das respostas da IA.

## Observações Práticas
Seja específico na seção de regras para evitar que a IA seja muito genérica. O nível de conhecimento do público (Regra 1) muda drasticamente a escolha de palavras da IA.
`;
  }
  
  if (level === 'Avançado') {
    return `
# ${title}
## Engenharia Avançada (Restrições Estritas)
Este framework exige conhecimento de como os LLMs raciocinam. Utiliza o método de "Role-Task-Format" expandido com injeção de contexto situacional e restrições negativas.

## Objetivo
Desenvolver funis de vendas ou sequências lógicas de alta conversão, controlando não apenas o que a IA diz, mas como ela estrutura o ritmo da leitura.

## O Prompt
\`\`\`markdown
Você é um Copywriter Sênior especializado em funis de venda de [NICHO].

SITUAÇÃO:
Estamos lançando um produto que promete [PROMESSA] através do mecanismo [MECANISMO]. O problema atual do mercado é [PROBLEMA].

TAREFA:
Crie uma sequência de 3 e-mails de aquecimento usando o framework P.A.S. (Problema, Agitação, Solução).

RESTRIÇÕES DE ESTILO (CRÍTICO):
- E-mail 1: Foque apenas em [FOCO 1]. Máximo de 150 palavras.
- E-mail 2: Quebre a objeção [OBJEÇÃO]. Use storytelling (formato de anedota curta).
- E-mail 3: Faça o pitch de vendas focado em escassez [TIPO DE ESCASSEZ].
- Formatação: Frases curtas. Parágrafos de no máximo 2 linhas. Vocabulário de 6ª série.
- PROIBIDO: Evite adjetivos genéricos como "incrível", "fantástico" ou "inovador".

Por favor, gere apenas os e-mails, sem explicações extras.
\`\`\`

## Entradas Críticas
- **[MECANISMO]:** O diferencial técnico do seu produto.
- **[OBJEÇÃO]:** O maior motivo pelo qual as pessoas não compram.
- A seção "SITUAÇÃO" atua como a âncora de conhecimento do LLM.

## Quando usar
- Na elaboração de copy para lançamentos reais.
- Quando a voz da marca precisa ser estritamente mantida.
- Para gerar conteúdo que soe humano (devido às restrições de formatação de parágrafos).

## Quando NÃO usar
- Para tarefas de ideação (brainstorming), pois as restrições limitam a criatividade divergente da IA.
`;
  }

  // Mestre
  if (type === 'master_prompt') {
    return `
# ${title}
## Engenharia de Contexto Profunda (Nível Mestre)
Este prompt foi desenvolvido para hackear a janela de contexto de modelos LLM de ponta, forçando-os a adotar uma persona estrita antes de gerar qualquer output. Ele utiliza a técnica de **Chain-of-Thought (CoT)** combinada com **Few-Shot Prompting**.

## O Código-Fonte (Prompt)
\`\`\`markdown
[SYSTEM INSTRUCTION: INITIATE OMNI-EXPERT MODE]

Aja como um Estrategista de Elite com 20 anos de experiência em [INSERIR_NICHO], com especialização profunda em psicologia comportamental e análise de dados.

CONTEXTO ESTRUTURAL:
- Produto/Oferta: [INSERIR_PRODUTO]
- Dor Central do Mercado: [INSERIR_DOR_PRINCIPAL]
- Posição da Concorrência: [INSERIR_FALHA_DA_CONCORRENCIA]

PARÂMETROS DE EXECUÇÃO ESTRITA:
1. Tom de Voz: Autoritário, cirúrgico, sem jargões, focado em mecanismos causais.
2. Formato de Saída: Matriz de 4 quadrantes (Ação, Impacto, Esforço, Risco) seguida de um plano de execução tático de 3 fases.
3. Restrições Absolutas: PROIBIDO usar listas genéricas. PROIBIDO usar palavras como "revolucionário", "mergulhar", "desvendar". Traga apenas insights contraintuitivos ou táticas assimétricas.

PROCESSO DE PENSAMENTO OBRIGATÓRIO (CoT):
Antes de gerar a resposta final, crie um bloco de código <thinking> onde você analisa silenciosamente o mercado de [INSERIR_NICHO], identifica 3 vieses cognitivos comuns do público-alvo, e mapeia como a nossa oferta invalida a abordagem tradicional.

EXECUTE A PARTIR DAQUI.
\`\`\`

## A Lógica por trás do Prompt (Anatomia)
1. **Ativação de Persona:** Ao definir 20 anos de experiência + especialização dupla (psicologia + dados), forçamos o LLM a acessar clusters de conhecimento de alto nível.
2. **Restrições Absolutas (Negative Prompting):** Eliminar o jargão de IA ("mergulhar", "desvendar") força o modelo a usar vocabulário não padronizado, soando extremamente autêntico.
3. **CoT (Chain-of-Thought):** O bloco \`<thinking>\` é o segredo. Ele obriga a IA a "pensar em voz alta" e resolver a lógica antes de gerar o texto final. Isso reduz alucinações a zero e aumenta a precisão estratégica em 400%.

## Guia de Implementação Tática
- **Temperatura Recomendada:** 0.2 a 0.4 (para minimizar alucinação e maximizar precisão lógica).
- **Variáveis Críticas:** A qualidade do output cai 80% se os colchetes não forem preenchidos com ultra-especificidade.
- **Caso de Uso Principal:** Desenho de estratégia oceano azul antes de gastar qualquer verba em tráfego ou produção de copy.
`;
  }
  
  return `
# ${title}
## Arquitetura Sistêmica (Nível Mestre)
Este não é apenas um prompt, é um sistema autônomo projetado para ser encadeado em pipelines de automação ou workflows complexos. Ele lida com ambiguidade de dados de entrada e estrutura saídas determinísticas.

## Visão Geral do Sistema
O objetivo desta arquitetura é pegar dados completamente não estruturados (ex: transcrições longas, pesquisas de clientes) e transformá-los em um ativo de conversão pronto para uso.

## O Sistema (Prompt)
\`\`\`markdown
SISTEMA DE SÍNTESE COGNITIVA INICIADO.

# FASE 1: INGESTÃO E CLASSIFICAÇÃO
Analise os dados de entrada fornecidos abaixo. Identifique:
1. Sinais de frustração (o que o usuário odeia).
2. Sinais de desejo latente (o que ele realmente quer, mas não sabe pedir).
3. Linguagem exata (frases exatas que ele usa).

# FASE 2: CONSTRUÇÃO DE ARGUMENTO (CORE MESSAGE)
Usando a "Linguagem exata" extraída, construa uma promessa (Headline) de até 8 palavras que resolva o "Desejo latente" sem acionar os "Sinais de frustração".

# FASE 3: OUTPUT ESTRUTURADO
Retorne APENAS um objeto JSON com o seguinte schema:
{
  "analise_mercado": { "frustracoes": [], "desejos": [], "glossario_cliente": [] },
  "estrategia_copy": { "headline_primaria": "", "mecanismo_sugerido": "" }
}

[DADOS_DE_ENTRADA_AQUI]
\`\`\`

## Lógica de Engenharia
Ao forçar a saída em JSON na Fase 3, garantimos que este prompt pode ser consumido por APIs (Make, Zapier, n8n) sem quebrar fluxos subsequentes. A divisão em Fases simula múltiplos agentes raciocinando em sequência.

## Melhor Uso
Para análise em massa de avaliações de produtos (Amazon, App Store) ou transcrições de entrevistas de Customer Success.
  `;
};

const createMockItems = (
  count: number,
  type: ContentType,
  image: string,
  prefix: string,
  tools: ContentTool[]
): ContentItem[] => {
  const titles = [
    'Fundamentos de',
    'Táticas de',
    'O Sistema de',
    'A Matriz de',
    'Protocolo Avançado de',
    'Engenharia de',
    'O Cérebro de'
  ];

  return Array.from({ length: count }).map((_, i) => {
    // Distribute levels: 25% Iniciante, 25% Intermediário, 25% Avançado, 25% Mestre
    const levelRand = Math.random();
    let level: ContentLevel = "Iniciante";
    if (levelRand > 0.75) level = "Mestre";
    else if (levelRand > 0.5) level = "Avançado";
    else if (levelRand > 0.25) level = "Intermediário";

    const titlePrefix = titles[Math.floor(Math.random() * titles.length)];
    const title = `${titlePrefix} ${prefix} - V.${Math.floor(Math.random() * 5) + 1}.0`;
    const visual = getVisualData(type, level);
    
    return {
      id: `${type}-${level.toLowerCase()}-${i + 1}`,
      type,
      title: title,
      description: level === 'Mestre' 
        ? `Uma arquitetura rigorosa focada em maximizar o raciocínio do LLM via Chain-of-Thought, gerando estratégias de alto nível sem alucinações. Feito para escala.`
        : level === 'Avançado'
        ? `Prompt com restrições estritas de formatação e tom de voz, ideal para criar sequências persuasivas mantendo a personalidade da marca.`
        : level === 'Intermediário'
        ? `Estrutura focada em gerar múltiplas opções com regras claras, ótimo para acelerar o processo de curadoria de conteúdo.`
        : `O ponto de partida ideal. Direto ao ponto, fácil de preencher e gera resultados rápidos para o dia a dia.`,
      content: createMockContent(type, title, level),
      image,
      tags: [
        level,
        ['Marketing', 'Vendas', 'Copywriting', 'Estratégia', 'Gestão'][i % 5],
        ['Alta Conversão', 'Escala', 'Automação', 'Precisão'][i % 4]
      ],
      level,
      tools: [tools[i % tools.length]],
      isPremium: level === 'Mestre' || level === 'Avançado' && i % 3 === 0,
      isNew: i < 5,
      visualType: visual.type,
      visualData: visual.data,
    };
  });
};

const allPrompts = createMockItems(30, "master_prompt", thumbPrompts, "Prompting", ["Claude 3.5 Sonnet", "ChatGPT Plus"]);
const allFrameworks = createMockItems(30, "architecture", thumbFrameworks, "Arquiteturas", ["Agnóstico"]);
const allCopys = createMockItems(30, "conversion_system", thumbCopys, "Persuasão", ["ChatGPT Plus", "Claude 3.5 Sonnet"]);
const allScripts = createMockItems(30, "narrative_engine", thumbScripts, "Retenção", ["Claude 3.5 Sonnet", "Gemini Advanced"]);

export const allContent = [...allPrompts, ...allFrameworks, ...allCopys, ...allScripts];

export const getItemsByLevel = (level: ContentLevel) => {
  return allContent.filter(item => item.level === level);
};

export const getItemsByType = (type: ContentType) => {
  return allContent.filter(item => item.type === type);
};

export const homeCategories: Category[] = [
  {
    id: "level-mestre",
    title: "Classe Mestre (Apenas Elite)",
    items: getItemsByLevel("Mestre").slice(0, 10),
  },
  {
    id: "level-avancado",
    title: "Nível Avançado",
    items: getItemsByLevel("Avançado").slice(0, 10),
  },
  {
    id: "level-intermediario",
    title: "Nível Intermediário",
    items: getItemsByLevel("Intermediário").slice(0, 10),
  },
  {
    id: "level-iniciante",
    title: "Fundamentos (Comece Aqui)",
    items: getItemsByLevel("Iniciante").slice(0, 10),
  },
];

const heroVisual = getVisualData('architecture', 'Mestre');
export const heroContent: ContentItem = {
  id: "hero-featured",
  type: "architecture",
  title: "A Matriz de Criação Infinita V.2",
  description: "Uma arquitetura de engenharia de prompt de Nível Mestre que utiliza multi-agentes simulados e chain-of-thought para escalar produção mantendo 100% de coerência tonal. O segredo dos Top Players.",
  content: createMockContent('architecture', 'A Matriz de Criação Infinita V.2', 'Mestre'),
  image: heroBg,
  tags: ["Mestre", "Chain-of-Thought", "Multi-agentes"],
  level: "Mestre",
  tools: ["Claude 3.5 Sonnet", "ChatGPT Plus"],
  isPremium: true,
  isNew: true,
  visualType: heroVisual.type,
  visualData: heroVisual.data,
};