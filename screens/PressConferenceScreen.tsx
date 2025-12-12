
import React, { useState, useEffect } from 'react';
import type { PressConferenceScreenProps } from '../types';

const PressConferenceScreen: React.FC<PressConferenceScreenProps> = ({ onBack, lastMatch }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Background logos pattern simulation
  const logos = Array(40).fill('PATROCINADOR');

  const getQuestions = () => {
    if (!lastMatch) {
      // Generic press conference (accessed via home menu)
      return [
        {
          question: "Professor, como você avalia a preparação do elenco para a sequência da temporada?",
          answers: [
            { text: "Estamos evoluindo a cada dia.", feedback: "A torcida gostou da confiança." },
            { text: "Ainda precisamos de reforços.", feedback: "A diretoria não gostou do comentário." },
            { text: "O foco é total no próximo jogo.", feedback: "Resposta padrão, sem impacto." }
          ]
        },
        {
          question: "Existem rumores sobre novas contratações. O que pode nos dizer?",
          answers: [
            { text: "Estamos sempre atentos ao mercado.", feedback: "A imprensa especula novos nomes." },
            { text: "Estou satisfeito com o que tenho.", feedback: "Alguns torcedores criticaram nas redes." },
            { text: "Não falo sobre especulações.", feedback: "Os repórteres ficaram sem resposta." }
          ]
        }
      ];
    }

    const { userScore, opponentScore, opponentName } = lastMatch;
    
    if (userScore > opponentScore) {
      // Victory
      return [
        {
          question: `Uma grande vitória contra o ${opponentName}. O que foi decisivo hoje?`,
          answers: [
            { text: "A garra dos jogadores foi fundamental.", feedback: "O elenco se sentiu valorizado." },
            { text: "Minha tática funcionou perfeitamente.", feedback: "A imprensa elogiou sua estratégia." },
            { text: "Foi um jogo difícil, mas merecemos.", feedback: "Resposta sensata." }
          ]
        },
        {
          question: "O time pode sonhar com o título após essa atuação?",
          answers: [
            { text: "Pés no chão, jogo a jogo.", feedback: "A torcida aprova a cautela." },
            { text: "Com certeza, vamos brigar lá em cima!", feedback: "A torcida está eufórica!" },
            { text: "Ainda é cedo para dizer.", feedback: "Neutro." }
          ]
        }
      ];
    } else if (userScore < opponentScore) {
      // Defeat
      return [
        {
          question: `Resultado difícil contra o ${opponentName}. O que faltou hoje?`,
          answers: [
            { text: "Faltou atenção nos detalhes.", feedback: "Os jogadores concordam." },
            { text: "A arbitragem nos prejudicou.", feedback: "A Federação pode te multar." },
            { text: "O adversário foi superior.", feedback: "Sinceridade apreciada por alguns." }
          ]
        },
        {
          question: "A torcida protestou no final. O que você tem a dizer a eles?",
          answers: [
            { text: "Peço paciência, vamos melhorar.", feedback: "A torcida continua desconfiada." },
            { text: "Vamos trabalhar dobrado.", feedback: "Clichê, mas necessário." },
            { text: "Eles têm razão de estar chateados.", feedback: "Demonstrou empatia." }
          ]
        }
      ];
    } else {
      // Draw
      return [
        {
          question: `Empate amargo ou ponto ganho contra o ${opponentName}?`,
          answers: [
            { text: "Pelas circunstâncias, foi bom.", feedback: "Analistas concordam." },
            { text: "Perdemos dois pontos hoje.", feedback: "Demonstrou ambição." },
            { text: "O jogo foi muito equilibrado.", feedback: "Leitura correta do jogo." }
          ]
        }
      ];
    }
  };

  const [questions] = useState(getQuestions());

  useEffect(() => {
    // Entrance animation
    setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);
  }, [currentQuestionIndex]);

  const handleAnswer = (feedbackText: string) => {
    setFeedback(feedbackText);
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setAnimationClass('opacity-0 translate-y-4'); // Reset anim
        setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
        }, 300);
      } else {
        onBack();
      }
    }, 2000);
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden relative">
      {/* --- Visual Scene: Press Room --- */}
      <div className="flex-grow relative flex flex-col items-center">
        
        {/* Backdrop Wall */}
        <div className="absolute inset-0 bg-blue-700 overflow-hidden flex flex-wrap content-start opacity-90">
            {/* Gradient Overlay for realism */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10 pointer-events-none"></div>
            
            {/* Sponsor Logos Grid */}
            <div className="w-full h-full grid grid-cols-4 gap-2 p-2 opacity-40 rotate-0">
                 {logos.map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        <div className="bg-white/80 px-2 py-1 rounded-sm text-[8px] font-bold text-blue-900 uppercase tracking-wider w-full text-center">
                            {['BET', 'CIMED', 'ADIDAS', 'SUPER', 'BH'][i % 5]}
                        </div>
                    </div>
                 ))}
            </div>
        </div>

        {/* The Desk */}
        <div className="absolute bottom-0 w-full h-32 bg-amber-800 border-t-4 border-amber-900 shadow-2xl z-20 flex justify-center items-end pb-8">
             {/* Wood texture lines */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
             
             {/* Microphones */}
             <div className="flex space-x-8 mb-4 transform translate-y-2">
                <div className="flex flex-col items-center">
                    <div className="w-6 h-8 bg-gray-800 rounded-t-lg border-2 border-gray-600 relative z-30">
                         <div className="absolute inset-x-0 top-2 h-1 bg-orange-500"></div>
                    </div>
                    <div className="w-1 h-12 bg-gray-900 -mt-1"></div>
                    <div className="w-8 h-2 bg-gray-800 rounded-full -mt-1"></div>
                </div>
                <div className="flex flex-col items-center transform -translate-y-2">
                    <div className="w-7 h-9 bg-gray-800 rounded-t-lg border-2 border-gray-600 relative z-30">
                        <div className="absolute inset-x-0 top-3 h-4 bg-blue-500 flex items-center justify-center">
                            <span className="text-[6px] text-white">TV</span>
                        </div>
                    </div>
                    <div className="w-1 h-12 bg-gray-900 -mt-1"></div>
                    <div className="w-8 h-2 bg-gray-800 rounded-full -mt-1"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-6 h-8 bg-gray-800 rounded-t-lg border-2 border-gray-600 relative z-30">
                        <div className="absolute inset-x-0 top-2 h-1 bg-red-600"></div>
                    </div>
                    <div className="w-1 h-12 bg-gray-900 -mt-1"></div>
                    <div className="w-8 h-2 bg-gray-800 rounded-full -mt-1"></div>
                </div>
             </div>

             {/* Water bottles */}
             <div className="absolute right-10 bottom-10 w-4 h-10 bg-blue-200/50 rounded-t-md border border-white/30 transform rotate-3"></div>
             <div className="absolute left-10 bottom-10 w-4 h-10 bg-blue-200/50 rounded-t-md border border-white/30 transform -rotate-6"></div>
        </div>

        {/* Character Silhouette (Simple Head/Shoulders) - Optional implies user is there, or camera POV */}
      </div>

      {/* --- UI Interface --- */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 min-h-[45%] flex flex-col p-6 transition-transform duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Ao Vivo</span>
            </div>
            <h2 className="text-sm font-bold text-gray-400 uppercase">Coletiva de Imprensa</h2>
        </div>

        {/* Content Area */}
        <div className={`flex-grow flex flex-col justify-between transition-all duration-500 ${animationClass}`}>
            
            {/* Question Bubble */}
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm mb-6">
                <p className="text-xs font-bold text-gray-500 mb-1">Repórter</p>
                <p className="text-gray-800 font-medium text-lg leading-snug">"{currentQ.question}"</p>
            </div>

            {/* Answers / Feedback */}
            {feedback ? (
                <div className="flex-grow flex items-center justify-center animate-pulse">
                     <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 text-green-700 font-bold">
                        {feedback}
                     </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {currentQ.answers.map((ans, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(ans.feedback)}
                            className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 active:scale-95 group"
                        >
                            <span className="text-gray-700 group-hover:text-blue-700 font-medium">{ans.text}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PressConferenceScreen;
