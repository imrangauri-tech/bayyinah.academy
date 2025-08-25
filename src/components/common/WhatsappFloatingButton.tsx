"use client";

import React from "react";
import Link from "next/link";
import { ImWhatsapp } from "react-icons/im";

const WhatsappFloatingButton = () => {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=447700183406&text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20courses"
      target="_blank"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl transform"
    >
      <ImWhatsapp className="text-2xl transition-transform duration-300 ease-out group-hover:scale-110" />
    </Link>
  );
};

export default WhatsappFloatingButton;
