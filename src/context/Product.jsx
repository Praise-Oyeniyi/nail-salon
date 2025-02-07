import { createContext, useEffect, useState } from "react";

export const ProductContextProvider = createContext(null);



const Product = ({children}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://wittynailtip.com/backend/product.php')
        .then(response => response.json())
        .then(data => setData(data.data))
        .catch(error => console.error('Error fetching Product:', error));
    }, []);


  return (
    <ProductContextProvider.Provider value={{data}}>
        {children}
    </ProductContextProvider.Provider>
    
  )
}

export default Product