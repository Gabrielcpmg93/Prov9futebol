
import React from 'react';
import type { SocialPost } from '../../types';

const getAuthorStyles = (type: SocialPost['authorType']) => {
    switch (type) {
        case 'press': return { color: 'bg-blue-500', icon: '📰' };
        case 'fan': return { color: 'bg-red-500', icon: '🗣️' };
        case 'agent': return { color: 'bg-green-500', icon: '💼' };
        default: return { color: 'bg-gray-500', icon: '👤' };
    }
}

interface TweetCardProps {
    post: SocialPost;
    onReplyClick: (post: SocialPost) => void;
    onLikeClick: () => void;
}

const TweetCard: React.FC<TweetCardProps> = ({ post, onReplyClick, onLikeClick }) => {
    const authorStyles = getAuthorStyles(post.authorType);

    return (
        <div className="p-4 border-b border-gray-200 flex flex-col space-y-3">
            <div className="flex space-x-3">
                <div className={`flex-shrink-0 w-12 h-12 ${authorStyles.color} rounded-full flex items-center justify-center text-2xl`}>
                    {authorStyles.icon}
                </div>
                <div className="flex-grow">
                    <div className="flex items-baseline space-x-1">
                        <span className="font-bold text-gray-900">{post.authorName}</span>
                        <span className="text-sm text-gray-500">{post.authorHandle}</span>
                        <span className="text-sm text-gray-500">·</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-800 my-1">{post.content}</p>
                    
                    {/* Actions Bar */}
                    <div className="flex justify-between items-center mt-3 text-gray-500 max-w-sm">
                        {/* Reply Button */}
                        {post.isInteractive && !post.userComment ? (
                            <button 
                                onClick={() => onReplyClick(post)}
                                className="flex items-center space-x-2 hover:text-blue-500 transition-colors group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:bg-blue-50 rounded-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                <span className="text-sm">Comentar</span>
                            </button>
                        ) : (
                            <div className="flex items-center space-x-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                        )}

                        {/* Like Button */}
                        <button 
                            onClick={onLikeClick}
                            className={`flex items-center space-x-2 transition-colors group ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{post.likes}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Conversation Thread */}
            {post.userComment && (
                <div className="pl-14 space-y-3">
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">VC</div>
                        <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none">
                            <p className="text-sm text-gray-800">{post.userComment}</p>
                        </div>
                    </div>
                    {post.authorResponse && (
                        <div className="flex space-x-2">
                            <div className={`w-8 h-8 ${authorStyles.color} rounded-full flex items-center justify-center text-white text-xs`}>{authorStyles.icon}</div>
                            <div className="bg-blue-50 p-2 rounded-lg rounded-tl-none">
                                <p className="text-sm text-gray-800 font-medium">{post.authorResponse}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TweetCard;
