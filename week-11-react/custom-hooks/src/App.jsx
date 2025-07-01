import { useEffect, useState } from "react";
import "./App.css"
import useDebounce from "./hooks/useDebounce"

function App() {
  const [inputVal, setInputVal] = useState("");
  const debounce = useDebounce(inputVal, 200);

  function change(e) {
    setInputVal(e.target.value);
  }

  useEffect(() => {
    console.log("expensive opperation");
  }, [debounce]);

  return (
    <>
      <input type='text' onChange={change}></input>
    </>
  )
}

export default App