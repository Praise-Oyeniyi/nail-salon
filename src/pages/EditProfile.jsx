import {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';


const EditProfile = () => {
  const [side, setSide] = useState(false);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    fetch('https://wittynailtip.com/backend/profile.php', {
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => setUser(data.data))
    .catch(error => console.error('Error fetching profile:', error));
  }, []);

    console.log(user)


  return (
    <div className='w-full md:flex justify-start items-start overflow-x-hidden '>
      <div className='px-3 h-14 flex justify-between items-center lg:hidden'>
          <div className='cursor-pointer p-2' onClick={()=>setSide(!side)}>
              <div className='w-5 h-1 bg-black mb-[2px]'></div>
              <div className='w-5 h-1 bg-[#ff00ff] ml-1'></div>
          </div>
      </div>
      <div className='hidden lg:block'>    
          <Sidebar open={true}/>
      </div>
      <div className=''>
          <Sidebar open={side}/>
      </div>

      {/* #ffb7ce #cccccc #fff1f5 #ff00ff */}
      <div className='profile-outer w-full md:py-7 py-3 px-5 mx-auto lg:ml-[25%] z-[99999]'>
        <div className="profile-inner space-y-3">


          <h3 className='font-semibold md:text-2xl text-lg'>Profile Picture</h3>
          <div className="pic-btn flex space-x-7">
            <div className="img-box rounded-full h-32 w-32 overflow-hidden bg-[#ffb7ce] flex justify-center items-center">
              <FaUser className='text-5xl '/>
            </div>
            {user ===null || user?.status === 'error'?
              <div className='flex items-center h-auto'>
                <h3>You are not logged in. Please log in to view your profile</h3>
              </div>
              :
              <div className="btn flex md:flex-row flex-col justify-center gap-y-2 md:justify-start items-center md:space-x-3 text-white font-medium">
                <button className='bg-[#ffb7ce] p-2 px-3 rounded-full text-base'>
                  Change Picture
                </button>
                <button className='bg-[#ff00ff] p-2 px-3 rounded-full text-base'>
                  Delete Picture
                </button>
              </div>
            }
          </div>

          {/* #ffb7ce #cccccc #fff1f5 #ff00ff */}
          <div className="profile-form">
            {user ===null || user?.status === 'error'?
              <div className='flex w-full justify-center'>
                <Link className='items-center bg-[#ff00ff] p-2 px-5 cursor-pointer rounded-full text-base text-white tracking-wider font-semibold' to='/'><button>Log In</button></Link>
                
              </div>
              :
              <form action="" className="profile-details space-y-5 md:w-4/6 w-full mx-auto md:mx-0">
                <div className="profile-name">
                  <label htmlFor="name" className='block text-[#5f5f5f] font-semibold text-base'>FullName</label>
                  <input disabled type="text" name="name" id="name" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.full_name} />
                </div>

                <div className="profile-uname">
                  <label htmlFor="uname" className='block text-[#5f5f5f] font-semibold text-base'>Username</label>
                  <input disabled type="text" name="uname" id="uname" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.username} />
                  <i className='text-[#cccccc] text-xs pl-3 font-medium'>Available change in 05/30</i>
                </div>

                <div className="profile-address">
                  <label htmlFor="address" className='block text-[#5f5f5f] font-semibold text-base'>Billing Address</label>
                  <input disabled type="text" name="address" id="address" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.billing_address}  />
                </div>

                <div className="profile-email">
                  <label htmlFor="email" className='block text-[#5f5f5f] font-semibold text-base'>Email</label>
                  <input disabled type="text" name="email" id="email" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.email}  />
                </div>
                

                <div className="profile-phone">
                  <label htmlFor="phone" className='block text-[#5f5f5f] font-semibold text-base'>Phone No</label>
                  <input disabled type="text" name="phone" id="phone" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.phone_number}  />
                </div>

                <div className="submit-btns pt-3 flex justify-start items-center space-x-3 text-white font-medium">
                  <button className='bg-[#ffb7ce] p-2 px-3 rounded-full text-sm'>
                      Reset Password
                    </button>
                    <button className='bg-[#ff00ff] p-2 px-3 rounded-full text-sm'>
                      Delete Account
                    </button>
                </div>
              </form>
            }
          </div>
        </div>

      </div>

        






    </div>
  )
}

export default EditProfile