import React, { useContext, useState } from 'react'
import { CartContextProvider } from '../../context/CartContext';
import { ProductItems } from '../../Products/ProductInfo';




const CartItem = ({image, count, name, price, info, color, id}) => {
  const {addtoCart, removedItem, total} = useContext(CartContextProvider);

  const addToItem = () => {
    const cartAdd = ProductItems.filter((e)=>e.id == id);
    addtoCart(...cartAdd)   

  }

  const removeItem = (itemId) => {
      removedItem(itemId)
  }
  
  const updateTotal = (e) => {
    if (e.target.checked) {
      // Checkbox is checked, add the item's total to the list
      total.push(price * count);
    } else {
      // Checkbox is unchecked, remove the item's total from the list
      const itemTotal = price * count;
      const index = total.indexOf(itemTotal);
      if (index > -1) {
        total.splice(index, 1);
      }
    }
    console.log(total);
  }

  return (
    <div className='w-full flex items-center gap-x-3 border-b border-b-gray-300'>
      <input type="checkbox" 
          className='accent-[#ff00ff] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#ff00ff]'
          name="cart-select" id="cart-select" onChange={(e)=>updateTotal(e)}
      />
                    
      <div className='md:py-3 py-2'>
        <div className='flex items-center gap-x-3 md:gap-x-5'>
          <div className="shadow-lg w-[10em] bg-[#fff1f5] shadow-gray-300 rounded-xl">
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