import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

const Menus = [
{ id: 1, name: "Home", hash: "Hero" },
{ id: 2, name: "About", hash: "About" },
{ id: 3, name: "Features", hash: "Features" },
{ id: 4, name: "Store", link: "/store" },
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

const toggleAudio = () => {
if (!isAudioEnabled) return;
const audio = backgroundMusicRef.current;
if (audio) {
if (isAudioPlaying) {
audio.pause();
} else {
audio.play().catch((err) => console.warn("Play failed:", err));
}
setIsAudioPlaying(!isAudioPlaying);
}
};

const playHoverSound = (id) => {
if (!isAudioEnabled) return;
const audio = document.getElementById(id);
if (audio) {
audio.currentTime = 0;
audio.play().catch((err) => console.error("Hover audio failed:", err));
}
};

useEffect(() => {
const enableAudio = () => {
if (!isAudioEnabled) {
setIsAudioEnabled(true);
if (backgroundMusicRef.current && !isBgMusicPlaying) {
backgroundMusicRef.current.volume = 0.5;
backgroundMusicRef.current.play().catch(() => {});
setIsBgMusicPlaying(true);
setIsAudioPlaying(true);
}
}
};

const handleVisibilityChange = () => {
  const audio = backgroundMusicRef.current;
  if (!audio || !isAudioEnabled) return;
  if (document.hidden) {
    audio.pause();
  } else {
    audio.play().catch(() => {});
  }
};

window.addEventListener("click", enableAudio, { once: true });
window.addEventListener("scroll", enableAudio, { once: true });
document.addEventListener("visibilitychange", handleVisibilityChange);

return () => {
  window.removeEventListener("click", enableAudio);
  window.removeEventListener("scroll", enableAudio);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
};

}, [isAudioEnabled, isBgMusicPlaying]);

const playMenuToggleSound = () => {
if (menuToggleAudioRef.current) {
menuToggleAudioRef.current.currentTime = 0;
menuToggleAudioRef.current.play().catch(() => {});
}
};

const handleNavClick = (item) => {
setIsNavVisible(false);
if (item.link) {
navigate(item.link);
} else {
if (location.pathname !== "/") {
navigate(`/#${item.hash}`);
} else {
document.getElementById(item.hash)?.scrollIntoView({ behavior: "smooth" });
}
}
};

useEffect(() => {
const handleScroll = () => {
if (location.pathname === "/about" || window.scrollY > 10) {
setIsScrolled(true);
} else {
setIsScrolled(false);
}
};
handleScroll();
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);

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
<div className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-700 ${isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'}`}> <header className="absolute top-1/2 w-full -translate-y-1/2"> <nav className="flex size-full items-center justify-between p-4"> <div className="flex items-center gap-7"> <img src="/img/BBQ.png" alt="logo" className="w-10" /> </div>

      <div className="flex h-full items-center gap-6">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {Menus.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => playHoverSound(`hover-sound-${index}`)}
              className="nav-item"
            >
              {item.name}
              <audio
                id={`hover-sound-${index}`}
                src="/audio/hover.mp3"
                preload="auto"
                className="hidden pointer-events-none"
              />
            </button>
          ))}

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`inline-block p-4 rounded-lg transition-all duration-500 ${
              isAudioPlaying ? "bg-transparent shadow-[0_0_15px_rgba(0,255,255,0.5)]" : "bg-transparent"
            }`}
            aria-label="Toggle Audio"
          >
            <div className="flex items-end h-[12px] gap-1">
              <div className={`w-[4px] bg-[#00ffff] rounded-t ${isAudioPlaying ? "h-[20px] animate-bar1" : "h-[10px]"}`} />
              <div className={`w-[4px] bg-[#00ffff] rounded-t ${isAudioPlaying ? "h-[30px] animate-bar2" : "h-[15px]"}`} />
              <div className={`w-[4px] bg-[#00ffff] rounded-t ${isAudioPlaying ? "h-[15px] animate-bar3" : "h-[8px]"}`} />
              <div className={`w-[4px] bg-[#00ffff] rounded-t ${isAudioPlaying ? "h-[25px] animate-bar4" : "h-[12px]"}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  </header>

  {/* Mobile Hamburger + Audio Toggle */}
  <div className="lg:hidden">
    <div className="fixed top-4 right-4 z-[9999] flex items-center gap-3">
      {/* Audio Toggle Icon */}
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

      {/* Hamburger Button */}
      <Hamburger
        toggled={isNavVisible}
        size={30}
        toggle={() => {
          playMenuToggleSound();
          setIsNavVisible(!isNavVisible);
        }}
        color="#00ffff"
      />
    </div>
  </div>

  {/* Audio elements */}
  <audio ref={backgroundMusicRef} src="/audio/lobby.mp3" loop preload="auto" className="hidden pointer-events-none" />
  <audio ref={menuToggleAudioRef} src="/audio/menu-toggle.mp3" preload="auto" className="hidden pointer-events-none" />

  {/* Animations */}
  <style>{`
    @keyframes bar1 { 0%, 100% { height: 20px; } 50% { height: 10px; } }
    @keyframes bar2 { 0%, 100% { height: 30px; } 50% { height: 15px; } }
    @keyframes bar3 { 0%, 100% { height: 15px; } 50% { height: 25px; } }
    @keyframes bar4 { 0%, 100% { height: 25px; } 50% { height: 12px; } }
    .animate-bar1 { animation: bar1 1s ease-in-out infinite; }
    .animate-bar2 { animation: bar2 1.2s ease-in-out infinite; }
    .animate-bar3 { animation: bar3 0.8s ease-in-out infinite; }
    .animate-bar4 { animation: bar4 1.4s ease-in-out infinite; }
  `}</style>

  {/* Mobile Menu */}
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
          <div className="p-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl"></h2>
              <button
                onClick={() => {
                  playMenuToggleSound();
                  setIsNavVisible(false);
                }}
                className="text-xl text-cyan-300"
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>

                {/* Menu Items */}
                <ul className=" bg-black space-y-4 h-full">
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
                        className="nav-item w-full text-left p-4 rounded-lg transition-colors duration-300 nav-item:hover nav-item:size"
                        aria-label={`Navigate to ${item.name}`}
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
                <div className=" bg-blue-200 border-t border-gray-700 pt-2 flex flex-col items-center space-y-2">
                  {Socials.map(({ id, name, href }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => scrambleOnce(id, name)}
                      className="nav-item"
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
</div>
);
};