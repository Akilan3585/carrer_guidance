import { motion } from "framer-motion";

const CareerPaths = ({ onSelect }) => {
  const paths = [
    { id: "fullstack", name: "Full Stack Developer", color: "bg-green-500" },
    { id: "aiml", name: "AI/ML Engineer", color: "bg-purple-500" },
    { id: "eee", name: "Electrical Engineer", color: "bg-yellow-500" }
  ];

  return (
    <div className="absolute top-20 left-10 space-y-4">
      {paths.map((path) => (
        <motion.button
          key={path.id}
          className={`px-6 py-3 ${path.color} text-white rounded-lg shadow-lg`}
          onClick={() => onSelect(path)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {path.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CareerPaths;
