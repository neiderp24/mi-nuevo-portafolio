import "../assets/styles/scrollToTop.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (!isLaunching) {
                setVisible(window.scrollY > 300);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [isLaunching]);

    const scrollToTop = () => {
        setIsLaunching(true);

        const startScroll = window.scrollY;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const translateY = progress * (window.innerHeight + 100); // Despega más alto

            setOffsetY(translateY);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsLaunching(false);
                setVisible(false);
                setOffsetY(0);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        requestAnimationFrame(animate);
    };

    if (!visible && !isLaunching) return null;

    return (
        <button
            onClick={scrollToTop}
            className="scroll-to-top-btn"
            aria-label="Volver arriba"
        >
            <span
                className="rocket-with-flame"
                style={{
                    transform: `translateY(-${offsetY}px)`,
                    transition: "transform 0.1s linear",
                    opacity: offsetY > window.innerHeight ? 0 : 1,
                }}
            >
                <FontAwesomeIcon
                    icon={faRocket}
                    className="text-xl rocket-icon"
                    style={{
                        transform: "rotate(-45deg) scale(1.1)",
                    }}
                />
            </span>
        </button>
    );
};

export default ScrollToTopButton;
