import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import "../assets/styles/hero.css";
import photoBg from "../assets/photos/desktop-photo.png";
import mobilePhoto from "../assets/photos/mobile-photo.png";

const Hero = () => {
    const [key, setKey] = useState(0);
    const [animationFinished, setAnimationFinished] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5
    });

    useEffect(() => {
        if (inView) {
            setKey(prev => prev + 1);
            setAnimationFinished(false);
        }
    }, [inView]);

    return (
        <section
            id="hero"
            ref={ref}
            className="min-h-screen relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 text-center md:text-left"
        >
            <div className="relative z-20 text-white max-w-xl mt-[-140px] md:mt-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                        <TypeAnimation
                            key={key}
                            sequence={[
                                "Neider Parra", 1000,
                                "Desarrollador Web ", 1000,
                                "Obsesionado con los detalles visuales", 1000,
                                "Neider Parra", () => setAnimationFinished(true)
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={0}
                            cursor={false}
                            className="inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                        />
                        {!animationFinished && (
                            <motion.span
                                className="ml-1 align-baseline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                                style={{
                                    fontSize: 'inherit',
                                    lineHeight: 'inherit',
                                    display: 'inline-block',
                                    verticalAlign: 'top',
                                    height: '1em',
                                }}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut"
                                }}
                            >
                                |
                            </motion.span>
                        )}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <p className="text-lg md:text-2xl">
                        Desarrollador Full-Stack y de aplicaciones móviles.
                    </p>
                </motion.div>
            </div>

            {/* Imagen en desktop */}
            <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <div className="hidden md:block absolute top-16 right-0 z-10 group">

                    {/* BG */}
                    <div
                        className="absolute inset-0 bg-gray-800/50 border border-gray-700/30 rounded-xl hero-bg-container hero-bg-mask"
                    />

                    {/* Imagen + borde SVG */}
                    <div className="relative">
                        <img
                            src={photoBg}
                            alt=""
                            className="opacity-55 group-hover:opacity-90 transition-opacity duration-500 block hero-img rounded-xl"
                        />

                        {/* SVG del borde */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <rect
                                y="5.7"
                                width="99"
                                height="94.2"
                                rx="2.9 "
                                fill="none"
                                stroke="url(#heroGradient)"
                                strokeWidth="0.1"
                                pathLength="1"
                                className="hero-stroke"
                            />
                            <defs>
                                <linearGradient id="heroGradient" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </motion.div>
            <div
                className="
    absolute inset-0 top-10 md:hidden
    opacity-10
    bg-no-repeat
    bg-[length:150%]
    bg-[65%_center]
    pointer-events-none
    z-0
  "
                style={{ backgroundImage: `url(${mobilePhoto})` }}
            />

        </section>
    );
};

export default Hero;
