import Renderitems from "./Renderitems";
const Accordion = ({ index, items, categoryName, openAccordion, toggleAccordion, renderItems }) => {
    return (
        <div className="accordion-item mb-4">
            <div className="accordion-header cursor-pointer p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-t-lg" onClick={() => toggleAccordion(index)}>
                <b className="text-2xl">{categoryName}</b>
            </div>
            {openAccordion === index && (
                <ul className="accordion-content mt-4 space-y-4">
                    {items.length > 0 ? <Renderitems items={items} key={index} index={index}/> : <li className="text-lg text-gray-800">No menu items available</li>}
                </ul>
            )}
        </div>
    );
};

export default Accordion;
