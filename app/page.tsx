"use client";

import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function Home() {
  return (
    <div className="h-screen bg-black">
      <WavyBackground className="max-w-4xl mx-auto" moveUpAmount={500}>
        <motion.article
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.p variants={itemVariants} className="lg:text-2xl text-white font-bold text-center mt-20 mb-0 pb-0">
            Welcome to the
          </motion.p>
          <motion.p
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, hidden: { opacity: 0, y: -20 } }}
            className="text-fun-300 text-7xl lg:text-9xl font-bold mb-5 text-center pt-0"
          >
            Memories
          </motion.p>
          <motion.p variants={itemVariants} className="lg:text-lg mt-2 text-white text-center font-semibold">
            of <span className="text-lg lg:text-2xl">Aditi Sankara</span> and{" "}
            <span className="text-lg lg:text-2xl">Imtiyaz Sayyid</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center mt-10">
            <Button className="border-fun-200 border-2 hover:bg-fun-200 font-semibold w-40" asChild>
              <Link href={"/login"}>Dive In</Link>
            </Button>
          </motion.div>
        </motion.article>
      </WavyBackground>
    </div>
  );
}
