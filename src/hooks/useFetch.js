import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

function useFetch(query,search) {
    const [allData , setAllData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      const controller = new AbortController()
      const signal = controller.signal

          const fetchData = async () => {
            setIsLoading(true)
           try {
            const  {data}  = await axios.get(
              `https://hp-api.onrender.com/api/${query}/?name=${search}` , {signal}
            );
            setAllData(data);

           } catch (err) {
          
             if (!axios.isCancel) {
               setAllData([])
               toast.error(err.message)
            
            }

           } finally{
              setIsLoading(false)
           }
          };
          fetchData();
          return () => {
              controller.abort();
          };
        }, [query,search]);

  return {allData , isLoading}
}

export default useFetch
