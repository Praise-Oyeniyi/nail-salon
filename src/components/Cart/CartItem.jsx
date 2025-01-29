import React, { useContext, useState } from 'react'
import { CartContextProvider } from '../../context/CartContext';
import { ProductContextProvider } from '../../context/Product';




const CartItem = ({image, count, name, price, info, color, id}) => {
  const {data} = useContext(ProductContextProvider)
  const {addtoCart, removedItem, total, setSum, setTotal} = useContext(CartContextProvider);

  const addToItem = () => {
    const cartAdd = data.filter((e)=>e?.id === id);
    console.log(...cartAdd)
    addtoCart(...cartAdd)   
    
  }

  const removeItem = (itemId) => {
      removedItem(itemId)
  }
  

 
  const updateTotal = (e) => {
    if (e.target.checked) {
      // Checkbox is checked, add the item's total to the list
      setTotal([...total, price * count]);
      // setSum(total.reduce((a, b) => a + b, 0))
    } else {
      // Checkbox is unchecked, remove the item's total from the list
      const itemTotal = price * count;
      const index = total.indexOf(itemTotal);
      if (index > -1) {
        total.splice(index, 1);
        setTotal([...total])
      }
      // setSum(total.reduce((a, b) => a + b, 0))

    }
  }

  return (
    <div className='w-full flex items-center gap-x-3 border-b border-b-gray-300'>
      <input type="checkbox" 
          className='accent-[#ff00ff] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#ff00ff]'
          name="cart-select" id="cart-select" onChange={(e)=>updateTotal(e)}
      />
                    
      <div className='md:py-3 py-2'>
        <div className='flex items-center gap-x-3 md:gap-x-5'>
          <div className="shadow-lg w-[10em] bg-[#fff1f5] shadow-gray-300 rounded-xl overflow-hidden">
            <img src={image} alt="" className='w-full'/>
          </div>

          <div className='md:space-y-1'>
            <h4 className='md:text-xl text-lg font-bold'>{name}</h4>
            <p className='md:text-base text-sm text-gray-700 leading-tight md:leading-normal tracking-tight lg:tracking-normal'>{info}</p>
            <p className='cursor-pointer my-1 md:my-0 color w-fit text-sm  px-2 rounded-xl shadow-sm shadow-gray-400'>{color}</p>
            <div className='flex gap-x-3 items-center'>
              <h5 className='md:text-xl text-lg font-bold'>${price}</h5>
              <div className='font-bold text-base bg-[#fff1f5] flex rounded-2xl items-center gap-x-5 px-3 py-1'>
                  <button onClick={()=>removeItem(id)}>-</button>
                  <h3>{count}</h3>
                  <button onClick={()=>addToItem()}>+</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default CartItem