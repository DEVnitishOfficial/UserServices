import { useNavigate } from 'react-router-dom'
import '../App.css'

const MainPage = () => {
  const navigate = useNavigate()
  return (
    <div className='text-white w-full min-h-screen flex flex-col mt-[-200px] justify-center items-center text-center'>
      <div className='mt-10 flex  justify-center items-center text-center w-full'>
        <h1 className='text-5xl custom_animation rotation_animation'>
          USER SERVICES
        </h1>
      </div>

      <div className='flex justify-between items-center text-center mt-[50px] p-4 text-3xl w-[800px] '>
        <button
          onClick={() => navigate('/submitForm')}
          className='bg-yellow-500 p-4 rounded-md'
        >
          Register User
        </button>
        <button
          onClick={() => navigate('/card/form')}
          className='bg-green-500 p-4 rounded-md'
        >
          Print Aadhar
        </button>
        <button
          onClick={() => navigate('/getUser')}
          className='bg-blue-500 p-4 rounded-md'
        >
          Get User Information
        </button>
      </div>
    </div>
  )
}

export default MainPage
