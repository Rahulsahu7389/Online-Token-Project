import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login'
import Option from './pages/Option'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Option1 from './pages/Option1'
import User from './pages/User'
import { DataProvider } from './pages/Context'
import './App.css'

function App() {
  const [refreshFlag, setrefreshFlag] = useState(0);
  const handleNewData = ()=>{
    setrefreshFlag((prev)=>prev+1);
  }


  return (
    <>
      <div className="App">
        <DataProvider>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login"/>} /> */}
          <Route path="/" element={<Option1 />} />
          <Route path="/user" element={< User/>} />
          <Route path='/token' element={<Option />} />
          <Route path="/home" element={<Home key={refreshFlag} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </DataProvider>
      </div>
    </>
  )
}

export default App
