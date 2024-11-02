import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import HandIn from '../components/images/IMAGE1.png'
import Hand from '../components/images/IMAGE2.png'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


const Welcome = () => {
    const [up, setUp]= useState(true);
    const [see, setSee] = useState(false)


  return (
    <div className='w-full mx-auto h-full'>
        <div className='w-full h-full flex justify-center '>
            <div className="image-side w-3/6 relative border-r bg-[#ffb7ce7a]">
                <div className='w-full h-full'>
                    {up? <img src={Hand}  alt="" className="h-full" /> : <img src={HandIn} alt="" />}
                </div>
            </div>


            <div className='w-3/6 h-full text-center mt-10 px-14'>
                <div className="text-inner flex w-full h-full flex-col justify-center">
                    <div className="logo w-14 h-14 mx-auto bg-black rounded-full my-5"></div>
                    
                    <div className="inner-text">
                        <h2 className='text-6xl font-bold'>Welcome{up? '!':' back!'}</h2>
                        <p className='font-semibold text-xl'>Please fill in your details</p>
                    </div>

                    <form action="#" className='pt-4'>
                        {up? 
                            <div className='space-y-2 pt-7'>
                                <div className='py-2 border-b focus-within:border-b-2 border-b-black '>
                                    <input required type="email" placeholder='Email' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                </div>

                                <div className='py-2 border-b focus-within:border-b-2 border-b-black '>
                                    <input required type="text" placeholder='Username' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                </div>

                                <div className='py-2 border-b focus-within:border-b-2 border-b-black relative'>
                                    <input required type={see?"text":'password'} placeholder='Password' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                    <div className='absolute right-0 top-50 -translate-y-[100%] cursor-pointer' onClick={()=>{setSee(!see)}}>
                                        {see?
                                            <FaRegEyeSlash/>
                                            :
                                            <FaRegEye/>
                                        }
                                    </div>
                                    
                                </div>

                                <div className='py-2 border-b focus-within:border-b-2 relative border-b-black '>
                                    <input required type={see?"text":'password'} placeholder='Re-enter Password' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                    <div className='absolute right-0 top-50 -translate-y-[100%] cursor-pointer' onClick={()=>{setSee(!see)}}>
                                        {see?
                                            <FaRegEyeSlash/>
                                            :
                                            <FaRegEye/>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='space-y-2 pt-7'>
                                <div className='py-2 border-b relative focus-within:border-b-2 border-b-black '>
                                    <input required type="email" placeholder='Email' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                    
                                </div>

                                <div className='py-2 border-b focus-within:border-b-2 border-b-black relative '>
                                    <input required type={see?"text":'password'} placeholder='Password' className='accent-slate-950 outline-none border-none w-full bg-transparent font-medium text-black'/>
                                    <div className='absolute right-0 top-50 -translate-y-[100%] cursor-pointer' onClick={()=>{setSee(!see)}}>
                                        {see?
                                            <FaRegEyeSlash/>
                                            :
                                            <FaRegEye/>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='mt-2 flex items-center space-x-2 cursor-pointer'>
                            <input type="checkbox" name="remember" id="remember " className='accent-black w-4 h-4' />
                            <h6 className='text-gray-400 text-sm font-medium'>Remember me</h6>
                        </div>


                            {/* #ffb7ce #cccccc #fff1f5 #ff00ff */}
                        <div className="buttons w-4/6 mx-auto mt-5 space-y-3">
                            <button className='uppercase rounded-3xl tracking-wider py-2 font-bold text-base bg-[#ffb7ce] flex justify-center items-center w-5/6 mx-auto'>
                                {up?'Sign up':'Sign in'}
                            </button>

                            <button className='uppercase rounded-3xl tracking-wider py-2 font-bold text-base bg-[#ffb7ce7a] flex justify-center items-center w-full'>
                                {up?'Sign up with google':'Sign in with google'}
                            </button>


                            <p className='font-normal text-base pt-9'>{up? 'Already have an account?':"Don't have an account?" }<Link to href={up?'/signin':'/'}><span onClick={()=>setUp(!up)} className='uppercase font-bold pl-2'>{up? 'Sign In': 'Sign up'}</span></Link> </p>
                        </div>
                        
                        


                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome