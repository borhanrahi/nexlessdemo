import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Login Required</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Please log in to purchase a plan.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginRequiredModal;