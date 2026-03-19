import React from "react";
import AnimateIn from "../AnimateIn";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import blogBg from "../../assets/images/blogbg1.png";

const ReadBlog: React.FC = () => {
  return (
    <section className="relative w-full h-[35vh] min-h-[350px] overflow-hidden font-sans">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed sm:bg-fixed"
        style={{ backgroundImage: `url(${blogBg})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/65 via-[#071a3a]/45 to-[#0F172A]/65" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-10">

        {/* Text */}
        <AnimateIn variant="fadeLeft" duration={700}>
        <div className="text-center lg:text-left max-w-2xl">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
            Insights From the People
            <br></br><span className="text-[#5BAEFF]">Building Your Infrastructure</span>
          </h3>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Real insights from the field — infrastructure tips, customer success stories,
            product guides, and technical breakdowns from our team.
          </p>
        </div>
        </AnimateIn>

        {/* Button */}
        <AnimateIn variant="fadeRight" delay={200} duration={700}>
        <div className="mt-4 lg:mt-0">
          <Link
            to="/blog"
            className="
              inline-flex items-center gap-2
               text-white
              px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl
              font-semibold text-sm sm:text-base
              transition-all duration-300
              hover:bg-[#22c55e]
              w-full sm:w-auto
              justify-center
            "
          >
            Explore Our Blogs <ArrowRight size={18} />
          </Link>
        </div>
        </AnimateIn>

      </div>
    </section>
  );
};

export default ReadBlog;
