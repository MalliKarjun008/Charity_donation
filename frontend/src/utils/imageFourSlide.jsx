import DonarCard from "@/components/campaign/DonarCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import DonarTypeWritterEffect from "@/components/campaign/DonarTypeWritterEffect";

function ImageFourSlide() {
  return (
    <div className="w-full p-8 h-80 overflow-hidden bg-stone-600 rounded-2xl flex flex-col justify-center gap-5 items-start">
      <div>
        <h1 className="text-white text-3xl font-semibold">
          1000+ Charity Donors
        </h1>
        <DonarTypeWritterEffect />
      </div>

      {/* slider container */}
      <div className="relative w-[80%] h-[70%] m-auto rounded-2xl overflow-hidden">
        {/* sliding track */}
        <motion.div
          className="flex gap-10"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 20,
          }}
        >
          {/* slider items */}
          <DonarCard />
          <DonarCard />
          <DonarCard />
          <DonarCard />
          <DonarCard />
          <DonarCard />
          <DonarCard />
          <DonarCard />
        </motion.div>
      </div>
    </div>
  );
}

export default ImageFourSlide;
