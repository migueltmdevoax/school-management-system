import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  ShieldCheck,
  GraduationCap,
  Users,
} from "lucide-react";

const roles = [
  {
    icon: ShieldCheck,
    title: "Primaria",
    description:
      "Educación enfocada en el desarrollo académico, emocional y social de nuestros estudiantes desde edades tempranas.",
    gradient:
      "from-blue-600 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Secundaria",
    description:
      "Formación integral que fortalece habilidades, liderazgo y preparación para nuevos retos académicos.",
    gradient:
      "from-violet-600 to-fuchsia-500",
  },
  {
    icon: Users,
    title: "Comunidad Escolar",
    description:
      "Una comunidad basada en valores, comunicación cercana y acompañamiento constante para alumnos y familias.",
    gradient:
      "from-emerald-600 to-teal-500",
  },
];

const RolesSection = () => {
  return (
    <section
      id="roles"
      data-theme="dark"
      className="
      relative
      py-24 sm:py-32
      bg-slate-950
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
      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        top-0
        left-0
        w-[250px]
h-[250px]
sm:w-[500px]
sm:h-[500px]
        bg-blue-500/20
        rounded-full
        blur-3xl
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[250px]
h-[250px]
sm:w-[500px]
sm:h-[500px]
        bg-violet-500/20
        rounded-full
        blur-3xl
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
            text-blue-400
            font-semibold
            mb-4
            "
          >
            Aulas Inteligentemente Ordenadas
          </p>

          <h2
            className="
            text-3xl
sm:text-4xl
md:text-5xl
            font-black
            text-white
            leading-tight
            "
          >
            Una experiencia diseñada para cada alumno.
          </h2>

          <p
            className="
            mt-6
            text-slate-300
            text-base sm:text-lg
            leading-relaxed
            "
          >
            "La atención personalizada y el enfoque académico han permitido que nuestros hijos crezcan en un ambiente seguro y motivador.".
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          className="
          mt-16 sm:mt-24
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6 sm:gap-10
          "
        >
          {roles.map((role, index) => {
            const Icon = role.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                }}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-7 sm:p-10
                shadow-2xl
                "
              >
                {/* GRADIENT HOVER */}
                <div
                  className={`
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-700
                  bg-gradient-to-br
                  ${role.gradient}
                  `}
                  style={{
                    mixBlendMode: "overlay",
                  }}
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
                  bg-white/10
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Icon className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-10">
                  <h3
                    className="
                    text-2xl sm:text-3xl
                    font-bold
                    text-white
                    "
                  >
                    {role.title}
                  </h3>

                  <p
                    className="
                    mt-6
                    text-slate-300
                    leading-relaxed
                    text-lg
                    "
                  >
                    {role.description}
                  </p>
                </div>

                {/* BOTTOM LINE */}
                <div
                  className={`
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  group-hover:w-full
                  transition-all
                  duration-700
                  bg-gradient-to-r
                  ${role.gradient}
                  `}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;