import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const experiences = [
    {
        role: "Desarrollador Frontend",
        company: "VetConnect",
        period: "2024"
    },
    {
        role: "Diseñador Web Freelance",
        company: "Proyectos personales",
        period: "2023 - Actualmente"
    },
    {
        role: "desarrollador Frontend",
        company: "NoCountry",
        period: "2023"
    }
];

export const Experience = () => {
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
            id="experience"
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
                            sequence={["Experiencia", 3000]}
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

                <div className="grid grid-cols-1 gap-y-12">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="relative text-white text-xl md:text-2xl font-medium pb-4"
                        >
                            <div>
                                <span className="text-purple-400">{exp.role}</span> ·{" "}
                                <span className="italic text-gray-400">{exp.company}</span>
                                <div className="text-sm text-gray-500 mt-1">{exp.period}</div>
                            </div>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                                style={{ transformOrigin: "left" }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
