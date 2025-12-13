
import React, { useState } from 'react';
import type { FutGramPost } from '../../types';

interface FutGramCardProps {
    post: FutGramPost;
    onLike: () => void;
    onComment: (comment: string) => void;
}

const FutGramCard: React.FC<FutGramCardProps> = ({ post, onLike, onComment }) => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const predefinedComments = [
        "Joga muito! 🔥",
        "Esse é craque! ⚽",
        "Foco total! 💪",
        "Brabo demais.",
    ];

    return (
        <div className="bg-white border-y border-gray-200 shadow-sm md:rounded-lg md:border-x md:mx-auto md:max-w-md">
            {/* Header */}
            <div className="flex items-center p-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                         <div className="w-full h-full bg-gray-300 rounded-full overflow-hidden">
                            {/* Generic avatar */}
                            <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                         </div>
                    </div>
                </div>
                <span className="font-semibold text-sm ml-3 text-gray-900">{post.authorName}</span>
            </div>

            {/* Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden relative">
                 <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex space-x-4 mb-2">
                    <button onClick={onLike} className="focus:outline-none transition-transform active:scale-90">
                        {post.isLiked ? (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        )}
                    </button>
                    <button onClick={() => setIsCommentOpen(!isCommentOpen)} className="focus:outline-none">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </button>
                </div>

                <p className="font-semibold text-sm text-gray-900 mb-1">{post.likes.toLocaleString()} curtidas</p>
                
                <div>
                    <span className="font-semibold text-sm mr-2">{post.authorName}</span>
                    <span className="text-sm text-gray-800">{post.caption}</span>
                </div>

                {post.userComment && (
                    <div className="mt-2 text-sm">
                        <span className="font-semibold text-gray-900 mr-2">Você</span>
                        <span className="text-gray-800">{post.userComment}</span>
                    </div>
                )}

                {/* Comment Input (Simplified as choice chips) */}
                {isCommentOpen && !post.userComment && (
                    <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                        <p className="text-xs text-gray-500 mb-2">Comentar como Treinador:</p>
                        <div className="flex flex-wrap gap-2">
                            {predefinedComments.map((comment, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onComment(comment);
                                        setIsCommentOpen(false);
                                    }}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                >
                                    {comment}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FutGramCard;
