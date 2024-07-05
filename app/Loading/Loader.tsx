import React from "react";
import { GridLoader } from "react-spinners";
import { useTheme } from "next-themes";

const Loader = ({ size = 15, margin = 2 }) => {
  const { resolvedTheme } = useTheme();

  const getLoaderColor = () => {
    switch (resolvedTheme) {
      case "dark":
        return "#9333ea"; 
      case "light":
        return "#7e22ce"; 
      default:
        return "#8b5cf6"; 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full fixed top-0 left-0 bg-white dark:bg-gray-900 transition-colors duration-200 z-50">
      <GridLoader color={getLoaderColor()} size={size} margin={margin} />
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
