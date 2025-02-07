import React, { useContext, useEffect, useState } from 'react'
import SavedItem from '../components/Cart/SavedItem';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { CartContextProvider } from '../context/CartContext';

const Saved = () => {
    const {cart, saved, setSaved} = useContext(CartContextProvider);
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetch('https://wittynailtip.com/backend/fav.php', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setSaved(data.data);
            setLoad(true); 
          })
          .catch(error => console.error('Error fetching saved:', error));
      }, []);
    
    
    // const savedFilter = cart.filter((item)=> item.id === saved.id);

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
               {load?
                saved.map((e, index)=>(
                    <div key={index}>
                        <SavedItem price={e?.prices[0].unit_amount} id={e?.id} info={e?.description} name={e?.name} color={e?.color} image={e?.images[0]} item={e}/>
                    </div>
                ))
                    :
                    <Loader what={"Your saved items are loading"}/>
                }
            </div>


        </div>
    </div>
  )
}

export default Saved