import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HashLink as Link } from "react-router-hash-link";
import Logo from "./logo";

const AnimatedLine = ({ animate = true, delay = 0 }) => (
    <motion.span
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay }}
        className="block origin-left w-full h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
    />
);

const sections = [
    { href: "#about", label: "Sobre mí", id: "about" },
    { href: "#skills", label: "Habilidades", id: "skills" },
    { href: "#experience", label: "Experiencia", id: "experience" },
    { href: "#projects", label: "Proyectos", id: "projects" },
    { href: "#certifications", label: "Certificaciones", id: "certifications" },
    { href: "#contact", label: "Contacto", id: "contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    const handleLinkClick = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                closeMenu();
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection("");
                return;
            }

            for (const section of sections) {
                const el = document.querySelector(section.href);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setActiveSection(section.href);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [showLogo, setShowLogo] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setShowLogo(prev => !prev);
        }, 3000); // cambia cada 3 segundos

        return () => clearInterval(interval);
    }, []);


    return (
        <motion.nav
            ref={ref}
            className="fixed top-0 left-0 w-full z-50 bg-[#0a0a23] border-b border-white/10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center text-white ">
                <Link
                    to="/#hero"
                    className="text-xl font-bold cursor-pointer ml-8 md:ml-6 xl:ml-4"
                >
                    <div className="relative w-30 h-10 flex items-center justify-center [perspective:1200px]">

                        {/* GLOW MÁGICO */}
                        <div
                            className={`
                pointer-events-none absolute w-16 h-16 rounded-full
                bg-gradient-to-r from-blue-400 to-purple-600
                blur-2xl opacity-0 transition-all duration-[900ms]
                ${showLogo ? "opacity-30 scale-75" : "opacity-50 scale-105"}
            `}
                        />

                        {/* LOGO */}
                        <div
                            className={`
                absolute transition-all duration-[900ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${showLogo ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}
            `}
                            style={{
                                transformStyle: "preserve-3d",
                                transform: showLogo
                                    ? "rotateY(0deg) scale(1)"
                                    : "rotateY(85deg) scale(0.8)"
                            }}
                        >
                            <Logo />
                        </div>

                        {/* TEXTO */}
                        <div
                            className={`
                absolute transition-all duration-[950ms]
                ease-[cubic-bezier(0.22,1,0.36,1)] delay-100
                ${showLogo ? 'opacity-0 blur-md' : 'opacity-100 blur-0'}
            `}
                            style={{
                                transformStyle: "preserve-3d",
                                transform: showLogo
                                    ? "rotateY(-85deg) scale(1.15)"
                                    : "rotateY(0deg) scale(1)"
                            }}
                        >
                            <span
                                className="inline-block text-3xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                                style={{ WebkitTextFillColor: 'transparent' }}
                            >
                                Neider
                            </span>
                        </div>

                    </div>
                </Link>

                {/* Desktop menu */}
                <ul className="hidden md:flex text-xl gap-6 tracking-wide relative">
                    {sections.map((item) => (
                        <li key={item.href} className="relative group">
                            <Link
                                to={`/${item.href}`}
                                scroll={el => el.scrollIntoView({ behavior: "smooth" })}
                                className={`hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600 hover:text-transparent hover:bg-clip-text transition ${activeSection === item.href ? "font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent" : ""}`}
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </Link>
                            {activeSection === item.href && (
                                <span className="absolute left-0 -bottom-1 w-full h-0.5 overflow-hidden">
                                    <AnimatedLine />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Hamburger icon */}
                <div className="md:hidden flex items-center">
                    <button ref={buttonRef} onClick={toggleMenu} className="text-4xl">
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        ref={menuRef}
                        className="md:hidden absolute top-full left-0 w-full px-6 pt-6 flex flex-col gap-5 text-white z-40 shadow-2xl bg-[#080820]"
                        initial={{
                            clipPath: "circle(0% at 90% 10%)",
                            opacity: 0,
                            scaleY: 0.95
                        }}
                        animate={{
                            clipPath: "circle(150% at 90% 10%)",
                            opacity: 1,
                            scaleY: 1
                        }}
                        exit={{
                            clipPath: "circle(0% at 90% 10%)",
                            opacity: 0,
                            scaleY: 0.95
                        }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut"
                        }}
                    >
                        {sections.map((item) => (
                            <motion.div key={item.href} className="relative">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Link
                                        to={`/${item.href}`}
                                        scroll={el => el.scrollIntoView({ behavior: "smooth" })}
                                        onClick={handleLinkClick}
                                        className={`transition text-lg tracking-wide block ${activeSection === item.href ? "font-bold" : ""}`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                                {activeSection === item.href && (
                                    <span className="absolute left-0 -bottom-1 w-full h-0.5 overflow-hidden">
                                        <motion.span
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 1 }}
                                            className="block origin-left w-32 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                                        />
                                    </span>
                                )}
                            </motion.div>
                        ))}

                        {/* Línea inferior del menú */}
                        <div className="mt-6">
                            <AnimatedLine animate={true} delay={0.2} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Línea inferior del navbar */}
            {!menuOpen && (
                <div className="px-6">
                    <AnimatedLine animate={inView} />
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
