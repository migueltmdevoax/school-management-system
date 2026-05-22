import { motion } from "framer-motion";
import logo from "../assets/logo.png";

import imagen1ParaPaginaWeb from "../assets/imagen1ParaPaginaWeb.png";
import imagen2ParaPaginaWeb from "../assets/imagen2ParaPaginaWeb.png";
import imagen4ParaPaginaWeb from "../assets/imagen4ParaPaginaWeb.png";

const screenshots = [
  imagen1ParaPaginaWeb,
  imagen2ParaPaginaWeb,
  imagen4ParaPaginaWeb,
];

const ScreenshotsSection = () => {
  return (
    <section
      data-theme="light"
      className="
      relative
      py-32
      bg-white
      overflow-hidden
      "
    >
        <img
  src={logo}
  alt="Watermark"
  className="
  absolute
  inset-0
  m-auto
  w-[300px]
  sm:w-[450px]
  lg:w-[600px]
  opacity-[0.04]
  object-contain
  pointer-events-none
  select-none
  blur-[1px]
  "
/>
      {/* GLOW */}
      <div
        className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[700px]
        h-[700px]
        bg-blue-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p
            className="
            uppercase
            tracking-[4px]
            text-blue-600
            font-semibold
            mb-4
            "
          >
            Plataforma Escolar Exclusiva
          </p>

          <h2
            className="
            text-4xl
            md:text-5xl
            font-black
            text-slate-900
            leading-tight
            "
          >
            Diseñada para operar en escuelas modernas.
          </h2>

          <p
            className="
            mt-6
            text-slate-600
            text-lg
            leading-relaxed
            "
          >
            Dashboards intuitivos, visuales profesionales
            y herramientas diseñadas para optimizar la gestión escolar.
          </p>
        </motion.div>

        {/* MOCKUPS */}
        <div
          className="
          mt-24
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-10
          "
        >
          {screenshots.map((image, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotate: index === 1 ? 0 : index % 2 === 0 ? -2 : 2,
              }}
              className="
              relative
              rounded-[32px]
              overflow-hidden
              shadow-2xl
              border
              border-slate-200
              bg-white
              "
              style={{
                rotate:
                  index === 0
                    ? "-4deg"
                    : index === 2
                    ? "4deg"
                    : "0deg",
              }}
            >
              <img
                src={image}
                alt="Dashboard Preview"
                className="
                w-full
                h-[500px]
                object-cover
                transition
                duration-700
                hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                to-transparent
                "
              />

              {/* LABEL */}
              <div
                className="
                absolute
                bottom-6
                left-6
                text-white
                "
              >
                <h3 className="text-2xl font-bold">
                  Imagen
                </h3>

                <p className="text-white/80 mt-2">
                  Experiencia visual premium
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;