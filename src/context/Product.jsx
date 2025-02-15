import { createContext, useEffect, useState } from "react";
import { fetchApi } from "../apis/Index";

export const ProductContextProvider = createContext(null);



const Product = ({children}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const productApi = 'https://wittynailtip.com/backend/product.php';
      async function fetchData(){
        try {
        const result = await fetchApi(productApi)
        if (result.success){
          setData(result.data.data)
        } else {
            console.log(result.data.message);
        }
      } catch (error) {
          console.log(error)
      }}
      fetchData()
    }, []);


  return (
    <ProductContextProvider.Provider value={{data}}>
        {children}
    </ProductContextProvider.Provider>
    
  )
}

export default Product