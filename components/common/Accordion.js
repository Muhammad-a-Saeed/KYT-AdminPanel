import React, { useState } from "react";

const AccordionItem = ({ title, content, item, isActive, onClick, isTable }) => {
    return (
        <div className="border my-1 bg-white rounded-md">
            <h2 className="mb-0">
                <button
                    className={`border-0 rounded-t-md px-5 py-4 text-left text-base bg-white transition-all duration-500 ${isActive
                        ? "!bg-primary text-white group relative flex w-full items-center "
                        : "group relative flex w-full items-center rounded-t-[15px] text-neutral-800 "
                        }`}
                    type="button"
                    onClick={onClick}
                    aria-expanded={isActive}
                >
                    {title}
                    <span
                        className={` ${isActive
                            ? "rotate-[-180deg] -mr-1 fill-[#336dec] "
                            : "rotate-0 fill-[#212529]"
                            } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </button>
            </h2>
            {isActive && <div className={`${!isTable && "py-4 px-5"}  text-sm `}>{isTable ?
                <>
                    <div className="flex px-5">
                        <div className="w-1/3 text-sm font-medium py-4">Type</div>
                        <div className="w-1/3 text-sm font-medium py-4 pl-2 border-black border-l-2">Dosage</div>
                        <div className="w-1/3 text-sm font-medium py-4 pl-2 border-black border-l-2">Price</div>
                    </div>
                    {item?.dosages?.map((item, ind) => {
                        return (
                            <div key={ind} className={`${ind % 2 === 0 ? "bg-gray-200" : ""} flex px-5`}>
                                <div className="w-1/3 py-4 capitalize">{item?.type}</div>
                                <div className="w-1/3 py-4 pl-2 border-black border-l-2">{item?.dosage}</div>
                                <div className="w-1/3 py-4 pl-2 border-black border-l-2">{item?.price}</div>
                            </div>
                        )
                    })}
                </>
                : content}</div>}
        </div>
    );
};



const Accordion = ({ array = [], titleKey = "", contentKey = "", isTable = false }) => {
    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value) => {
        setActiveElement(activeElement === value ? "" : value);
    };
    return (
        <div id="" className="my-6 select-none border p-3 rounded-md">
            {array?.map((item, index) => {
                return (
                    <AccordionItem
                        key={index}
                        isTable={isTable}
                        item={item}
                        title={item[titleKey]}
                        content={
                            <p>
                                {item[contentKey] ?? "Coming soon"}
                            </p>
                        }
                        isActive={activeElement === `element${index}`}
                        onClick={() => handleClick(`element${index}`)}
                    />
                )
            })}
            {/* <AccordionItem
                title="Accordion Item #3"
                content={
                    <p>
                        <strong>This is the third item's accordion body.</strong> Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu
                        rhoncus purus, vitae tincidunt nibh. Vivamus elementum egestas
                        ligula in varius. Proin ac erat pretium.
                    </p>
                }
                isActive={activeElement === "element3"}
                onClick={() => handleClick("element3")}
            /> */}

        </div>
    )
}

export default Accordion
