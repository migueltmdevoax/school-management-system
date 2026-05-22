import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const CTASection = () => {
  return (
    <section
      data-theme="light"
      className="
      relative
      py-32
      overflow-hidden
      bg-gradient-to-br
      from-blue-700
      via-cyan-600
      to-blue-900
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
        top-0
        left-0
        w-[600px]
        h-[600px]
        bg-white/10
        rounded-full
        blur-3xl
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[600px]
        h-[600px]
        bg-cyan-300/10
        rounded-full
        blur-3xl
        "
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
        >
          <p
            className="
            uppercase
            tracking-[4px]
            text-blue-100
            font-semibold
            mb-6
            "
          >
            Contamos con plataforma Escolar Inteligente
          </p>

          <h2
            className="
            text-5xl
            md:text-7xl
            font-black
            text-white
            leading-tight
            "
          >
            Forma parte de nuestra comunidad educativa.
          </h2>

          <p
            className="
            mt-8
            text-xl
            text-blue-100
            leading-relaxed
            max-w-3xl
            mx-auto
            "
          >
            Modernizamos procesos, mejoramos comunicación
            y transformamos la experiencia educativa
            con una plataforma Saas propia del colegio.
          </p>

          {/* BUTTONS */}
          <div
            className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-6
            "
          >
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
              bg-white
              text-blue-700
              px-10
              py-5
              rounded-full
              font-bold
              text-lg
              shadow-2xl
              hover:bg-slate-100
              transition
              duration-300
              "
            >
              Solicitar Informacion
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
              border
              border-white/30
              bg-white/10
              backdrop-blur-md
              text-white
              px-10
              py-5
              rounded-full
              font-bold
              text-lg
              hover:bg-white/20
              transition
              duration-300
              "
            >
              Proceso de admisión
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;