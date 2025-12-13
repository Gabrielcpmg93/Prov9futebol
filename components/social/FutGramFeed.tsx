
import React from 'react';
import type { FutGramPost } from '../../types';
import FutGramCard from './FutGramCard';

interface FutGramFeedProps {
    feed: FutGramPost[];
    onLike: (app: 'FutGram', postId: string) => void;
    onComment: (postId: string, comment: string) => void;
}

const FutGramFeed: React.FC<FutGramFeedProps> = ({ feed, onLike, onComment }) => {
    
    if (feed.length === 0) {
         return (
            <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-8">
                <h2 className="text-xl font-semibold text-gray-700">Feed Vazio</h2>
                <p className="mt-2">O FutGram está carregando as melhores fotos...</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-full pb-4 space-y-4">
            {feed.map(post => (
                <FutGramCard 
                    key={post.id} 
                    post={post} 
                    onLike={() => onLike('FutGram', post.id)}
                    onComment={(text) => onComment(post.id, text)}
                />
            ))}
        </div>
    );
};

export default FutGramFeed;
