import { TypewriterEffect } from "@/components/ui/typewriter-effect";

function DonarTypeWritterEffect() {
  const words = [
    { text: "1000+\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "Donors\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "have\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "donated\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "to\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "various\u00A0", className: "text-white text-[20px] font-bold" },
    { text: "charities", className: "text-white text-[20px] font-bold" },
  ];

  return <TypewriterEffect words={words} />;
}

export default DonarTypeWritterEffect;
