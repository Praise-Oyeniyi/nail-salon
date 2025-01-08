import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import HandIn from '../images/IMAGE1.webp'
import Hand from '../images/IMAGE2.webp'
import {FaGoogle  } from "react-icons/fa";
import Logo from '../images/logo.webp'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema, loginSchema } from '../constants/schema/AuthScehema';
import {FormComp, PassFormComp} from './FormComp';
import {submitData} from '../../src/apis/Auth';
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate();
    const [message,setMessage] = useState(null)
    const [up, setUp]= useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(up?authSchema:loginSchema),
        mode: "onChange" // This enables real-time validation
    });

    const onSubmitHandler = async (data) => {
        const result = await submitData(data, 'https://wittynailtip.com/backend/signup.php');
        if (result.success) {
            reset();
            navigate('/Home');
        } else {
            setMessage(result.error);
        }
    };
    
    const onSignInHandler = async (data) => {
        const result = await submitData(data, 'https://wittynailtip.com/backend/login.php');
        if (result.success) {
            reset();
            navigate('/Home');
        } else {
            setMessage(result.error);
        }
    };

  return (
    <div className='w-full mx-auto h-full'>
        <div className='w-full h-full flex justify-center '>
            <div className="image-side hidden md:block w-3/6 relative border-r bg-[#ffb7ce7a]">
                <div className='w-full'>
                    {up? <img src={Hand}  alt="" className="h-full" /> : <img src={HandIn} alt="" />}
                </div>
            </div>


            <div className='md:w-3/6 w-full h-full text-center mt-5 px-7 md:px-14'>
                <div className="text-inner flex w-full h-full flex-col justify-center">
                    <div className="logo w-14 h-14 mx-auto overflow-hidden bg-black rounded-full mt-5 mb-3">
                        <img src={Logo} alt="" className='w-full '/>
                    </div>
                    
                    <div className="inner-text leading-tight">
                        <h2 className='md:text-4xl text-3xl lg:text-5xl font-bold tracking-wide'>Welcome{up? '!':' back!'}</h2>
                        <p className='font-semibold text-base md:text-xl'>Please fill in your details</p>
                    </div>

                    <form  className='pt-4 font-normal text-sm' onSubmit={up?handleSubmit(onSubmitHandler):handleSubmit(onSignInHandler)}> 
                        {
                        up? 
                            <div className='space-y-2 pt-7'>
                                <FormComp name={'email'} type={'email'} plName={'Email'} register={register} errorInfo={errors.email?.message}/>
                                        
                                <FormComp name={'username'} type={'text'} plName={'Username'} register={register} errorInfo={errors.username?.message}/>

                                <PassFormComp name={'password'} plName={'Password'} errorInfo={errors.password?.message} register={register}/>
                                <PassFormComp name={'confirmPassword'} plName={'Re-enter Password'} errorInfo={errors.confirmPassword?.message} register={register}/>

                            </div>
                            :
                            <div className='space-y-2 pt-7'>
                                <FormComp name={'email'} type={'email'} plName={'Email'} register={register} errorInfo={errors.email?.message}/>

                                <PassFormComp name={'password'} plName={'Password'} errorInfo={errors.password?.message} register={register}/>

                            </div>
                        }
                        <div className='mt-2 flex items-center space-x-2 cursor-pointer'>
                            <input type="checkbox" name="remember" id="remember " className='accent-black w-4 h-4' />
                            <h6 className='text-gray-400 text-sm font-medium'>Remember me</h6>
                        </div>


                            {/* #ffb7ce #cccccc #fff1f5 #ff00ff */}
                        <div className="buttons w-5/6 md:w-4/6 mx-auto mt-5 space-y-3 text-sm md:text-base ">
                            {message && <h6 className='text-red-500 tex-center tex-sm'>{message}</h6>}
                            <button type='submit' className='uppercase rounded-3xl tracking-wider py-1 md:py-2 font-bold  bg-[#ffb7ce] w-5/6 mx-auto'>
                                {up?'Sign up':'Sign in'}
                            </button>

                            <button 
                                className='uppercase gap-x-3 rounded-3xl tracking-wider py-1 md:py-2 font-bold bg-[#ffb7ce21] md:bg-[#ffb7ce7a] w-full'
                                disabled
                            >
                                <span className='text-base md:text-xl'><FaGoogle /></span>{up?'Sign up with google':'Sign in with google'}
                            </button>


                            <p className='font-normal text-sm md:text-base pt-9'>{up? 'Already have an account?':"Don't have an account?" }<Link to href={up?'/signin':'/'}><span onClick={()=>setUp(!up)} className='uppercase font-bold pl-2'>{up? 'Sign In': 'Sign up'}</span></Link> </p>
                        </div>
                        
                        


                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Welcome