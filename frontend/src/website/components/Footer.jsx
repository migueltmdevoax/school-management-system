const Footer = () => {
  return (
    <footer
      id="contact"
      className="
      bg-slate-950
      border-t
      border-white/10
      py-16
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div
          className="
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-10
          "
        >
          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-black text-white">
              Solar Juvenil<span className="text-red-500">Oaxaqueño</span>
            </h2>

            <p className="mt-4 text-slate-400 max-w-md">
              Escuela comprometida con el futuro de Mexico, 
              para mayor informacion agenda una cita con nosotros.
            </p>
          </div>

          {/* LINKS */}
          <div
  className="
  flex
  flex-wrap
  justify-center
  gap-4
  sm:gap-8
  text-sm
  sm:text-base
  text-slate-300
  font-medium
  "
>
            <a
              href="#features"
              className="hover:text-white transition"
            >
              Nosotros
            </a>

            <a
              href="#roles"
              className="hover:text-white transition"
            >
              Diferenciador
            </a>

            <a
              href="#testimonials"
              className="hover:text-white transition"
            >
              Testimonios
            </a>

            <a
              href="#contact"
              className="hover:text-white transition"
            >
              Contacto
            </a>
          </div>
        </div>
        

        {/* COPYRIGHT */}
        <div
          className="
          mt-16
          pt-8
          border-t
          border-white/10
          text-center
          text-slate-500
          "
        >
          © 2026 SolarJuvenilOaxaqueño. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;