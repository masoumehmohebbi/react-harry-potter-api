import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

function useFetch(query) {
    const [allData , setAllData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      const controller = new AbortController()
      const signal = controller.signal

          const fetchData = async () => {
            setIsLoading(true)
           try {
            const  {data}  = await axios.get(
              `https://hp-api.onrender.com/api/${query}` , {signal}
            );
            setAllData(data);

           } catch (err) {
          
            toast.error(err.message)
            if (!axios.isCancel) {
              setAllData([])
            
            }

           } finally{
              setIsLoading(false)
           }
          };
          fetchData();
        }, [query]);

  return {allData , isLoading}
}

export default useFetch