import React from 'react';
import { Link } from 'react-router-dom';

const PhotoCard = React.memo(({ photo }) => {
    if (!photo) return null;

    const thumbnailUrl = photo.download_url
        .replace(/\/id\/\d+\//, `/id/${photo.id}/`)
        .replace(/\/\d+\/\d+$/, '/300/200');
    
    return (
        <Link
            to={`${photo.id}`}
            className="group relative block overflow-hidden rounded-lg shadow-md bg-gray-800 hover:shadow-xl transition-shadow duration-300 aspect-[3/2]" // Use aspect ratio for consistent size
        >
            <img
                src={thumbnailUrl}
                alt={`Photo by ${photo.author}`}
                key={thumbnailUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width="300"
                height="200"
                onError={(e) => {
                    e.target.src='https://placehold.co/300x200/222/FFF?text=Error';
                    e.target.alt='Image not available';
                }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-sm text-white text-center truncate font-medium" title={photo.author}>
                    {photo.author}
                </p>
            </div>
       </Link>
    );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
