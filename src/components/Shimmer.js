import { shimmer_card_unit } from "../../public/Common/constants";

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="shimmer-card bg-white rounded-lg p-4 shadow-md mb-4 flex flex-col items-center">
      <div className="shimmer-img h-36 w-56 bg-gray-300 mb-4 animate-shimmer"></div>
      <div className="flex-1 space-y-2 w-full">
        <div className="shimmer-title h-4 bg-gray-300 rounded w-3/5 mx-auto animate-shimmer"></div>
        <div className="shimmer-tags h-3 bg-gray-300 rounded w-4/5 mx-auto animate-shimmer"></div>
        <div className="shimmer-details h-3 bg-gray-300 rounded w-full animate-shimmer"></div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {new Array(shimmer_card_unit).fill(0).map((element, index) => {
        return <CardShimmer key={index} />;
      })}
    </div>
  );
};

export default Shimmer;
