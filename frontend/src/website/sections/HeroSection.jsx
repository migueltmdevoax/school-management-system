import { motion }      from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo                   from "../assets/logo.png";
import imagen3ParaPaginaWeb   from "../assets/imagen3ParaPaginaWeb.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      data-theme="dark"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
    >
      {/* GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-3xl rounded-full" />
      <img src={logo} alt="Watermark"
        className="absolute inset-0 m-auto w-[350px] sm:w-[500px] lg:w-[650px] opacity-[0.06] object-contain pointer-events-none select-none blur-[1px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-white">
              Preparándolos en todo momento para la vida...
            </h1>
            <p className="mt-8 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Somos un colegio comprometido con la excelencia académica, la innovación
              y la formación integral de nuestros estudiantes en primaria y secundaria.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-blue-500/30 transition duration-300 w-full sm:w-auto"
              >
                Iniciar Sesión
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-white/20 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition duration-300 w-full sm:w-auto"
              >
                Conoce Nuestra Institución
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative">
            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
            >
              <img src={imagen3ParaPaginaWeb} alt="Dashboard"
                className="rounded-2xl object-cover w-full h-[500px]" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;