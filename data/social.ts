
import type { SocialPost, LastMatchContext, ReplyOption } from '../types';

const authors = {
    press: [
        { name: 'Fred Esportes', handle: '@FredEsportes' },
        { name: 'InfoFutebol BR', handle: '@InfoFutebolBR' },
    ],
    fan: [
        { name: 'Torcedor Revoltado', handle: '@TorcedorRevoltado' },
        { name: 'Apoiador Fiel', handle: '@ApoiadorFiel' },
    ],
    agent: [
        { name: 'Fábio Agent', handle: '@FabioAgente' },
    ]
};

const templates = {
    win: [
        { author: 'press', content: "Que atuação de gala do [TEAM]! Uma vitória convincente que mostra a força do elenco e da tática do treinador.", interactive: false },
        { author: 'fan', content: "É ISSO QUE EU QUERO VER! JOGARAM MUITO! ORGULHO DE SER [TEAM]! 🏆", interactive: false },
    ],
    loss: [
        { 
            author: 'press',
            content: "Derrota dura para o [TEAM]. A tática do treinador parece não ter funcionado e algumas substituições foram questionáveis. A pressão aumenta.",
            interactive: true,
            replyOptions: [
                { text: "Assumimos a responsabilidade, vamos trabalhar.", tone: 'diplomatic', consequence: { type: 'fan_approval', change: 5, feedback: "A torcida apreciou a humildade." } },
                { text: "Critiquem a mim, não aos jogadores.", tone: 'motivational', consequence: { type: 'morale', change: 10, feedback: "O elenco se sentiu protegido e respeitado." } },
                { text: "A culpa não foi da tática, faltou atitude.", tone: 'aggressive', consequence: { type: 'morale', change: -10, feedback: "Os jogadores se sentiram expostos pela sua declaração." } },
            ]
        },
        { 
            author: 'fan',
            content: "VERGONHA! Time sem alma, sem vontade! O que esse treinador está fazendo? #ForaTreinador",
            interactive: true,
            replyOptions: [
                { text: "Entendemos a frustração. Acreditem no processo.", tone: 'diplomatic', consequence: { type: 'fan_approval', change: 2, feedback: "Alguns torcedores se acalmaram." } },
                { text: "Não vou tolerar esse tipo de comentário.", tone: 'aggressive', consequence: { type: 'fan_approval', change: -15, feedback: "A torcida se sentiu atacada pela sua arrogância." } },
            ]
        },
        { author: 'agent', content: "Em momentos difíceis, grandes jogadores precisam de grandes projetos para se manterem motivados...", interactive: false },
    ],
    draw: [
        { author: 'press', content: "Um empate com sabor misto para o [TEAM]. O time mostrou organização mas faltou poder de fogo para garantir a vitória.", interactive: false },
        { author: 'fan', content: "Faltou pouco! Dava pra ter ganhado, mas um ponto é melhor que nada. Pra cima deles no próximo jogo!", interactive: false },
    ],
    neutral: [
        { author: 'press', content: "Próximo jogo do [TEAM] é crucial para as ambições do clube na temporada. A expectativa é de casa cheia.", interactive: false },
        { author: 'agent', content: "Analisando o mercado em busca de novas oportunidades para meus atletas. O futebol não para!", interactive: false },
    ]
};

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomTimestamp = (): string => {
    const minutes = Math.floor(Math.random() * 59) + 1;
    const hours = Math.floor(Math.random() * 23);
    if (Math.random() > 0.5) {
        return `${minutes}m`;
    }
    return `${hours}h`;
}


export const generateSocialFeed = (lastMatch: LastMatchContext | null, teamName: string): SocialPost[] => {
    const feed: SocialPost[] = [];
    const resultKey = lastMatch?.result || 'neutral';

    const postTemplates = templates[resultKey];

    postTemplates.forEach((template, index) => {
        let author;
        switch(template.author) {
            case 'press': author = getRandomItem(authors.press); break;
            case 'fan': author = getRandomItem(authors.fan); break;
            case 'agent': author = getRandomItem(authors.agent); break;
        }

        if(author) {
             feed.push({
                id: `post-${Date.now()}-${index}`,
                authorName: author.name,
                authorHandle: author.handle,
                authorType: template.author as SocialPost['authorType'],
                content: template.content.replace(/\[TEAM\]/g, teamName),
                timestamp: getRandomTimestamp(),
                likes: Math.floor(Math.random() * 1000),
                reposts: Math.floor(Math.random() * 200),
                isInteractive: template.interactive,
                replyOptions: (template as any).replyOptions || [],
            });
        }
    });

    return feed.sort(() => Math.random() - 0.5); // Shuffle the feed
};
