import { IMG_CDN_URL } from "../../public/Common/constants";

const Renderitems = ({ items }) => {
  return items.map((item, index) => (
    <div
      key={index}
      className="p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-100 hover:bg-white transition duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={IMG_CDN_URL + item.card?.info?.imageId}
            alt={item.card?.info?.name}
            className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md mr-4"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {item.card?.info?.name || "No Name"}
            </h3>
            {console.log(item.card?.info?.name || "No Name")}
            <p className="text-lg text-gray-600">
              Rs: {item.card?.info?.price ? item.card.info.price / 100 : "Free"}
            </p>
            <p className="text-sm text-gray-500 italic leading-snug mt-2 bg-gray-200 p-2 rounded-md shadow-inner">
              {item.card?.info?.description || " "}
            </p>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  ));
}

export default Renderitems;
