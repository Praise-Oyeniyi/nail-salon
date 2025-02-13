import React from 'react'

const ProductDeetLoader = () => {
    return (
        <div className="md:w-4/6 w-[90%] mx-auto mt-5 md:mt-0 animate-pulse">
            <div className="w-full mx-auto md:space-y-5 space-y-3">
            {/* Main product image skeleton */}
            <div className="w-full h-[20em] md:h-[30em] bg-gray-200 rounded-lg overflow-hidden" />

            {/* Product info section */}
            <div>
                <div className="priceandinfo md:flex justify-start items-start">
                {/* Left side info */}
                <div className="left w-full md:w-4/6 space-y-2 pb-5 border-b-2 md:border-r-2 border-r-gray-300 border-b-gray-300">
                    <div className="h-8 md:h-10 bg-gray-200 rounded w-3/4" />
                    <div className="h-20 bg-gray-200 rounded w-full" />
                    <div className="flex gap-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
                    ))}
                    </div>
                </div>

                {/* Right side price */}
                <div className="right w-auto md:pl-5">
                    <div className="border-b-2 border-b-gray-300 pt-3 md:pt-0 pb-3">
                    <div className="h-8 md:h-10 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    </div>
                </div>
                </div>
            </div>

            {/* Color and Size section */}
            <div className="choose-color border-b border-b-gray-300 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-40" />
                <div className="md:flex items-center justify-between space-y-2 md:space-y-0 gap-x-7">
                <div className="space-y-3">
                    {/* Color buttons */}
                    <div className="flex items-center gap-x-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-20 h-10 bg-gray-200 rounded-xl" />
                    ))}
                    </div>
                    {/* Size buttons */}
                    <div className="flex items-center gap-x-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-10 bg-gray-200 rounded-xl" />
                    ))}
                    </div>
                </div>

                {/* Quantity selector */}
                <div className="items flex items-center md:block gap-x-2">
                    <div className="w-32 h-10 bg-gray-200 rounded-2xl" />
                    <div className="h-4 bg-gray-200 rounded w-48 mt-2" />
                </div>
                </div>

                {/* Action buttons */}
                <div className="pt-5 border-b-2 border-b-gray-300 pb-7 flex justify-center md:justify-end items-center gap-x-2">
                <div className="h-10 w-40 bg-gray-200 rounded-3xl" />
                <div className="h-10 w-40 bg-gray-200 rounded-3xl" />
                </div>

                {/* Delivery info */}
                <div className="pd-perks md:w-3/6">
                <div className="py-3 border-b-2 border-b-gray-300">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-64" />
                </div>
                <div className="py-3">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-64" />
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProductDeetLoader