import { useEffect } from "react"

function useSetLocalStorage(key, value) {
  return useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))
  },[value])
}

export default useSetLocalStorage