import { createContext, useEffect, useState } from "react";
import { fetchApi } from "../apis/Index";

export const ProductContextProvider = createContext(null);



const Product = ({children}) => {
    const [data, setData] = useState(null);
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
      const productApi = 'https://wittynailtip.com/backend/product.php';
      const bannerApi = 'https://wittynailtip.com/backend/banners.php';
      async function fetchData(){
        try {
        const result = await fetchApi(productApi)
        const bannerResult = await fetchApi(bannerApi)
        if (result.success && bannerResult.success){
          setData(result.data.data)
          setBannerData(bannerResult.data.data)
        } else {
            console.log(result.data.message);
            console.log(bannerResult.data.message);
        }
      } catch (error) {
          console.log(error)
      }}
      fetchData()
    }, []);


  return (
    <ProductContextProvider.Provider value={{data, bannerData}}>
        {children}
    </ProductContextProvider.Provider>
    
  )
}

export default Product