
import './App.css'
import AadharCard from './components/aadhar/AadharCard'
import AadharForm from './components/aadhar/AadharForm'
import Home from './components/Home'
import MainPage from './components/MainPage'
import SignUp from './components/SignUp'
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
   <div className="flex justify-center items-center ">
    <Routes>
      <Route path="/submitForm" element={<SignUp />} />
      <Route path="/getUser" element={<Home />} />
      <Route path="/card" element={<AadharCard />} />
      <Route path="/card/form" element={<AadharForm />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
    
   </div>
  )
}

export default App
