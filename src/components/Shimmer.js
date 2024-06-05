import { shimmer_card_unit } from "../../public/Common/constants";

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:w-64 animate-pulse m-2">
      <div className="bg-gray-300 h-40 w-full rounded-md mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-6 rounded-md w-3/4"></div>
        <div className="bg-gray-300 h-4 rounded-md w-2/3"></div>
        <div className="bg-gray-300 h-4 rounded-md w-1/2"></div>
        <div className="bg-gray-300 h-4 rounded-md w-1/3"></div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {new Array(shimmer_card_unit).fill(0).map((_, index) => {
        return <CardShimmer key={index} />;
      })}
    </div>
  );
};

export default Shimmer;
