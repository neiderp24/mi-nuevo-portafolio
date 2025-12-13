import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHtml5,
    faCss3Alt,
    faJs,
    faReact,
    faNodeJs,
    faGitAlt,
    faGithub,
    faBootstrap,
    faFigma,
    faAngular
} from "@fortawesome/free-brands-svg-icons";

import { faCode, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const skills = [
    { name: "React", icon: faReact },
    { name: "React Native", icon: faReact },
    { name: "Angular", icon: faAngular },
    { name: "JavaScript", icon: faJs },
    { name: "TypeScript", icon: faCode },
    { name: "Next.js", icon: faCode },
    { name: "Node.js", icon: faNodeJs },
    { name: "API REST", icon: faCode },
    { name: "HTML", icon: faHtml5 },
    { name: "CSS", icon: faCss3Alt },
    { name: "Tailwind CSS", icon: faWandMagicSparkles },
    { name: "Vite", icon: faCode },
    { name: "Git & GitHub", icon: faGitAlt },
    { name: "Figma", icon: faFigma },
    { name: "Bootstrap", icon: faBootstrap },
];

export const Skills = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

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
            id="skills"
            ref={ref}
            className="relative py-32 px-6 md:px-20 z-10"
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 relative pb-8"
                    >
                        <TypeAnimation
                            sequence={["Habilidades", 3000]}
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12 justify-items-center">
                    {skills.map((skill, i) => {
                        const isFigma = skill.name === "Figma";
                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`relative text-white text-xl font-medium pb-4 text-center
                                    sm:text-left w-full sm:w-auto flex items-center gap-2 justify-center
                                    sm:justify-start
                                    ${isFigma ? "hidden md:flex" : ""}`}
                            >
                                <FontAwesomeIcon icon={skill.icon} className="text-purple-500 text-lg" />
                                {skill.name}
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={inView ? { scaleX: 1 } : {}}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                                    style={{ transformOrigin: "left" }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
