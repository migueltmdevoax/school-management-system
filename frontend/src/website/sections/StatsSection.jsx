import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const stats = [
  {
    number: "+500",
    label: "Alumnos activos",
  },
  {
    number: "+40",
    label: "Docentes conectados",
  },
  {
    number: "99.9%",
    label: "Disponibilidad",
  },
  {
    number: "24/7",
    label: "Comunicación escolar",
  },
];

const StatsSection = () => {
  return (
    <section
    data-theme="light" 
    className="relative bg-white py-24 overflow-hidden">
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
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[600px]
        bg-blue-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-10
              text-center
              shadow-xl
              hover:shadow-blue-100
              transition
              duration-300
              "
            >
              <h2
                className="
                text-5xl
                font-black
                text-blue-600
                "
              >
                {stat.number}
              </h2>

              <p
                className="
                mt-4
                text-slate-600
                font-medium
                "
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;