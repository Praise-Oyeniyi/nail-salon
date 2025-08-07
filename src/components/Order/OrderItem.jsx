import React from "react";

const OrderItem = ({ e }) => {
  return (
    <div className="w-full md:px-5 p-1 md:py-3 py-2 border">
      {/* <h4 className='font-bold md:text-xl text-base'>Order Item</h4> */}
      <h5 className="state font-medium w-fit text-[#FFB7CF] md:tracking-wider px-1 text-xs md:text-sm bg-[#fff1f5]">
        {e?.status}
      </h5>
      {/* <p className='md:text-sm text-xs font-medium'>Make payment for your goods and get your items</p> */}

      <div className="order-item w-full my-3">
        <div className="order-item-in w-full ">
          <div className="flex w-full justify-between">
            <div className="left flex gap-x-2">
              <div className="image bg-black overflow-hidden md:h-14 h-10 w-10 md:w-14">
                <img src={e?.images[0]} alt="" className="w-full" />
              </div>
              <div className="text-sm">
                <h6 className="item text-[#cccccc] text-xs md:sm truncate w-fit md:w-2/6">
                  {e?.description}
                </h6>
                <h4 className="Item-name font-bold">{e?.name}</h4>
                <div className="colors gap-x-1 text-xs flex font-medium">
                  <button className="border border-[#cccccc] px-2 max-w-fit">
                    Glossy
                  </button>
                  <button className="border border-[#cccccc] px-2 max-w-fit">
                    {e?.color}
                  </button>
                  <div className="color-picked bg-black w-5 h-inherit"></div>
                </div>
              </div>
            </div>
            <div className="right self-end flex items-center justify-center gap-x-1 md:gap-x-3 text-xs md:text-sm">
              <button className="amount border border-gray-700 w-16 md:w-20 rounded-md text-center font-medium">
                {e?.quantity} piece
              </button>
              <p className="cost border border-gray-600 w-12 md:w-16 rounded-md text-center font-medium">
                ${e?.final_price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
