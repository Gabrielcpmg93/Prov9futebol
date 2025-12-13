
import React from 'react';
import type { SocialPost, ReplyOption } from '../../types';

interface ReplyModalProps {
    post: SocialPost;
    onClose: () => void;
    onConfirmReply: (option: ReplyOption) => void;
}

const toneStyles = {
    aggressive: 'border-red-500 hover:bg-red-50 text-red-700',
    diplomatic: 'border-blue-500 hover:bg-blue-50 text-blue-700',
    motivational: 'border-green-500 hover:bg-green-50 text-green-700',
    evasive: 'border-gray-500 hover:bg-gray-50 text-gray-700'
}

const ReplyModal: React.FC<ReplyModalProps> = ({ post, onClose, onConfirmReply }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Sua Resposta</h2>
                
                {/* Original Post Context */}
                <div className="bg-gray-100 p-3 rounded-xl mb-6 border border-gray-200">
                    <div className="flex items-baseline space-x-1">
                        <span className="font-bold text-gray-700 text-sm">{post.authorName}</span>
                        <span className="text-xs text-gray-500">{post.authorHandle}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">"{post.content}"</p>
                </div>

                {/* Reply Options */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600 text-center">Como você responde?</p>
                    {post.replyOptions?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onConfirmReply(option)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 active:scale-95 group ${toneStyles[option.tone]}`}
                        >
                            <span className="font-medium">{option.text}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 text-center text-gray-500 hover:text-gray-800 text-sm"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ReplyModal;
