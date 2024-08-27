import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const App = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get('/backend/hello'); 
        setGreeting(response.data.message);
      } catch (error) {
        console.error('Error fetching greeting:', error);
      }
    };
    fetchGreeting();
  }, []);

  return (
    <motion.div
      className="bg-blue-500 p-5 rounded-lg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white text-xl">{greeting}</h1>
    </motion.div>
  );
};

export default App;
