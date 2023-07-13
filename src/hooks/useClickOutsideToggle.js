import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
/* Toggles the navbar when user clicks outside or link */
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)){
        setExpanded(false)
      }
    }
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref])
  
    return { expanded, setExpanded, ref};

}

export default useClickOutsideToggle