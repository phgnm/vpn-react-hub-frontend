import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhotoById } from "../api/photosApi";


function PhotoDetail() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPhoto = async () => {
            setLoading(true);
            setError(null);
            setPhoto(null);

            try {
                const photo = await fetchPhotoById(photoId);
                setPhoto(photo);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (photoId) {
            loadPhoto();
        } else {
            setError("No photo ID provided");
            setLoading(false);
        }
    }, [photoId]);

    if (loading) {
        return (
             <div className="min-h-screen flex justify-center items-center text-gray-400">
                 <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Loading photo details...
            </div>
        );
    }

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                 <p className="text-red-400 text-lg mb-4">Oops! {error}</p>
                 <Link to="/ex02" className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow text-white">
                      ← Back to Gallery
                 </Link>
            </div>
        );

    if (!photo) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                 <p className="text-gray-400 text-lg mb-4">Photo not found.</p>
                  <Link to="/ex02" className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow text-white">
                      ← Back to Gallery
                 </Link>
             </div>
        )
    }

    const detailImageUrl = photo.download_url
        .replace(/\/id\/\d+\//, `/id/${photo.id}/`)
        .replace(/\/\d+\/\d+$/, '/1200/800');

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            {/* Blurry background */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 blur-xl scale-110"
                style={{ backgroundImage: `url(${detailImageUrl})` }}
                aria-hidden="true"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                <Link
                    to="/ex02"
                    className="absolute top-4 left-4 md:left-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition px-4 py-2 rounded-lg text-sm text-gray-200"
                 >
                    ← Back
                 </Link>

                 {/* Image container */}
                <div className="w-full max-w-4xl bg-black/30 rounded-xl shadow-2xl overflow-hidden mb-8 aspect-video">
                     <img
                        src={detailImageUrl} // Use optimized detail URL
                        alt={`Photo by ${photo.author}`}
                        className="w-full h-full object-contain" // Use contain to show whole image
                     />
                 </div>

                 {/* Detail Section */}
                 <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">{photo.author}</h1>
                    <p className="text-gray-400 text-sm mb-4">Photo ID: {photo.id} | Dimensions: {photo.width}x{photo.height}</p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <a
                            href={photo.download_url} // Link to original size for download
                            target="_blank"
                            rel="noopener noreferrer"
                            download // Suggest downloading
                            className="bg-indigo-800 hover:bg-indigo-700 transition-colors px-5 py-2.5 rounded-lg text-sm font-semibold shadow"
                        >
                            Download Original
                        </a>
                         <a
                            href={photo.url} // Link to the picsum page for the photo
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/40 hover:border-white hover:bg-white/10 transition px-5 py-2.5 rounded-lg text-sm"
                        >
                            View on Picsum
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhotoDetail;
