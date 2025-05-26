import React from "react";
import { Link } from "react-router-dom";
import AnimatedTitle from "./AnimatedTitle";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96"></div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Access Denied</p>

          <AnimatedTitle
            title="let's F<b>i</b>ind the Hi<b>d</b>den<br /><B>Message</b><br />of our g<b>a</b>me t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Link
            to="/Hidden"
            className="mt-10 cursor-pointer rounded border px-6 py-3 text-white transition"
            id="submit-link"
          >
            Find The Hidden Message
          </Link>
        </div>
      </div>

      <style jsx>{`
        #submit-link {
          background-color: transparent;
          border-color: transparent;
          color: white;
          box-shadow: none;
        }
        #submit-link:hover {
          background-color: #27e7e7 !important;
          box-shadow: 0 0 15px #00ffff, 0 0 30px #00ffff !important;
          color: black !important;
          border-color: #27e7e7 !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Contact;
