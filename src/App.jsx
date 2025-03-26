import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [pass, setPass] = useState("");
  const [count, setCount] = useState(8);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);
  const passwordRef = useRef(null);

  //-----------------------------------------------------------
  const generatePassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (specialChar) chars += "!@#$%^&*()_+";

    let password = "";
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    setPass(password);
  }, [count, number, specialChar, setPass]);
  //-------------------------------------------------------------------

  useEffect(() => {
    generatePassword();
  }, [count, number, specialChar, generatePassword]);

  function handleSelectCopy(e) {
    e.preventDefault();
    passwordRef.current?.select();
    window.navigator.clipboard
      .writeText(pass)
      .then(() => {
        const CopyButton = document.getElementById("CopyButton");
        CopyButton.innerText="Copied✅"
        CopyButton.classList.add("pop-up"); 

        setTimeout(() => {
          CopyButton.innerText="Copy";
          CopyButton.classList.remove("pop-up"); 
        }, 2500);
        // alert("password Copied!!!");
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
        alert("Failed to copy password. Please try again.");
      });
  }

  return (
    <>
      <div className="main-box py-10">
        <div className="text-white text-5xl font-mono text-center font-bold">
          Password Generator
        </div>
        <form className="bg-blue-950 py-5 px-9">
          <div className="flex">
            <input type="text" value={pass} readOnly ref={passwordRef} />
            <button id="CopyButton" className="" onClick={handleSelectCopy}>
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
                onChange={(e) => {
                  setCount(e.target.value);
                }}
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
                onChange={(e) => {
                  setNumber(e.target.checked);
                }}
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
                onChange={(e) => {
                  setSpecialChar(e.target.checked);
                }}
              />
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
