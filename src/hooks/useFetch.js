import axios from "axios";
import { useEffect, useState } from "react"

function useFetch(query) {
    const [allData , setAllData] = useState([])
    useEffect(() => {
          const fetchData = async () => {
            const  data  = await axios.get(
              `https://hp-api.onrender.com/api/${query}`
            );
            setAllData(data.data);
          };
          fetchData();
        }, [query]);

  return {allData}
}

export default useFetch