import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  {
    label: "Nosotros",
    href: "#about",
  },
  {
    label: "Que ofrecemos?",
    href: "#features",
  },
  {
    label: "Sectores",
    href: "#roles",
  },
  {
    label: "Testimonios",
    href: "#testimonials",
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [darkSection, setDarkSection] =
    useState(true);

  // DETECTAR SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // DETECTAR SECCIONES OSCURAS
  useEffect(() => {
    const handleThemeDetection = () => {
      const sections =
        document.querySelectorAll("section");

      let currentTheme = "light";

      sections.forEach((section) => {
        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= 100 &&
          rect.bottom >= 100
        ) {
          currentTheme =
            section.dataset.theme || "light";
        }
      });

      setDarkSection(
        currentTheme === "dark"
      );
    };

    window.addEventListener(
      "scroll",
      handleThemeDetection
    );

    handleThemeDetection();

    return () => {
      window.removeEventListener(
        "scroll",
        handleThemeDetection
      );
    };
  }, []);
  

  return (
    <>
      <header
  className={`
  fixed
  top-0
  left-0
  w-full
  z-50
  transition-all
  duration-500

  ${
    scrolled
      ? "bg-white/20 backdrop-blur-md"
      : "bg-transparent"
  }
  `}
>
        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-12
          h-14
          flex
          items-center
          justify-between
          "
        >
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="
            flex
            items-center
            gap-3
            cursor-pointer
            "
          >
            <img
              src={logo}
              alt="Solar Juvenil Oaxaqueño"
              className="
              w-14
              h-14
              opacity-[0.85]
              object-contain
              drop-shadow-xl
              rounded-xl
              "
            />

            <div className="leading-tight">
              <h1
  className={`
  text-[15px]
  sm:text-[15px]
  font-semibold
  tracking-[0.18em]
  uppercase
  transition
  duration-300
  ${
    darkSection
      ? "text-white"
      : "text-slate-900"
  }
  `}
>
  Solar Juvenil
</h1>

              <p
  className="
  text-[11px]
  tracking-[0.35em]
  uppercase
  text-red-600
  font-medium
  mt-[2px]
  "
>
  Oaxaqueño
</p>
            </div>
          </motion.div>

          {/* DESKTOP NAV */}
          <nav
            className="
            hidden
            lg:flex
            items-center
            gap-10
            "
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`
                font-medium
                transition
                duration-300
                ${
  darkSection
    ? "text-white hover:text-blue-300"
    : "text-slate-700 hover:text-blue-600"
}
                `}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP BUTTON */}
          <div className="hidden lg:block">
            <button
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
              transition
              duration-300
              shadow-lg
              shadow-blue-500/20
              "
            >
              Iniciar Sesión
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className={`
            lg:hidden
            transition
            duration-300
            ${
  darkSection
    ? "text-white"
    : "text-slate-900"
}
            `}
          >
            {mobileMenuOpen ? (
              <X size={32} />
            ) : (
              <Menu size={32} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
            fixed
            inset-0
            z-40
            bg-slate-950/95
            backdrop-blur-2xl
            flex
            flex-col
            items-center
            justify-center
            gap-10
            "
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                text-3xl
                font-bold
                text-white
                hover:text-blue-400
                transition
                "
              >
                {link.label}
              </a>
            ))}

            <button
              className="
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              text-lg
              transition
              "
            >
              Iniciar Sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;