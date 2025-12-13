
import type { SocialPost, FutGramPost, LastMatchContext } from '../types';

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

// --- Twitta Templates ---
const templates = {
    win: [
        { author: 'press', content: "Que atuação de gala do [TEAM]! Uma vitória convincente.", interactive: false },
        { author: 'fan', content: "É ISSO QUE EU QUERO VER! JOGARAM MUITO! ORGULHO! 🏆", interactive: false },
    ],
    loss: [
        { 
            author: 'press',
            content: "Derrota dura para o [TEAM]. A tática não funcionou. A pressão aumenta.",
            interactive: true,
            replyOptions: [
                { text: "Assumimos a responsabilidade.", tone: 'diplomatic', authorReply: "Esperamos ver essa mudança em campo, professor.", consequence: { type: 'fan_approval', change: 5, feedback: "A torcida apreciou a humildade." } },
                { text: "Critiquem a mim, não aos atletas.", tone: 'motivational', authorReply: "Nobre atitude, mas o resultado precisa vir.", consequence: { type: 'morale', change: 10, feedback: "O elenco se sentiu protegido." } },
                { text: "A culpa não foi da tática.", tone: 'aggressive', authorReply: "Transferir a culpa nunca é bem visto...", consequence: { type: 'morale', change: -10, feedback: "Elenco incomodado." } },
            ]
        },
        { 
            author: 'fan',
            content: "VERGONHA! Time sem alma! #ForaTreinador",
            interactive: true,
            replyOptions: [
                { text: "Acreditem no processo.", tone: 'diplomatic', authorReply: "A paciência tem limites! Queremos vitórias.", consequence: { type: 'fan_approval', change: 2, feedback: "Alguns se acalmaram." } },
                { text: "Não vou tolerar desrespeito.", tone: 'aggressive', authorReply: "O respeito se conquista ganhando jogos!", consequence: { type: 'fan_approval', change: -15, feedback: "Torcida revoltada." } },
            ]
        },
        { author: 'agent', content: "Meus jogadores merecem um time que vença...", interactive: false },
    ],
    draw: [
        { author: 'press', content: "Empate com sabor misto para o [TEAM]. Faltou poder de fogo.", interactive: false },
        { author: 'fan', content: "Dava pra ter ganhado. Pra cima deles no próximo jogo!", interactive: false },
    ],
    neutral: [
        { author: 'press', content: "Expectativa de casa cheia para o próximo duelo.", interactive: false },
        { author: 'agent', content: "De olho no mercado. O futebol não para!", interactive: false },
    ]
};

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomTimestamp = (): string => {
    const minutes = Math.floor(Math.random() * 59) + 1;
    const hours = Math.floor(Math.random() * 23);
    if (Math.random() > 0.5) return `${minutes}m`;
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
                authorType: template.author as any,
                content: template.content.replace(/\[TEAM\]/g, teamName),
                timestamp: getRandomTimestamp(),
                likes: Math.floor(Math.random() * 1000),
                isLiked: false,
                reposts: Math.floor(Math.random() * 200),
                isInteractive: template.interactive,
                replyOptions: (template as any).replyOptions || [],
            });
        }
    });
    return feed.sort(() => Math.random() - 0.5);
};


// --- FutGram Data ---
const futGramImages = [
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400&h=400', // Soccer field/training
    'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=400&h=400', // Boots/Ball
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=400&h=400', // Stadium
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=400&h=400', // Generic Athlete
];

const futGramCaptions = [
    "Foco total no próximo desafio! 💪⚽ #TrainingDay",
    "Recuperação pós-jogo. Banheira de gelo tá tendo 🧊🥶",
    "Nada como o apoio da nossa torcida. Vamos juntos! 🔥",
    "Estilo e ousadia. 📸",
];

const futGramAuthors = ["Gabigol_99", "Ney_Jr_Fake", "Pedro_Artilheiro", "Arrasca_Mago"];

export const generateFutGramFeed = (): FutGramPost[] => {
    const feed: FutGramPost[] = [];
    for(let i=0; i<4; i++) {
        feed.push({
            id: `gram-${Date.now()}-${i}`,
            authorName: getRandomItem(futGramAuthors),
            imageUrl: getRandomItem(futGramImages),
            caption: getRandomItem(futGramCaptions),
            likes: Math.floor(Math.random() * 5000) + 100,
            isLiked: false,
            commentsCount: Math.floor(Math.random() * 300),
        });
    }
    return feed;
}
