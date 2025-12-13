import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import { Link } from 'react-router-dom';

const projects = [
    {
        title: "VetConnect",
        slug: "vetconnect",
        description: "Software de gestión veterinaria con historias clínicas y módulo administrativo.",
        tech: ["Angular", "TypeScript", "NgRx", "API REST"],
        image: "/images/projects-img/vetconnect/img-1.png",
        link: "#"
    },
    {
        title: "Web de DJ",
        slug: "web-dj", // Slug único
        description: "Sitio web para DJ con secciones de música, eventos y animaciones personalizadas.",
        tech: ["React", "Bootstrap", "Vite"],
        image: "/images/projects-img/web-dj/img1.png",       
        link: "#"
    },
    {
        title: "App de Países",
        slug: "app-paises", // Slug único
        description: "Aplicación que muestra información de países con filtros y búsquedas.",
        tech: ["JavaScript", "Bootstrap", "API REST"],
        image: "/images/projects-img/exploraMundi/portada.png",
        link: "#"
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

export const Projects = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

    return (
        <section id="projects" ref={ref} className="py-32 px-6 md:px-20 z-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 relative pb-8"
                    >
                        <TypeAnimation
                            sequence={["Proyectos", 3000]}
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

                <div className="space-y-24">
                    {projects.map((project, i) => (
                        <div key={project.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="flex flex-col md:flex-row items-center gap-10"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
                                />

                                <div className="text-white md:w-2/3">
                                    <h3 className="text-3xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-purple-400 mb-4">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-white bg-opacity-5 px-2 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="group relative inline-block px-6 py-2 rounded-full font-semibold text-white bg-black/20 border border-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.9)] transition-all duration-300 overflow-hidden min-w-[90px] text-center"
                                    >
                                        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                                            Ver más
                                        </span>
                                        <span className="opacity-0 transform translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out">
                                            +
                                        </span>
                                        <span className="absolute inset-0 rounded-full bg-purple-500 opacity-10 z-[-1]" />
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                                className="mt-4 block w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                                style={{ transformOrigin: "left" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;