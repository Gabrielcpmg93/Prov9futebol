
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

const TweetCard: React.FC<{ post: SocialPost; onReplyClick: (post: SocialPost) => void }> = ({ post, onReplyClick }) => {
    const authorStyles = getAuthorStyles(post.authorType);

    return (
        <div className="p-4 border-b border-gray-200 flex space-x-3">
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
                <div className="flex justify-between items-center mt-3 text-gray-500 max-w-sm">
                    {post.isInteractive ? (
                        <button 
                            onClick={() => onReplyClick(post)}
                            className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span className="text-sm font-semibold">Responder</span>
                        </button>
                    ) : <div></div>}
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.865.8L6 10.333z" /></svg>
                        <span className="text-sm">{post.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetCard;
