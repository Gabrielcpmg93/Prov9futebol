
import React, { useState } from 'react';
import type { SocialScreenProps, SocialPost, ReplyOption, Consequence } from '../../types';
import TweetCard from './TweetCard';
import ReplyModal from './ReplyModal';

const TwittaFeed: React.FC<SocialScreenProps> = ({ feed, onReply }) => {
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

    const handleConfirmReply = (consequence: Consequence) => {
        onReply(consequence);
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
            <div className="bg-white">
                {feed.map(post => (
                    <TweetCard key={post.id} post={post} onReplyClick={handleReplyClick} />
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
