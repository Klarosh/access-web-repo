import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./gamecard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const GameCard = () => {
  const [games, setItem] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch("/data/gamesData.json")
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((e) => console.error("Error loading games:", e));
  }, []);

  return (
    <div className="mt-32 px-4 md:px-8 ">
      <Swiper
       slidesOffsetBefore={50}
       slidesOffsetAfter={50}
        effect={"coverflow"}
        grabCursor={true}
        navigation={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 35,
          stretch: 200,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="gameSwiper"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <div className="gameCardSlider">
              <img src={game.imageUrl} alt={game.title} />

              <div className="content">
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <p className="price">₱{game.price}</p>
                <div className="buttons">
                  <span className="absolute inset-0 bg-black opacity-10 blur-lg animate-sweep rounded-xl pointer-events-none"></span>
                  <a href="#" className="orderBtn z-11">
                    View Store
                  </a>
                  <button
                    className={`playBtn ${activeIndex === index ? "active" : ""}`}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <i className={`bi ${activeIndex === index ? "bi-pause-fill" : "bi-play-fill"}`}></i>
                  </button>
                </div>
              </div>

              {activeIndex === index && (
                <div className="video">
                  <button
                    className="closeBtn"
                    onClick={() => setActiveIndex(null)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <iframe
                    className="w-full h-full rounded-xl backdrop-blur-xl bg-black/30"
                    src={game.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={game.title}                  
                  ></iframe>
                </div>
              )}

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameCard;
