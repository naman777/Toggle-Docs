import type React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4 sm:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center"
      >
        Welcome to Toggle-Docs
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-center max-w-3xl mt-8 mb-12"
      >
        Toggle-Docs is a powerful collaborative document editing application designed to streamline teamwork and
        productivity. Create and join virtual rooms to collaborate on documents in real-time, from anywhere in the
        world.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        {[
          { text: "Create Room", path: "/create-room", color: "from-green-500 to-green-600" },
          { text: "Join Room", path: "/join-room", color: "from-blue-500 to-blue-600" },
          { text: "Get Document", path: "/get-document", color: "from-purple-500 to-purple-600" },
        ].map((button, index) => (
          <motion.button
            key={button.text}
            onClick={() => navigate(button.path)}
            className={`bg-gradient-to-r ${button.color} px-6 py-3 rounded-lg shadow-lg text-white font-semibold text-lg transition-all duration-300 ease-in-out hover:shadow-xl`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            {button.text}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default Home

