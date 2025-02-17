import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.webp'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-[#1C1B1C] text-white'>
        <div className='w-[90%] mx-auto py-5 md:py-20
        grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6'>

          <div className="logo h-12 w-12 bg-black rounded-full overflow-hidden">
            <Link to="/"><img src={Logo} alt="" className='w-full'/></Link>
          </div>

          <div>
            <h4 className='font-semibold text-lg mt-3'>Quick Links</h4>
            <ul className='mt-2 text-sm md:text-base flex flex-col gap-4 '>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/#products-section'>Products</Link></li>
              <li><Link to='/edit-profile'>Profile</Link></li>
              <li><Link to='/cart'>Cart</Link></li>
            </ul>
          </div>

          <div className='flex flex-col gap-4'>
            <h4 className='font-semibold text-lg mt-3'>Contact Us</h4>
            <p className='text-sm md:text-base'>Houston, TX, USA.</p>
            <p>
              <Link to='mailto:info@wittynailtip.com'>
              info@wittynailtip.com</Link>
            </p>
            <p>
              <Link to='tel:+18326774026'>+1 (832) 677-4026</Link>
            </p>
          </div>

          <div>
            <div className='mt-2 flex gap-4 md:gap-5 lg:gap-7'>
              <div><FaFacebook size={24}/> </div>
              <div><FaTwitter size={24}/></div>
              <Link 
              target='_blank'
              to='https://www.instagram.com/wittynailtips?igsh=MW12anV0dmE2NXR3Yg=='>
              <FaInstagram size={24}/></Link>
            </div>
          </div>

        </div>

        <div className='w-full h-px bg-gray-700'/>
        <div>
          <p className='text-center text-sm py-5 text-white/50'>
          &copy; {currentYear} Witty Nails. All Rights Reserved.
          </p>
        </div>
    </footer>
  )
}

export default FooterSection