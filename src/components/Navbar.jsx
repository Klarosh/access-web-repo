import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

const Menus = [
  { id: 1, name: "HOME", hash: "Hero" },
  { id: 2, name: "ABOUT", hash: "About" },
  { id: 3, name: "FEATURES", hash: "Features" },
  { id: 4, name: "STORE", link: "/store" },
];

const Socials = [
  { id: 10, name: "DISCORD", href: "https://discord.gg/your-server" },
  { id: 11, name: "INSTAGRAM", href: "https://instagram.com/your-profile" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWYZ";

const desktopMenuVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
const desktopItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function NavBar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrambled, setScrambled] = useState({}); // { [id]: displayText }

  const backgroundMusicRef = useRef(null);
  const menuToggleAudioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // AUDIO LOGIC
  const toggleAudio = () => {
    if (!isAudioEnabled) return;
    const bg = backgroundMusicRef.current;
    if (!bg) return;
    isAudioPlaying ? bg.pause() : bg.play().catch(() => {});
    setIsAudioPlaying(!isAudioPlaying);
  };
  const playHoverSound = (id) => {
    if (!isAudioEnabled) return;
    const s = document.getElementById(id);
    if (s) {
      s.currentTime = 0;
      s.play().catch(() => {});
    }
  };
  const playMenuToggleSound = () => {
    const t = menuToggleAudioRef.current;
    if (t) {
      t.currentTime = 0;
      t.play().catch(() => {});
    }
  };
  useEffect(() => {
    const enableAudio = () => {
      if (isAudioEnabled) return;
      setIsAudioEnabled(true);
      const bg = backgroundMusicRef.current;
      if (bg && !isBgMusicPlaying) {
        bg.volume = 0.5;
        bg.play().catch(() => {});
        setIsBgMusicPlaying(true);
        setIsAudioPlaying(true);
      }
    };
    const handleVis = () => {
      const bg = backgroundMusicRef.current;
      if (!bg || !isAudioEnabled) return;
      document.hidden ? bg.pause() : bg.play().catch(() => {});
    };
    window.addEventListener("click", enableAudio, { once: true });
    window.addEventListener("scroll", enableAudio, { once: true });
    document.addEventListener("visibilitychange", handleVis);
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("scroll", enableAudio);
      document.removeEventListener("visibilitychange", handleVis);
    };
  }, [isAudioEnabled, isBgMusicPlaying]);

  // SCROLL DETECTION for sticky header
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(
        location.pathname === "/about" || window.scrollY > 10
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // NAVIGATION HANDLER
  const handleNavClick = (item) => {
    setIsNavVisible(false);
    if (item.link) return navigate(item.link);
    if (location.pathname !== "/") {
      navigate(`/#${item.hash}`);
    } else {
      document
        .getElementById(item.hash)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SCRAMBLE LOGIC
  const scrambleOnce = (id, finalText) => {
    let frame = 0;
    const total = 15;
    const run = () => {
      const out = finalText
        .split("")
        .map((c, i) =>
          i < (frame / total) * finalText.length
            ? c
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");
      setScrambled((p) => ({ ...p, [id]: out }));
      frame++;
      if (frame <= total) requestAnimationFrame(run);
      else setScrambled((p) => ({ ...p, [id]: finalText }));
    };
    run();
  };

  // Kick off scramble on open
  useEffect(() => {
    if (!isNavVisible) return;
    Menus.forEach((item, idx) =>
      setTimeout(() => scrambleOnce(item.id, item.name), idx * 100)
    );
    Socials.forEach((item, idx) =>
      setTimeout(
        () => scrambleOnce(item.id, item.name),
        (Menus.length + idx) * 100
      )
    );
  }, [isNavVisible]);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-700 ${
        isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Desktop Header & Menu */}
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex w-full items-center justify-between p-4">
          <img src="/img/BBQ.png" alt="logo" className="w-10" />
          <motion.div
            className="hidden md:flex gap-6 items-center"
            initial="hidden"
            animate={isScrolled ? "visible" : "hidden"}
            variants={desktopMenuVariants}
          >
            {Menus.map((item, i) => (
              <motion.button
                key={item.id}
                variants={desktopItemVariants}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => playHoverSound(`hover-sound-${i}`)}
                className="nav-item"
              >
                {item.name}
                <audio
                  id={`hover-sound-${i}`}
                  src="/audio/hover.mp3"
                  preload="auto"
                  className="hidden"
                />
              </motion.button>
            ))}
            {/* Desktop audio bars omitted for brevity */}
          </motion.div>
        </nav>
      </header>

      {/* Mobile Controls */}
      <div className="lg:hidden fixed top-4 right-4 z-[9999] flex items-center gap-3">
      <button
            onClick={toggleAudio}
            className="p-2 text-cyan-300 hover:text-white transition-colors"
            title={isAudioPlaying ? "Mute" : "Unmute"}
            aria-label="Toggle Audio"
          >
            {isAudioPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14l-5-5H3a1 1 0 01-1-1v-2a1 1 0 011-1h1l5-5zM19 9l2 2m0 0l-2 2m2-2H15" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14l-5-5H3a1 1 0 01-1-1v-2a1 1 0 011-1h1l5-5zm7 4v6m2-4v2" />
              </svg>
            )}
          </button>

        <Hamburger
          toggled={isNavVisible}
          toggle={() => {
            playMenuToggleSound();
            setIsNavVisible((v) => !v);
          }}
          color="#00ffff"
          size={30}
        />
      </div>

      {/* Hidden audio elements */}
      <audio
        ref={backgroundMusicRef}
        src="/audio/lobbys.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      <audio
        ref={menuToggleAudioRef}
        src="/audio/menu-toggle.mp3"
        preload="auto"
        className="hidden"
      />

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isNavVisible && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-black text-white z-[9999]"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-3 flex flex-col h-full justify-between text-sm">
                {/* Header with “Menu” title */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl"></h2>
                  <button
                    onClick={() => {
                      playMenuToggleSound();
                      setIsNavVisible(false);
                    }}
                    className="text-xl text-cyan-300"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="space-y-4">
                  {Menus.map((item, idx) => (
                    <motion.li
                      key={item.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: idx * 0.1,
                      }}
                    >
                      <button
                        onClick={() => handleNavClick(item)}
                        onMouseEnter={() => {
                          playHoverSound(`hover-sound-${idx}`);
                          scrambleOnce(item.id, item.name);
                        }}
                        className="text-sm"
                      >
                        {scrambled[item.id] || "—".repeat(item.name.length)}
                        <audio
                          id={`hover-sound-${idx}`}
                          src="/audio/hover.mp3"
                          preload="auto"
                          className="hidden"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Social Links with scramble */}
                <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col items-center space-y-2">
                  {Socials.map(({ id, name, href }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => scrambleOnce(id, name)}
                      className="text-sm"
                    >
                      {scrambled[id] || "—".repeat(name.length)}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyframes */}
      <style>{`
        @keyframes bar1 { /* … */ }
        @keyframes bar2 { /* … */ }
        @keyframes bar3 { /* … */ }
        @keyframes bar4 { /* … */ }
        @keyframes scramble {
          0%   { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .scramble-active {
          animation: scramble 0.6s steps(1) forwards;
        }
      `}</style>
    </div>
  );
}
