import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 1;
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setLoading(false), { timeout: 1000 });
    } else {
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalVideos ? 1 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!hasClicked) return;

    gsap.set("#next-video", { visibility: "visible" });
    gsap.to("#next-video", {
      transformOrigin: "center center",
      scale: 1,
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power1.inOut",
      onStart: () => nextVideoRef.current?.play(),
    });
    gsap.from("#current-video", {
      transformOrigin: "center center",
      scale: 0,
      duration: 1.5,
      ease: "power1.inOut",
      onComplete: () => currentVideoRef.current?.pause(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentIndex, hasClicked]);

  useEffect(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    const anim = gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    return () => {
      anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <section
      id="Hero"
      className="min-h-dvh w-full bg-blue-75 text-blue-50 overflow-x-hidden"
    >
      {loading && (
        <div className="flex flex-col items-center justify-center absolute z-[100] h-dvh w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
          <h1 className="glitch-text relative text-4xl mb-10 font-bold uppercase tracking-widest text-white">
            <span aria-hidden="true" className="glitch-layer text-cyan-400">
              ACCESSING SYSTEM...
            </span>
            <span aria-hidden="true" className="glitch-layer text-red-400">
              ACCESSING SYSTEM...
            </span>
            <span>ACCESSING SYSTEM...</span>
          </h1>
          <div className="flex gap-1">
            <div className="h-5 w-5 rounded-full bg-hotRed animate-bounce shadow-[0_0_10px_#ff0055]" />
            <div
              className="h-5 w-5 rounded-full bg-hotRed animate-bounce shadow-[0_0_10px_#ff0055]"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="h-5 w-5 rounded-full bg-hotRed animate-bounce shadow-[0_0_10px_#ff0055]"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <p className="mt-2 text-sm text-white opacity-70 tracking-widest">
            ⚠️ WARNING: Do <b>NOT</b> click any suspicious links <b>you could get hacked!</b>
          </p>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVideoRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="w-full h-full object-cover object-center"
                  onLoadedData={handleVideoLoad}
                  preload="auto"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 w-full h-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            preload="auto"
          />
          <video
            ref={currentVideoRef}
            src={getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            preload="auto"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          D<b>en</b>ied
        </h1>

        <div className="absolute left-0 top-0 z-40 w-full h-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              ac<b>ce</b>ss
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              You are not authorized to enter the <br /> Room 305
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
