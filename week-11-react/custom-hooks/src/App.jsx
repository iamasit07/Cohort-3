import "./App.css"
let currentClock;

function useDebounce(fun) {
  clearTimeout(currentClock);
  currentClock = setTimeout(fun, 30);
}

function App() {

  function sendDataToBackend() {
    fetch("");
  }

  const debounce = useDebounce(sendDataToBackend);

  return (
    <>
      <input type='text' onChange={debounce}></input>
    </>
  )
}

export default App
