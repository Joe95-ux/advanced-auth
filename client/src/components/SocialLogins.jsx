import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialLogins = ({ text }) => {
  return (
    <div className="my-8">
      <p className="text-sm text-gray-400">{text}</p>
      <div className="mt-6 flex items-center justify-items-center">
        <Link to={"/"} className="mr-4">
          <div className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaFacebookF className="size-6 text-white" />
          </div>
        </Link>
        <Link to={"/"} className="mr-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaGoogle className="size-6 text-white" />
          </div>
        </Link>
        <Link to={"/"} className="mr-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-green-500 hover:ring-2 hover:ring-green-500 text-white transition duration-200">
            <FaGithub className="size-6 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLogins;
