  import React from 'react';
  import { motion } from 'framer-motion';

  const Pagination = ({ currentPage, totalPages, onPageChange, paginate }) => {
    const handlePageChange = (pageNumber) => {
      if (typeof onPageChange === 'function') {
        onPageChange(pageNumber);
      } else if (typeof paginate === 'function') {
        paginate(pageNumber);
      }
    };

    return (
      <div className="flex justify-center mt-4 mb-8">
        <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2 bg-gray-800 rounded-lg p-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage + i - 2;
            return pageNumber > 0 && pageNumber <= totalPages ? (
              <motion.button
                key={pageNumber}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ${
                  currentPage === pageNumber ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {pageNumber}
              </motion.button>
            ) : null;
          })}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    );
  };

  export default Pagination;