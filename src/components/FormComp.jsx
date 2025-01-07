import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa6";

export const FormComp = ({name, type, plName, styles, errorInfo, register, up}) => {
    return (
      <div className={`py-2 border-b-black ${styles }`}>
          <input {...register(name)}
              className={`accent-slate-950 outline-none w-full bg-transparent font-medium text-black border-b focus-within:border-b-2 border-b-black ${errorInfo? 'border-b-red-500':''}`} 
              placeholder={plName} 
              type={type} 
          />
          {errorInfo && <p className='text-red-500 text-xs mt-1 text-left'>{errorInfo}</p>}
      </div>
    )
}


export const PassFormComp = ({name, plName, errorInfo, register}) => {

    const [see, setSee] = useState(false)

    return (
        <div className='py-2 relative'>
            <input 
                {...register(name)} 
                type={see?"text":'password'} 
                placeholder={plName}
                className={`accent-slate-950 outline-none w-full bg-transparent font-medium text-black border-b focus-within:border-b-2 border-b-black ${errorInfo && 'border-b-red-500'}`}
            />
            <div className={`absolute right-0 top-50 -translate-y-[100%] cursor-pointer `} onClick={()=>{setSee(!see)}}>
                {see?
                    <FaRegEyeSlash/>
                    :
                    <FaRegEye/>
                }
            </div>
            {errorInfo && <p className='text-red-500 text-xs mt-1 text-left'>{errorInfo}</p>}
        </div>
    )
}