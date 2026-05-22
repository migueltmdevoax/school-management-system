import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  Building2,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

const cards = [
  {
    icon: Building2,
    title: "¿Quiénes Somos?",
    description:
      "Somos una institución educativa comprometida con la formación académica, humana y emocional de nuestros estudiantes, impulsando el aprendizaje en un entorno moderno y seguro.",
  },
  {
    icon: Target,
    title: "Misión",
    description:
      "Brindar educación de excelencia mediante una formación integral basada en valores, innovación y acompañamiento constante para cada alumno.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser una institución reconocida por su calidad educativa, liderazgo académico y compromiso con el desarrollo de futuros ciudadanos responsables.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    description:
      "Fomentamos respeto, responsabilidad, empatía, honestidad y trabajo en equipo como pilares fundamentales de nuestra comunidad escolar.",
  },
];

const AboutSection = () => {
  return (
    <section
  id="about"
  data-theme="light"
  className="
  relative
  mt-16
  sm:mt-24
  py-24
  sm:py-32
  bg-slate-50
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
        top-0
        right-0
        w-[300px]
h-[300px]
sm:w-[500px]
sm:h-[500px]
        bg-blue-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">

        {/* HEADER */}
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
            tracking-[3px] sm:tracking-[4px]
            text-blue-600
            font-semibold
            mb-4
            "
          >
            Nosotros
          </p>

          <h2
            className="
            text-3xl
sm:text-4xl
md:text-5xl
            font-black
            text-slate-900
            leading-tight
            "
          >
            Formación integral con visión hacia el futuro.
          </h2>

          <p
            className="
            mt-6
            text-slate-600
            text-base sm:text-lg
            leading-relaxed
            "
          >
            Nuestra institución promueve una educación moderna,
            humana y enfocada en el crecimiento académico
            y personal de cada estudiante.
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          className="
          mt-16 sm:mt-24
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6 sm:gap-10
          "
        >
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
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
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-white
                border
                border-slate-200
                p-7 sm:p-10
                shadow-xl
                hover:shadow-2xl
                transition
                duration-500
                "
              >
                {/* HOVER GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-500
                  bg-gradient-to-br
                  from-blue-500/5
                  to-cyan-500/10
                  "
                />

                {/* ICON */}
                <div
                  className="
                  relative
                  z-10
                  w-16
h-16
sm:w-20
sm:h-20
                  rounded-3xl
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-8">
                  <h3
                    className="
                    text-2xl sm:text-3xl
                    font-bold
                    text-slate-900
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                    mt-6
                    text-slate-600
                    leading-relaxed
                    text-lg
                    "
                  >
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;