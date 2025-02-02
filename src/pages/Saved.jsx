import React, { useContext } from 'react'
import SavedItem from '../components/Cart/SavedItem';
import Navbar from '../components/Navbar';
import { CartContextProvider } from '../context/CartContext';

const Saved = () => {
    const {cart, saved, getSaved} = useContext(CartContextProvider);

    
    getSaved();
    const savedFilter = cart.filter((item)=> item.id === saved);
    

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
                {savedFilter.map((e, index)=>(
                    <div key={index}>
                        <SavedItem price={e.prices[0].unit_amount} id={e.id} info={e.description} name={e.name} color={e.color} image={e.images[0]} item={e}/>
                    </div>
                ))}
            </div>


        </div>
    </div>
  )
}

export default Saved