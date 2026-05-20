// components/ui/PageGlow.jsx

import { motion } from "framer-motion";

export default function PageGlow() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* HERO TOP */}
      <div
        className="
          absolute
          left-1/2
          top-0

          h-[700px]
          w-[700px]

          -translate-x-1/2

          rounded-full

          bg-cyan-300/10

          blur-[140px]

          dark:bg-cyan-500/10
        "
      />

      {/* SECTION 1 */}
      <div
        className="
          absolute
          -left-40
          top-[18%]

          h-[500px]
          w-[500px]

          rounded-full

          bg-sky-300/10

          blur-[120px]

          dark:bg-sky-500/10
        "
      />

      {/* SECTION 2 */}
      <div
        className="
          absolute
          right-[-180px]
          top-[32%]

          h-[620px]
          w-[620px]

          rounded-full

          bg-blue-300/10

          blur-[140px]

          dark:bg-blue-500/10
        "
      />

      {/* CENTER */}
      <div
        className="
          absolute
          left-1/2
          top-[50%]

          h-[600px]
          w-[600px]

          -translate-x-1/2

          rounded-full

          bg-indigo-300/10

          blur-[140px]

          dark:bg-indigo-500/10
        "
      />

      {/* SECTION 3 */}
      <div
        className="
          absolute
          left-[-150px]
          top-[68%]

          h-[550px]
          w-[550px]

          rounded-full

          bg-cyan-200/10

          blur-[130px]

          dark:bg-cyan-500/10
        "
      />

      {/* BOTTOM */}
      <div
        className="
          absolute
          right-[-220px]
          bottom-[-100px]

          h-[700px]
          w-[700px]

          rounded-full    

          bg-blue-400/10

          blur-[150px]

          dark:bg-blue-500/10
        "
      />
    </motion.div>
  );
}
