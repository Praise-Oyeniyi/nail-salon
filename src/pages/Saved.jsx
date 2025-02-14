import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SavedItem from '../components/Cart/SavedItem';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { CartContextProvider } from '../context/CartContext';

const Saved = () => {
    const {savedItems} = useContext(CartContextProvider);
    const [load, setLoad] = useState(false)

    useEffect(() => {
      if (savedItems) {
          setLoad(true)
      }
  }, [savedItems])
    
    const deleteSaved = ()=> {
        fetch('https://wittynailtip.com/backend/empty-fav.php', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {console.log(data); window.location.reload()})
        .catch(error => console.error('Error Deleting saved:', error));
    }

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
               {load?
                savedItems?.map((e, index)=>(
                    <div key={index}>
                        <SavedItem price={e?.prices[0].unit_amount} id={e?.id} info={e?.description} name={e?.name} color={e?.color} image={e?.images[0]} item={e}/>
                    </div>
                ))
                :
                <Loader what={"Your saved items are"}/>
                }
            </div>


        </div>
        <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
            <div className='md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10'>
                {savedItems?.length >0? 
                    <button className='bg-red-500 flex justify-center items-center rounded-2xl cursor-pointer px-3 py-1' 
                        onClick={()=>deleteSaved()}>Delete All Saved Items</button> 
                :!savedItems?
                (
                    <h3 className='flex justify-center items-center gap-x-2 italic'>You have no saved item. Please <Link to='/'><span className='text-[#ff00ff] cursor-pointer font-semibold'>login</span></Link> and check again!</h3>
                )
                :
                    <h3 className='italic'>You have not saved any item</h3>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Saved