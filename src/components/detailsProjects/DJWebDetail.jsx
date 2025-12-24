import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

export default function DJWebDetail() {
    const navigate = useNavigate();
    const [expandedImg, setExpandedImg] = useState(null); // Imagen activa

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

    const handleImageClick = (src) => setExpandedImg(src);
    const handleOverlayClick = () => setExpandedImg(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen from-gray-900 to-gray-800 text-white pt-24 px-6 md:px-20 pb-20"
        >
            <div className="max-w-6xl mx-auto">

                {/* Imagen expandida */}
                {expandedImg && (
                    <div
                        onClick={handleOverlayClick}
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                    >
                        <img
                            src={expandedImg}
                            alt="Imagen expandida"
                            className="max-w-5xl max-h-[90vh] rounded-xl shadow-2xl border border-purple-500/30"
                            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
                        />
                    </div>
                )}

                {/* Encabezado */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">Web DJ</h1>
                    <p className="text-xl text-gray-300 max-w-3xl">
                        pagina web para DJ con secciones de música, eventos y contacto.
                    </p>
                </div>

                {/* Contenido principal */}
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Galería de imágenes */}
                    <div className="space-y-6">
                        {/* Imagen principal */}
                        <img
                            src="/images/projects-img/web-dj/img2.png"
                            alt="Dashboard VetConnect"
                            className="w-full rounded-xl shadow-2xl border border-purple-500/20 cursor-pointer"
                            onClick={() => handleImageClick("/images/projects-img/web-dj/img2.png")}
                        />

                        {/* Collage */}
                        <div
                            className="grid grid-cols-2 gap-4"
                            style={{ gridTemplateAreas: `"img1 img2" "img1 img3"` }}
                        >
                            {/* Imagen vertical (img1) */}
                            <div
                                className="rounded-xl shadow-lg border border-purple-500/10 overflow-hidden flex items-center justify-center cursor-pointer"
                                style={{ gridArea: "img1" }}
                                onClick={() => handleImageClick("/images/projects-img/web-dj/img3-v.png")}
                            >
                                <img
                                    src="/images/projects-img/web-dj/img3-v2.png"
                                    alt="Versión móvil"
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Imagen lateral (img2) */}
                            <div
                                className="rounded-xl shadow-lg border border-purple-500/10 overflow-hidden flex items-center justify-center cursor-pointer"
                                style={{ gridArea: "img2" }}
                                onClick={() => handleImageClick("/images/projects-img/web-dj/img4.png")}
                            >
                                <img
                                    src="/images/projects-img/web-dj/img4.png"
                                    alt="Historial clínico"
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Imagen lateral (img3) */}
                            <div
                                className="rounded-xl shadow-lg border border-purple-500/10 overflow-hidden flex items-center justify-center cursor-pointer"
                                style={{ gridArea: "img3" }}
                                onClick={() => handleImageClick("/images/projects-img/web-dj/img5.png")}
                            >
                                <img
                                    src="/images/projects-img/web-dj/img5.png"
                                    alt="Historial clínico"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Información del proyecto */}
                    <div>
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold text-white mb-4">Sobre el proyecto</h2>
                            <div className="space-y-4 text-gray-300 text-xl">
                                <p>
                                    Esta web fue diseñada como una plataforma personal para un DJ, con el objetivo de destacar su imagen, estilo y profesionalismo de forma visualmente atractiva.
                                </p>
                                <p>
                                    Se trabajó con una estética minimalista basada en una paleta en blanco, negro y grises, para mantener una presencia elegante y sobria, dejando que las animaciones y transiciones sutiles hablen por sí solas.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Diseño limpio y profesional adaptado a su identidad visual</li>
                                    <li>Animaciones suaves que aportan dinamismo sin saturar</li>
                                    <li>Optimizado para mostrar contenido visual (imágenes, sesiones)</li>
                                    <li>Enlace directo a redes sociales y medios de contacto</li>
                                    <li>Adaptable a dispositivos móviles para una experiencia fluida</li>
                                </ul>
                            </div>

                        </div>

                        {/* Tecnologías */}
                        <div className="mb-10">
                            <div className="p-4 bg-gray-800/50 border border-gray-700/30 rounded-xl w-full">
                                <h2 className="text-2xl font-semibold text-white mb-6">Tecnologías utilizadas</h2>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[
                                        'React', 'React Bootstrap', 'FontAwesome', 'Framer Motion',
                                        'Bootstrap', 'Vite', 'ESLint'
                                    ]
                                        .map((tech, i) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 100 }}
                                                whileHover={{ scale: 1.08 }}
                                                className="group px-3 py-1.5 rounded-full flex items-center justify-center text-white transition-all duration-300"
                                                style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
                                            >
                                                <span className="group-hover:text-white transition-colors duration-300">
                                                    {tech}
                                                </span>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Enlaces */}
                        <div ref={ref} className="space-y-4 relative pb-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">Enlaces</h2>
                            <p className="text-gray-300 text-xl">
                                Por motivos legales o contractuales, no puedo compartir información adicional sobre este proyecto.
                                Si tienes preguntas específicas, no dudes en contactarme directamente.
                            </p>
                            <motion.span
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={{
                                    hidden: { scaleX: 0 },
                                    visible: {
                                        scaleX: 1,
                                        transition: { duration: 1, ease: "easeInOut" }
                                    }
                                }}
                                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de regreso */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 group relative inline-block px-6 py-2 rounded-full font-semibold text-white bg-black/20 border border-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.9)] transition-all duration-300 overflow-hidden min-w-[90px] text-center"
                >
                    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                        Volver
                    </span>
                    <span className="opacity-0 transform translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </span>
                    <span className="absolute inset-0 rounded-full bg-purple-500 opacity-10 z-[-1]" />
                </button>
            </div>
        </motion.div>
    );
}
