import React from 'react'

const ProductLoader = () => {
    return (
        <div className="w-full shadow-md shadow-gray-200">
        <div className="relative bg-gray-100 min-w-full min-h-[12em] md:min-h-[22em] animate-pulse">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
    
        <div className="py-3 pb-5 px-2">
            <div className="flex flex-col gap-y-1">
            <div className="flex items-start justify-between gap-x-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-16 flex-shrink-0 animate-pulse" />
            </div>
    
            <div className="h-4 bg-gray-200 rounded w-full mt-1 animate-pulse" />
    
            <div className="flex items-center gap-x-2 pt-1">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
    
            <div className="h-6 bg-gray-200 rounded w-20 mt-2 animate-pulse" />
            </div>
        </div>
        </div>
    );
}

export default ProductLoader