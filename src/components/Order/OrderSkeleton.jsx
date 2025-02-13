import React from 'react'

const OrderSkeleton = () => {
    return (
        <div className="w-full md:px-5 p-1 md:py-3 py-2 border animate-pulse">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            
            <div className="order-item w-full my-3">
            <div className="order-item-in w-full">
                <div className="flex w-full justify-between">
                <div className="left flex gap-x-2">
                    {/* Image skeleton */}
                    <div className="bg-gray-200 md:h-14 h-10 w-10 md:w-14"></div>
                    
                    <div className="text-sm space-y-2">
                    {/* Description skeleton */}
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    {/* Name skeleton */}
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    {/* Colors skeleton */}
                    <div className="colors gap-x-1 text-xs flex font-medium">
                        <div className="h-5 w-14 bg-gray-200 rounded"></div>
                        <div className="h-5 w-14 bg-gray-200 rounded"></div>
                        <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    </div>
                    </div>
                </div>
                
                <div className="right self-end flex items-center justify-center gap-x-1 md:gap-x-3">
                    {/* Quantity skeleton */}
                    <div className="h-6 w-16 md:w-20 bg-gray-200 rounded-md"></div>
                    {/* Price skeleton */}
                    <div className="h-6 w-12 md:w-16 bg-gray-200 rounded-md"></div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default OrderSkeleton