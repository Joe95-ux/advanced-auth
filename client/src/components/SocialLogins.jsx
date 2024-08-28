import { FaFacebookF, FaGoogle, FaGithub  } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialLogins = ({ text }) => {
  return (
    <div className="mt-9 mb-1">
      <p className="relative flex items-center w-full">
        <span className="flex-grow border-t border-gray-400"></span>
        <span className="px-4 text-center text-gray-400 text-sm pb-1">{text}</span>
        <span className="flex-grow border-t border-gray-400"></span>
      </p>
      <div className="mt-6 flex items-center justify-center justify-items-center">
        <Link to={"/"} className="mr-4">
          <div className="p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaFacebookF className="size-5 text-white" />
          </div>
        </Link>
        <Link to={"/"} className="mr-4">
          <div className="p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaGoogle className="size-5 text-white" />
          </div>
        </Link>
        <Link to={"/"} className="mr-4">
          <div className="p-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaGithub className="size-5 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLogins;
