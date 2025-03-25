import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pass, setPass] = useState("");
  const [count, setCount] = useState(8);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);

  useEffect(() => {
    setPass(generatePassword(count, number, specialChar));
  }, [count, number, specialChar]);

  //-----------------------------------------------------------
  function generatePassword(n, num, sc) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) chars += "0123456789";
    if (sc) chars += "!@#$%^&*()_+";

    let password = "";
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }
  //-------------------------------------------------------------------

  function handleClick(e) {
    e.preventDefault();
    window.navigator.clipboard.writeText(pass);
    alert("Password Copied!!!");
  }

  function handleRange(e) {
    setPass(generatePassword(e.target.value, number, specialChar));
    setCount(e.target.value);
  }
  function handleSpecialChar(e) {
    setPass(generatePassword(count, number, e.target.checked));
    setSpecialChar(e.target.checked);
  }
  function handleNumber(e) {
    setPass(generatePassword(count, e.target.checked, specialChar));
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
