import React from 'react'
import Welcome from './Welcome'


// #ffb7ce #cccccc #fff1f5 #ff00ff
const SignUp = () => {
    const value = true;
  return (
    <div className='bg-[#fff1f5] w-full h-full overflow-hidden max-h-screen'>
        <Welcome uporin={value}/>
    </div>
  )
}

export default SignUp