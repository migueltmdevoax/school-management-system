import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  ShieldCheck,
  GraduationCap,
  CreditCard,
  Bell,
  BarChart3,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Ambiente Seguro",
    description:
      "Brindamos un entorno escolar seguro, confiable y enfocado en el bienestar integral de nuestros alumnos.",
  },
  {
    icon: GraduationCap,
    title: "Excelencia Académica",
    description:
      "Programas educativos diseñados para potenciar el desarrollo académico y humano de cada estudiante.",
  },
  {
    icon: CreditCard,
    title: "Tecnología Educativa",
    description:
      "Integramos herramientas digitales modernas para fortalecer el aprendizaje y la comunicación escolar.",
  },
  {
    icon: Bell,
    title: "Comunicación Cercana",
    description:
      "Mantenemos una comunicación constante entre docentes, alumnos y padres de familia.",
  },
  {
    icon: BarChart3,
    title: "Desarrollo Integral",
    description:
      "Impulsamos habilidades académicas, sociales y emocionales para formar estudiantes completos.",
  },
  {
    icon: Users,
    title: "Comunidad Escolar",
    description:
      "Fomentamos valores, trabajo en equipo y sentido de pertenencia dentro de nuestra institución.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      data-theme="light"
      className="
      relative
      py-24 sm:py-32
      bg-gradient-to-b
      from-slate-50
      to-white
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
        top-20
        right-0
        w-[300px]
h-[300px]
sm:w-[500px]
sm:h-[500px]
        bg-cyan-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
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
            Que ofrecemos?
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
            Comprometidos con una educación de calidad.
          </h2>

          <p
            className="
            mt-6
            text-slate-600
            text-base sm:text-lg
            leading-relaxed
            "
          >
            Una institución educativa enfocada en formar
estudiantes con valores, excelencia académica
y preparación para los retos del futuro.
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          className="
          mt-16 sm:mt-20
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6 sm:gap-8
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                }}
                className="
                group
                relative
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6 sm:p-8
                shadow-xl
                hover:shadow-2xl
                transition
                duration-500
                overflow-hidden
                "
              >
                {/* HOVER GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-blue-500/0
                  to-cyan-500/0
                  group-hover:from-blue-500/5
                  group-hover:to-cyan-500/10
                  transition
                  duration-500
                  "
                />

                {/* ICON */}
                <div
                  className="
                  relative
                  z-10
                  w-14
h-14
sm:w-16
sm:h-16
                  rounded-2xl
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Icon className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-8">
                  <h3
                    className="
                    text-xl sm:text-2xl
                    font-bold
                    text-slate-900
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                    mt-4
                    text-slate-600
                    leading-relaxed
                    "
                  >
                    {feature.description}
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

export default FeaturesSection;