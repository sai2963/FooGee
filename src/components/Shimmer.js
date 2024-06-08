import { shimmer_card_unit } from "../../public/Common/constants";

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img stroke animate"></div>
      <div className="shimmer-title stroke animate"></div>
      <div className="shimmer-tags stroke animate"></div>
      <div className="shimmer-details stroke animate"></div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array.from({ length: shimmer_card_unit }, (_, index) => (
        <CardShimmer key={index} />
      ))}
    </div>
  );
};

export default Shimmer;
