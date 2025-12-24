import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const certifications = [
    {
        title: "React",
        institution: "Academlo",
        date: "2022",
        image: "React.svg",
        pdf: "/certificates/react-certificate.pdf"
    },
    {
        title: "React Native Expo",
        institution: "DevTalles",
        date: "2025",
        image: "react-native-expo.svg",
        pdf: "/certificates/react-native-expo.pdf"
    },
    {
        title: "HTML, CSS, JavaScript",
        institution: "Academlo",
        date: "2022",
        image: "HTML, CSS, JavaScript.svg",
        pdf: "/certificates/html-css-js-certificate.pdf"
    },
    {
        title: "Node.js",
        institution: "Academlo",
        date: "2022",
        image: "Node.svg",
        pdf: "/certificates/node-certificate.pdf"
    },
];

export const Certifications = () => {
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

    const handleCertificateClick = (pdfPath, e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(pdfPath, '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            id="certifications"
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
                            sequence={["Certificaciones", 3000]}
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
                <div className="grid grid-cols-1 gap-y-12 text-xl">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="relative group"
                        >
                            <a
                                href={cert.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleCertificateClick(cert.pdf, e)}
                                className="block"
                            >
                                <div className="text-xl flex flex-col md:flex-row gap-6 items-start transition-all hover:bg-gray-800/30 rounded-lg p-4">
                                    {/* Miniatura del certificado - ajustada para móvil */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full md:w-48 h-auto md:h-32 flex-shrink-0 overflow-hidden rounded-lg border border-purple-500/30"
                                    >
                                        <img
                                            src={`/images/${cert.image}`}
                                            alt={`Certificado ${cert.title}`}
                                            className="w-full h-full object-contain md:object-cover"
                                        />
                                    </motion.div>

                                    {/* Detalles del certificado */}
                                    <div className="flex-1 text-white">
                                        <h3 className="text-xl md:text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="italic text-gray-400 mt-1">
                                            {cert.institution}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            {cert.date}
                                        </p>
                                        {/* Texto "Ver certificado" con efecto hover */}
                                        <motion.p
                                            whileHover={{ scale: 1.05 }}
                                            className="mt-3  text-white text-xl no-underline inline-block"
                                        >
                                            Ver certificado
                                        </motion.p>
                                    </div>
                                </div>
                            </a>
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

export default Certifications;