import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import NotFoundImg from "../assets/not-found/page-not-found.svg";

interface NotFoundProps {
  showBackgroundGlow?: boolean;
  className?: string;
}

export const NotFound = ({ showBackgroundGlow = true, className }: NotFoundProps) => {
  return (
    <div className={`flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 ${className}`}>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 relative">

        {/* OPTIONAL glow background */}
        {showBackgroundGlow && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="blur-3xl opacity-20 bg-purple-500 w-72 h-72 absolute top-20 left-10 rounded-full" />
            <div className="blur-3xl opacity-20 bg-blue-500 w-80 h-80 absolute bottom-20 right-10 rounded-full" />
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">

          {/* Illustration */}
          <div className="flex h-80 w-80 justify-center mb-6">
            <img src={NotFoundImg} className="w-full h-full object-contain" />
          </div>

          {/* Text */}
          <h1 className="text-4xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Page Not Found
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md text-sm">
            The page you are looking for doesn’t exist or was moved.  
            Try going back to the previous page.
          </p>

          {/* Button */}
          <Link
            to=".."
            relative="path"
            className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-2"
            />
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};
