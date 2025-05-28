import React from "react";

const Banner = () => {
  return (
    <section id="contact" className="text-center py-12 md:py-16 my-16 bg-surface rounded-xl max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
       Wenn sie <span className="text-primary">Interesse</span> haben mich zu kontaktieren.
      </h2>
      <p className="text-foregroundMuted mt-4 text-lg md:text-xl">
        drücken sie auf den unteren Knopf
      </p>
      <a
        href="mailto:deniz20070206@gmail.com"
        className="inline-block mt-6 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-teal-700 transition-all duration-300"
      >
        Kontakt aufnehmen
      </a>
    </section>
  );
};

export default Banner;
