import { IMG_CDN_URL } from "../../public/Common/constants";

const Groceries = ({ displayName, imageId }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition transform hover:scale-105 hover:shadow-lg">
      <img 
        className="w-full h-32 object-cover rounded-lg mb-4" 
        src={IMG_CDN_URL + imageId} 
        alt={displayName} 
      />
      <span className="text-lg font-bold">{displayName}</span>
    </div>
  );
};

export default Groceries;
