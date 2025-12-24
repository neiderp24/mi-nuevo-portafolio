import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin,
    faTwitter,
    faInstagram,
    faFacebook
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    return (
        <footer
            ref={ref}
            className="relative w-full overflow-hidden bg-[#0a0a23] backdrop-blur text-white"
        >
            {/* Línea animada al entrar en vista */}
            <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1 }}
                className="block origin-left w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
            />

            <div className="w-full px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between relative z-20">
                <p className="text-lg text-gray-400">
                    &copy; {new Date().getFullYear()} Neider Parra.
                </p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <a
                        href="https://github.com/neiderp24"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition transform hover:scale-110"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/neider-parra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0A66C2] transition transform hover:scale-110"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </a>
                    <a
                        href="https://www.facebook.com/neiderp24"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#1DA1F2] transition transform hover:scale-110"
                    >
                        <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                    </a>
                    <a
                        href="https://instagram.com/neiderp24"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#C13584] transition transform hover:scale-110"
                    >
                        <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
