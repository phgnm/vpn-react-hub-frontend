import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition transform hover:scale-110 z-50"
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
}

export default ScrollToTopButton;