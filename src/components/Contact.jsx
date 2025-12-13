import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "emailjs-com";

const Contact = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [buttonText, setButtonText] = useState("Enviar mensaje");
    const [showPlaneAnimation, setShowPlaneAnimation] = useState(false);

    const modoTest = false;

    useEffect(() => {
        if (modoTest) {
            console.warn("⚠️ MODO TEST ACTIVADO: No se enviará ningún mensaje real.");
        }
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modoTest) {
            console.log("Modo test: mensaje simulado como enviado");
            setButtonText("¡Mensaje enviado!");
            setFormData({ name: "", email: "", message: "" });
            setIsSending(false);
            setShowPlaneAnimation(true);

            setTimeout(() => {
                setShowPlaneAnimation(false);
                setButtonText("Enviar mensaje");
            }, 2800);
            return;
        }

        setIsSending(true);

        // Enviar correo a ti
        emailjs.send(
            "service_hf01t2c",
            "template_kt4kx8p",
            {
                name: formData.name,
                email: formData.email,
                message: formData.message
            },
            "DIk7reTbSfc-ok_dD"
        )
            .then(() => {
                // Luego enviar respuesta automática al usuario
                return emailjs.send(
                    "service_hf01t2c",
                    "template_94sbgtf", // auto-reply
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                    },
                    "DIk7reTbSfc-ok_dD"
                );
            })
            .then(() => {
                setFormData({ name: "", email: "", message: "" });
                setButtonText("¡Mensaje enviado!");
                setShowPlaneAnimation(true);
                setTimeout(() => {
                    setButtonText("Enviar mensaje");
                    setShowPlaneAnimation(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error al enviar el correo:", error);
                setButtonText("Hubo un error");
                setTimeout(() => {
                    setButtonText("Enviar mensaje");
                }, 3000);
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-32 px-6 md:px-20 z-10 min-h-screen flex items-center justify-center"
        >

            <div className="max-w-3xl w-full">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-4 relative pb-8"
                    >
                        <TypeAnimation
                            sequence={["Contacto", 3000]}
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
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div>
                        <label htmlFor="name" className="block text-white mb-2">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required={!modoTest}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#111827] border border-purple-600 text-white rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-white mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required={!modoTest}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#111827] border border-purple-600 text-white rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-white mb-2">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            required={!modoTest}
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#111827] border border-purple-600 text-white rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-none"
                        ></textarea>
                    </div>
                    <div className="text-center relative">
                        <button
                            type="submit"
                            disabled={isSending || buttonText === "¡Mensaje enviado!"}
                            className={`group relative bg-black/20 border border-purple-500 px-8 py-3 text-white font-bold rounded-full transition-all duration-300 overflow-hidden 
                                    hover:shadow-[0_0_15px_rgba(139,92,246,0.9)] 
                                    shadow-[0_0_10px_rgba(139,92,246,0.5)] 
                                    ${isSending || buttonText === "¡Mensaje enviado!" ? "pointer-events-none" : ""}`}
                        >
                            <span className="block transition-opacity duration-300 group-hover:opacity-0">
                                {isSending ? "Enviando..." : buttonText}
                            </span>
                            <FaPaperPlane className="absolute inset-0 m-auto text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute inset-0 rounded-full bg-purple-500 opacity-10 z-[-1]" />
                        </button>

                        <AnimatePresence>
                            {showPlaneAnimation && (
                                <motion.div
                                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                    animate={{
                                        x: 600,
                                        y: -400,
                                        opacity: 0,
                                        scale: 0.2
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.8, ease: "easeInOut" }}
                                    className="absolute left-1/2 top-0 translate-x-[-50%] z-50 pointer-events-none"
                                >
                                    <div className="relative w-fit h-fit">
                                        <div className="relative w-fit h-fit rotate-[45deg]">
                                            <motion.div
                                                initial={{ height: 0, opacity: 1 }}
                                                animate={{ height: 200, opacity: [1, 0.5, 0] }}
                                                transition={{ duration: 2.5, ease: "easeOut" }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-indigo-400 to-transparent blur-[2px] rounded-full z-0"
                                            />
                                            <FaPaperPlane className="text-white text-2xl drop-shadow-xl relative z-10 rotate-[-40deg]" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
