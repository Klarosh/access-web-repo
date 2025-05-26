"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function MainComponent() {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!gsapLoaded || typeof window === "undefined") return;
    const gsap = window.gsap;

    gsap.from(".poster-container", {
      duration: 1,
      scale: 0,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    const posters = document.querySelectorAll(".poster-container");
    posters.forEach((poster) => {
      poster.addEventListener("mouseenter", () => {
        gsap.to(poster, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      poster.addEventListener("mouseleave", () => {
        gsap.to(poster, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, [gsapLoaded]);

  const handleButtonClick = () => {
    toast.success("Quick! Go to Room 305 to submit your answer.");
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Access Denied Message */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-500 font-cyber uppercase tracking-wide">
            Access Denied: Hidden Message
          </h2>
          <p className="mt-2 text-base sm:text-lg text-cyan-300 font-cyber">
            First 5 to decode the hidden message win a special keychain! Don't be sus!
          </p>
        </div>

        {/* Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="poster-container bg-gray-800 rounded-lg shadow-lg p-0 relative overflow-hidden group border border-cyan-400"
            >
              <div className="w-full relative">
                <img
                  src={`/images/poster-${num}.jpg`}
                  alt={`Poster ${num}`}
                  className="w-full h-full object-cover"
                />
                {/* Removed hovering text overlay */}
              </div>

              {/* Removed bottom text for poster 3 */}
            </div>
          ))}
        </div>

        {/* Submission Button */}
        <div className="mt-10 text-center">
        <button
  onClick={handleButtonClick}
  className="submit-btn font-bold py-3 px-6 rounded-lg text-base sm:text-lg transition duration-300 shadow-lg border border-transparent"
>
  Once you find all the hidden message, go to Room 305 to submit.
</button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .submit-btn:hover {
    background-color: #27e7e7 !important;
    box-shadow: 0 0 15px #00ffff, 0 0 30px #00ffff !important;
    color: black !important;
    border-color: #27e7e7 !important;
        }

        .font-cyber {
          font-family: monospace;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .glitch-text {
          position: relative;
          text-shadow:
            0.05em 0 0 #ff00ff,
            -0.025em -0.05em 0 #00ffff,
            0.025em 0.05em 0 #ffff00;
          animation: glitch 500ms infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 #ff00ff,
              -0.025em -0.05em 0 #00ffff,
              0.025em 0.05em 0 #ffff00;
          }
          15% {
            text-shadow: -0.05em -0.025em 0 #ff00ff,
              0.025em 0.025em 0 #00ffff,
              -0.05em -0.05em 0 #ffff00;
          }
          50% {
            text-shadow: 0.025em 0.05em 0 #ff00ff,
              0.05em 0 0 #00ffff,
              0 -0.05em 0 #ffff00;
          }
          100% {
            text-shadow: -0.025em 0 0 #ff00ff,
              -0.025em -0.025em 0 #00ffff,
              -0.025em -0.05em 0 #ffff00;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
