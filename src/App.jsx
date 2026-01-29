import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassowrd] =useState("")
  
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback( () => 
  {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(_)~{}[]-"

    for (let i =1 ; i<= length; i++){
        let char = Math.floor(Math.random()*str.length + 1)

        pass += str.charAt(char)
    }
    setPassowrd(pass)
  }
  ,[length,numberAllowed,charAllowed,setPassowrd])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
     window.navigator.clipboard.writeText(password)
  }, [password])



  useEffect(() => {
    PasswordGenerator()
  },[numberAllowed,charAllowed,PasswordGenerator,length])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-700 py-5'>
      <div className='flex shadow rounded-lg bg-white overflow-hidden mb-4 '>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef} />
        
        <button onClick={copyPasswordToClipboard}
      className='flex flex-wrap bg-blue-600 rounded-lg px-2 py-1 conten-ce  text-white'>copy</button>
      </div>


      <div className='flex text-sm gap-x-2 '>
        <div className='flex flex-wrap text-orange-300 '>
        <input type="range"
        value={length}
        className='cursor-pointer'
        min={8}
        max={50}
        onChange={(e) => {setlength(e.target.value)}} />
        <label htmlFor='numberInput'>length:{length}</label>
      </div>
      <div className='flex flex-wrap text-orange-300'>
        <input
         type="checkbox" 
        defaultChecked={numberAllowed}
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }}/><label >Numbeers</label>
        
      </div>
      <div className='flex flex-wrap text-orange-300'>
        
        <input
         type="checkbox" 
        defaultChecked={charAllowed}
        id="charcterInput"
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}/><label htmlFor='characterInput'>character</label>
      </div>
      </div>
     </div>
    </>
  )
}

export default App
