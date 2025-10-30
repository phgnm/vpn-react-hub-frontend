import React, { useEffect, useState, useCallback } from 'react';
import { fetchPhotos } from '../api/photosApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotoCard from '../components/PhotoCard';
import BackToHomeButton from '../../../components/BackToHomeButton';

function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPhotos = useCallback(async (pageNum) => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);
        if (pageNum === 1) setInitialLoading(true);

        try {
            const newPhotos = await fetchPhotos(pageNum, 30);

            if (!Array.isArray(newPhotos) || newPhotos.length === 0) {
                setHasMore(false);
                 setLoading(false);
                 if (pageNum === 1) setInitialLoading(false);
                return;
            }

            setPhotos(prev => {
                const existingIds = new Set(prev.map(p => p.id));
                const uniqueValidNewPhotos = newPhotos.filter(p => p && p.id && p.download_url && !existingIds.has(p.id));
                return [...prev, ...uniqueValidNewPhotos];
            });

            setPage(pageNum);
            setHasMore(newPhotos.length >= 30);


        } catch (error) {
            console.error("Error in loadPhotos:", error);
            setError(error.message || "Failed to load photos.");
            setHasMore(false);
        } finally {
             setLoading(false);
             if (pageNum === 1) setInitialLoading(false);
        }
    }, [loading, hasMore]);


    useEffect(() => {
        if (photos.length === 0 && !loading && page === 1 && initialLoading) {
             loadPhotos(1);
        }
    }, [photos.length, loading, page, initialLoading, loadPhotos]);


    const fetchMorePhotos = useCallback(() => {
        if (!loading && hasMore) {
            loadPhotos(page + 1);
        }
    }, [loading, hasMore, page, loadPhotos]);

     // --- Render logic remains the same until the map ---

    // Render initial loading state
    if (initialLoading && photos.length === 0 && !error) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-400">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading initial photos...
            </div>
        );
    }

    // Render error state after initial load attempt fails completely
    if (error && photos.length === 0) {
         return (
             <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
                 <p className="text-red-400 text-lg mb-4">Oops! {error}</p>
                 <button
                    onClick={() => {
                        setError(null); // Clear error on retry
                        setInitialLoading(true); // Reset initial loading state for retry
                        setHasMore(true); // Assume there might be more on retry
                        setPage(1); // Reset page for retry
                        loadPhotos(1);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow"
                 >
                    Try Again
                 </button>
            </div>
         );
    }


    return (
        <div className="relative min-h-screen bg-gray-900 text-white">
            <BackToHomeButton />
            
             <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
                📷 Photo Gallery
            </h1>

            {error && photos.length > 0 && (
                <div className="mb-6 p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                    Error loading more photos: {error}
                </div>
            )}


            <InfiniteScroll
                dataLength={photos.length}
                next={fetchMorePhotos}
                hasMore={hasMore && !error}
                loader={
                   <div className="flex justify-center items-center py-6 text-gray-400">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading more photos...
                    </div>
                }
                endMessage={
                    !error && !hasMore && photos.length > 0 && (
                        <div className="text-center py-8 text-gray-500 font-medium">
                           You've reached the end! 👋
                        </div>
                    )
                }
                className="overflow-hidden min-h-[50vh]"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-10">

                    {photos
                        .filter(photo => photo && photo.id && photo.download_url) // Only render photos with id and url
                        .map(photo => (
                            <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            </InfiniteScroll>

             {/* ... Empty state message ... */}
             {!initialLoading && photos.length === 0 && !error && (
                <div className="text-center py-10 text-gray-500 font-medium">
                    No photos found matching the criteria.
                </div>
            )}
        </div>
    );
}


export default PhotoList;