import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [pass, setPass] = useState("");
  const [count, setCount] = useState(8);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);

  
  //-----------------------------------------------------------
  const generatePassword = useCallback(()=>{
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (specialChar) chars += "!@#$%^&*()_+";
    
    let password = "";
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    setPass(password);
  },[count,number,specialChar,setPass]);
  //-------------------------------------------------------------------

  useEffect(() => {
    generatePassword(count, number, specialChar);
  }, [count, number, specialChar,generatePassword]);

  function handleClick(e) {
    e.preventDefault();
    window.navigator.clipboard.writeText(pass);
    alert("Password Copied!!!");
  }

  function handleRange(e) {
    setCount(e.target.value);
  }
  function handleSpecialChar(e) {
    setSpecialChar(e.target.checked);
  }
  function handleNumber(e) {
    setNumber(e.target.checked);
  }

  return (
    <>
      <div className="main-box py-10">
        <div className="text-white text-5xl font-mono text-center font-bold">
          Password Generator
        </div>
        <form className="bg-blue-950 py-5 px-9">
          <div className="flex">
            <input 
            type="text" 
            value={pass} 
            readOnly
            />
            <button className="" onClick={handleClick}>
              Copy
            </button>
          </div>
          <div className="flex justify-evenly control">
            <span>
              <label htmlFor="">length ({count})</label>
              <input
                className="cursor-pointer"
                type="range"
                name="length"
                id="length"
                min={8}
                max={32}
                value={count}
                onChange={handleRange}
              />
            </span>

            <span>
              <label htmlFor="Number">Number </label>
              <input
                className="cursor-pointer"
                type="checkbox"
                name="Number"
                id="Number"
                checked={number}
                onChange={handleNumber}
              />
            </span>

            <span>
              <label htmlFor="special-character">Special-Character </label>
              <input
                className="cursor-pointer"
                type="checkbox"
                name="special-character"
                id="special-character"
                checked={specialChar}
                onChange={handleSpecialChar}
              />
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
