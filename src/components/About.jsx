import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh", // Changed from 100dvh for better compatibility
      borderRadius: 0,
      ease: "power2.out",
    });
  });

  return (
    <section
      id="About"
      className="min-h-screen w-screen overflow-hidden bg-[#f8f8fc]" // Changed min-h-[100svh] to min-h-screen
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        <p className="font-general text-sm uppercase text-center md:text-[10px]">
          Welcome to Access Denied
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the <br /> Digital <b>w</b>orld"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext px-4">
          <p>Secure the system. Expose the threat.</p>
          <p className="text-gray-500">
            Access Denied drops you into a digital war where Developers secure and Hackers sabotage.
          </p>
        </div>
      </div>

      <div className="relative h-screen w-screen" id="clip"> {/* Changed h-[100svh] to h-screen */}
        <div
          className="mask-clip-path about-image will-change-transform transform-gpu"
          style={{
            WebkitBackfaceVisibility: "hidden", // Added WebKit prefix for older iOS
            backfaceVisibility: "hidden",
            width: "400px", // ← Set width here
            height: "auto", // ← Optional, to keep it flexible
          }}
        >
          <img
            src="img/AccessDenied.jpeg"
            alt="Background"
            className="absolute left-0 top-0 w-full h-full object-cover" // Replaced size-full with explicit width and height
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default About;