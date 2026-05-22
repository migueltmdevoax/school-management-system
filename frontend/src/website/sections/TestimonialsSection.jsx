import { motion } from "framer-motion";
import logo from "../assets/logo.png";
const testimonials = [
  {
    name: "Dirección Académica",
    role: "Institución Educativa",
    text: "La plataforma transformó completamente nuestra gestión escolar. Ahora todo es más rápido, organizado y profesional.",
  },
  {
    name: "Coordinación Docente",
    role: "Área Académica",
    text: "La tranquilidad de que mis hijos se encuentren seguros en este colegio no tiene precio..",
  },
  {
    name: "Padres de Familia",
    role: "Comunidad Escolar",
    text: "Poder consultar calificaciones, pagos y notificaciones desde cualquier lugar nos da muchísima tranquilidad, algo unico en este colegio.",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      data-theme="dark"
      className="
      relative
      py-24 sm:py-32
      bg-gradient-to-b
      from-slate-950
      via-slate-900
      to-slate-950
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
      {/* GLOW EFFECTS */}
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
        bg-cyan-500/20
        rounded-full
        blur-3xl
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

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
            tracking-[4px]
            text-blue-400
            font-semibold
            mb-4
            "
          >
            Testimonios
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
            Diseñado para transformar la experiencia escolar.
          </h2>

          <p
            className="
            mt-6
            text-slate-300
            text-base sm:text-lg
            leading-relaxed
            "
          >
            Un colegio unico en Oaxaca 
            diseñado para crear experiencias unicas en los alumnos 
            mientras aprenden.
          </p>
        </motion.div>
        

        {/* TESTIMONIAL CARDS */}
        <div
          className="
          mt-16 sm:mt-24
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6 sm:gap-10
          "
        >
          {testimonials.map((testimonial, index) => (
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
                y: -12,
                scale: 1.02,
              }}
              className="
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
              {/* QUOTE */}
              <div
                className="
                text-5xl sm:text-7xl
                text-blue-400/20
                absolute
                top-6
                right-6
                font-black
                "
              >
                ”
              </div>
              

              {/* TEXT */}
              <p
                className="
                relative
                z-10
                text-slate-200
                text-base sm:text-lg
                leading-relaxed
                "
              >
                {testimonial.text}
              </p>

              {/* USER */}
              <div className="mt-10 flex items-center gap-4">
                
                {/* AVATAR */}
                <div
                  className="
                  w-12
h-12
sm:w-14
sm:h-14
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  to-cyan-400
                  "
                />

                <div>
                  <h4 className="text-white font-bold">
                    {testimonial.name}
                  </h4>

                  <p className="text-slate-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;