
import React, { useState } from 'react';
import type { FutGramPost } from '../../types';

interface FutGramCardProps {
    post: FutGramPost;
    onLike: () => void;
    onComment: (comment: string) => void;
}

const FutGramCard: React.FC<FutGramCardProps> = ({ post, onLike, onComment }) => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim() && !isSubmitting) {
            setIsSubmitting(true);
            await onComment(commentText);
            setIsCommentOpen(false);
            setCommentText('');
            setIsSubmitting(false);
        }
    }

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
                
                {/* Conversation Thread */}
                {post.userComment && (
                    <div className="mt-2 text-sm space-y-1">
                        <div>
                            <span className="font-semibold text-gray-900 mr-2">Você</span>
                            <span className="text-gray-800">{post.userComment}</span>
                        </div>
                        {post.authorResponse && (
                             <div className="pl-4">
                                <span className="font-semibold text-blue-600 mr-2">{post.authorName}</span>
                                <span className="text-gray-800">{post.authorResponse}</span>
                            </div>
                        )}
                    </div>
                )}


                {/* Comment Input */}
                {isCommentOpen && !post.userComment && (
                    <form onSubmit={handleCommentSubmit} className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Adicione um comentário..."
                            className="w-full bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                        />
                        <button type="submit" disabled={!commentText.trim() || isSubmitting} className="font-bold text-sm text-blue-500 disabled:text-gray-400">
                            {isSubmitting ? '...' : 'Enviar'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FutGramCard;
