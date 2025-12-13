import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faGithub,
    faLinkedin,
    faDiscord,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export const About = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false
    });

    const socialLinks = [
        {
            name: "GitHub",
            icon: faGithub,
            url: "https://github.com/neiderp24",
            hoverColor: "#ffffff88",
            bgHover: "#333333cc"
        },
        {
            name: "LinkedIn",
            icon: faLinkedin,
            url: "https://www.linkedin.com/in/neider-parra",
            hoverColor: "#0A66C2aa",
            bgHover: "#0A66C220"
        },
        {
            name: "Correo",
            icon: faEnvelope,
            url: "https://mail.google.com/mail/?view=cm&to=neiderpb24@gmail.com&su=Hola%20Neider&body=Estoy%20interesado%20en%20tu%20trabajo%20y%20me%20gustaría%20saber%20más.",
            hoverColor: "#A78BFAaa",
            bgHover: "#A78BFA20"
        },
        {
            name: "Discord",
            icon: faDiscord,
            url: "https://discord.com/users/neiderparra",
            hoverColor: "#5865F2aa",
            bgHover: "#5865F220"
        },
        {
            name: "Instagram",
            icon: faInstagram,
            url: "https://instagram.com/neiderp24",
            hoverColor: "#C13584aa",
            bgHover: "#C1358420"
        }
    ];

    const laserAnimation = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: [0, 0.8, 0],
            transition: {
                delay: 0.5,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section
            id="about"
            ref={ref}
            className="relative py-32 px-6 md:px-20 z-10"
        >
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 relative pb-8"
                    >
                        <TypeAnimation
                            sequence={["Sobre Mí", 3000]}
                            wrapper="span"
                            speed={50}
                            cursor={false}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                        />
                        <motion.span
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={laserAnimation}
                            style={{
                                originX: 0.5,
                                boxShadow: "0 0 8px 2px rgba(139, 92, 246, 0.7)"
                            }}
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                        />
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-lg text-gray-300"
                    >
                        {[
                            "Desarrollador Full-Stack y de aplicaciones móviles, apasionado por crear soluciones que combinan elegancia, funcionalidad y una experiencia impecable.",
                            "Especializado en soluciones modernas con React, TypeScript y React Native, mi código prioriza rendimiento y experiencia de usuario.",
                            "Más allá del desarrollo, me enfoco en crear experiencias memorables que realmente aporten valor."
                        ].map((text, i) => (
                            <div key={i} className="mb-8">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
                                    className="text-lg text-gray-300"
                                >
                                    {text}
                                </motion.p>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={inView ? { scaleX: 1 } : {}}
                                    transition={{ delay: 0.5 + i * 0.3, duration: 1 }}
                                    className="mt-4 block w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                                    style={{ transformOrigin: "left" }}
                                />
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="p-8 bg-gray-800/50 border border-gray-700/30 rounded-xl w-full">
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-xl font-semibold text-white mb-6 text-center"
                            >
                                Redes Sociales
                            </motion.h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {socialLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            delay: 0.7 + i * 0.1,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            scale: 1.08,
                                            boxShadow: `0 0 12px ${link.hoverColor}`,
                                            backgroundColor: link.bgHover
                                        }}
                                        className={`group px-4 py-2 rounded-full border border-gray-700 flex items-center gap-2 text-white transition-all duration-300`}
                                        style={{
                                            backgroundColor: "rgba(31, 41, 55, 0.8)"
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={link.icon}
                                            className="text-lg group-hover:scale-125 transition-transform duration-300"
                                        />
                                        <span className="group-hover:text-white transition-colors duration-300">
                                            {link.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-8 text-center italic text-gray-400 max-w-xs relative pb-4"
                        >
                            "Conectemos y compartamos ideas"
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ delay: 1.7, duration: 1 }}
                                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                            />
                        </motion.div>
                    </motion.div>
                </div>
                <a
                    href="/cvNeiderParra.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 group relative inline-block px-6 py-3 rounded-full font-semibold text-white bg-black/20 border border-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.9)] transition-all duration-300 overflow-hidden min-w-[120px] text-center"
                >
                    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                        Ver CV
                    </span>

                    <span className="flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faUpRightFromSquare}
                            className="text-2xl text-purple-400 font-bold opacity-0 -translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out"
                        />
                    </span>

                    <span className="absolute inset-0 rounded-full bg-purple-500 opacity-10 z-[-1]" />
                </a>

            </div>
        </section>
    );
};

export default About;
