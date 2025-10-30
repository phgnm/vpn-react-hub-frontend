function SkeletonCard() {
    return (
        <div className="animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>  
    );
}

export default SkeletonCard;