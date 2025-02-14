import {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate } from 'react-router-dom';
import ProfileLoader from '../components/ProfileLoader';

const EditProfile = () => {
  const [side, setSide] = useState(false);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false)
  const [load, setLoad] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetch('https://wittynailtip.com/backend/profile.php', {
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      setUser(data.data)
      setLoad(true); 
    })
    .catch(error => {
      console.error('Error fetching profile:', error)
      setUser(null)
    });
  }, []);

  const UpdateProfile = (e) =>{
    setUpdate(true)
    e.preventDefault()
    const full_name = e.target.name.value;
    const username = user?.username;
    const phone_number = e.target.phone.value;
    const email = user?.email;
    const billing_address = e.target.address.value;


    const updatedProfile = {"name":full_name, "username":username, "number":phone_number, "email":email, "billing":billing_address}
    fetch('https://wittynailtip.com/backend/edit-profile.php', {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedProfile)
    })
      .then(response => response.json())
      .then(data => {console.log(data); alert(data.message); setUpdate(false)})
      .catch(error => console.error('Error saving updates:', error));
  }

  const Logout = () =>{
    fetch('https://wittynailtip.com/backend/logout.php', 
    {
      credentials: 'include', 
      headers: {
        'Accept': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {alert(data.message); window.reload()})
      .catch(error => console.error('Error Logging Out', error));
  }


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
      <div className='profile-outer w-full md:py-7 py-3 px-5 mx-auto lg:ml-[25%] z-[999]'>
        {!load?
          <ProfileLoader/>
          :
          user ===null || user === undefined || user?.status === 'error'?
            <div className='flex items-center justify-center h-screen w-full'>
              {load && <h3 className='flex justify-start items-center gap-x-2 italic'>You are not logged in. Please <Link to='/'><span className='text-[#ff00ff] cursor-pointer font-semibold'>login</span></Link> to view your profile</h3>}
            </div>
            :
          <div className="profile-inner space-y-3">
            <h3 className='font-semibold md:text-2xl text-lg'>Profile Picture</h3>
            <div className="pic-btn flex space-x-7">
              <div className="img-box rounded-full h-32 w-32 overflow-hidden bg-[#ffb7ce] flex justify-center items-center flex-shrink-0">
                <FaUser className='text-5xl '/>
              </div>
            
                <div className="btn flex md:flex-row flex-col justify-center gap-y-2 md:justify-start items-center md:space-x-3 text-white font-medium">
                  {/* <button className='bg-[#ffb7ce] p-2 px-3 rounded-full text-base'>
                    Change Picture
                  </button>
                  <button className='bg-[#ff00ff] p-2 px-3 rounded-full text-base'>
                    Delete Picture
                  </button> */}
                  <button className='bg-[#ff00ff] p-2 px-3 rounded-full text-base' onClick={()=>setEdit(true)}>
                    Edit Profile
                  </button>
                </div>
            </div>

            {/* #ffb7ce #cccccc #fff1f5 #ff00ff */}
              <div className="profile-form">
                <form action="" className="profile-details space-y-5 md:w-4/6 w-full mx-auto md:mx-0" onSubmit={(e)=>UpdateProfile(e)}>
                  <div className="profile-name">
                    <label htmlFor="name" className='block text-[#5f5f5f] font-semibold text-base'>FullName</label>
                    <input disabled={!edit && true} type="text" name="name" id="name" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.full_name} />
                  </div>

                  <div className="profile-uname">
                    <label htmlFor="uname" className='block text-[#5f5f5f] font-semibold text-base'>Username</label>
                    <input disabled type="text" name="uname" id="uname" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.username} />
                    <i className='text-[#cccccc] text-xs pl-3 font-medium'>Available change in 05/30</i>
                  </div>

                  <div className="profile-address">
                    <label htmlFor="address" className='block text-[#5f5f5f] font-semibold text-base'>Billing Address</label>
                    <input disabled={!edit && true} type="text" name="address" id="address" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.billing_address}  />
                  </div>

                  <div className="profile-email">
                    <label htmlFor="email" className='block text-[#5f5f5f] font-semibold text-base'>Email</label>
                    <input disabled type="text" name="email" id="email" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.email}  />
                  </div>
                  

                  <div className="profile-phone">
                    <label htmlFor="phone" className='block text-[#5f5f5f] font-semibold text-base'>Phone No</label>
                    <input disabled={!edit && true} type="text" name="phone" id="phone" className='h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder' placeholder={user.phone_number}  />
                  </div>

                  <div className="submit-btns pt-3 flex justify-start items-center space-x-3 text-white font-medium">
                    {edit?
                      <button className='bg-[#ffb7ce] p-2 px-3 rounded-full text-sm flex gap-x-2 items-center justify-center'>
                        Update Profile
                        <AiOutlineLoading3Quarters className={`animate-spin ${update? 'block':'hidden'}`}/>
                      </button>
                    :
                      <>
                        <button className='bg-[#ffb7ce] p-2 px-3 rounded-full text-sm'>
                          Reset Password
                        </button>
                        <button className='bg-[#ff00ff] p-2 px-3 rounded-full text-sm' onClick={()=>Logout()}>
                          Logout
                        </button>
                      </>
                      
                    }
                  </div>
                </form>
            </div>
        </div>}

      </div>

        






    </div>
  )
}

export default EditProfile