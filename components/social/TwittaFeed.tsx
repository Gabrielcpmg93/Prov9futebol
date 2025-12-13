
import React, { useState } from 'react';
import type { SocialPost, ReplyOption } from '../../types';
import TweetCard from './TweetCard';
import ReplyModal from './ReplyModal';

interface TwittaFeedProps {
    feed: SocialPost[];
    onReply: (postId: string, option: ReplyOption) => void;
    onLike: (app: 'Twitta', postId: string) => void;
}

const TwittaFeed: React.FC<TwittaFeedProps> = ({ feed, onReply, onLike }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

    const handleReplyClick = (post: SocialPost) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    const handleConfirmReply = (option: ReplyOption) => {
        if (selectedPost) {
            onReply(selectedPost.id, option);
        }
        handleCloseModal();
    };

    if (feed.length === 0) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-8">
                <h2 className="text-xl font-semibold text-gray-700">Tudo quieto por aqui...</h2>
                <p className="mt-2">Jogue uma partida para ver as reações da mídia e dos torcedores.</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-white min-h-full pb-4">
                {feed.map(post => (
                    <TweetCard 
                        key={post.id} 
                        post={post} 
                        onReplyClick={handleReplyClick} 
                        onLikeClick={() => onLike('Twitta', post.id)}
                    />
                ))}
            </div>
            {isModalOpen && selectedPost && (
                <ReplyModal 
                    post={selectedPost}
                    onClose={handleCloseModal}
                    onConfirmReply={handleConfirmReply}
                />
            )}
        </>
    );
};

export default TwittaFeed;
