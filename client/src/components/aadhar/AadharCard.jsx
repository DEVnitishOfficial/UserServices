import lion from '../../assets/lion govt.png'
import india_head from '../../assets/front_india_head.png'
import india_back from '../../assets/back_india_head.png'
import aadhar_hindi from '../../assets/aadharHindi.png'
import aadhar_eng from '../../assets/aadhar_eng_rm.png'
import old_phone from '../../assets/old_phone.png'
import { TfiEmail } from 'react-icons/tfi'
import { TfiWorld } from 'react-icons/tfi'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const AadharCard = () => {

  const [loading, setLoading] = useState(false)
  const [searchName, setSearchName] = useState()
  const [userDetails, setUserDetails] = useState(null)

  const handleSearch = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/aadhar/getAadhar/${searchName}`
      )
      console.log('response', response)
      console.log('data', response.data)
      setUserDetails(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching user details:', error.message)
      console.error('Error response:', error.response)
      window.alert('User not registered. Please registerd first ❌❌❌❌!!!!.')
    }
  }
  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options); // 'en-IN' for English with Indian date format
};

const dob = userDetails?.data?.DOB; 
const dobDate = new Date(dob);
const formattedDOB = `${dobDate.getDate()}/${dobDate.getMonth() + 1}/${dobDate.getFullYear()}`;





  return (
    <div className='flex flex-col  justify-center items-center'>
      <div className='print:hidden'>
      {loading ? (
        // loading
        <svg
          aria-hidden='true'
          role='status'
          className='inline w-20 h-20 mr-3 text-gray-200 animate-spin dark:text-gray-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='#1C64F2'
          />
        </svg>
      ) : (
        <div className='mb-6'>
          <label
            className='text-white text-4xl flex justify-center items-center text-center mt-5 font-bold'
            htmlFor=''
          >
            Get Aadhar By Name
          </label>
          <input
            type='text'
            id='searchName'
            className='shadow-sm bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-10 flex justify-center items-center text-center text-xl'
            placeholder='user name'
            required
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5'
          >
            Search
          </button>
          <div className='font-medium text-gray-500 dark:text-gray-300 text-xl'>
            Form Not Submitted?{' '}
            <Link
              to='/card/form'
              className='text-blue-700 hover:underline dark:text-blue-500 text-xl'
            >
              Fill form to get Aadhar
            </Link>
          </div>
        </div>
      )}
      </div>
      
      {userDetails ? (
        <div className=' flex space-x-2 '>
        {/* Front side of the aadhar */}
        <div className='flex justify-center items-center border-black border-2 rounded-sm'>
          <div className='bg-white  rounded-lg shadow-md w-[430px] h-[272px]'>
            {/* Header */}
            <div className='flex justify-between items-center p-3  '>
              <img className='h-10 ' src={lion} alt='lion' />
              <div className='flex'>
                <img className='h-9 ' src={india_head} alt='head' />
                <img
                  className='h-10 '
                  src={aadhar_hindi}
                  alt='aadhar_hindi_logo'
                />
              </div>
            </div>
            {/* Body */}
            <div className='space-y-1'>
              <div className='flex space-x-3 ml-2 '>
                <p className='text-[10px] transform origin-center -rotate-90 translate-x-[-58px] translate-y-16 absolute font-bold'>
                  {' '}
                  Aadhar no. issued: {userDetails.data?.aadharIssueDate} 
                </p>
                <img className='h-24 pl-4' src={userDetails.data?.avatar?.secure_url} alt='avatar' />
                <div className='flex flex-col space-y-1'>
                  <div className='text-[10px]'>
                    <p>{userDetails.data.hinName}</p>
                    <p>{userDetails.data.engName}</p>
                    <p>जन्म तिथि / DOB : {formattedDOB}</p>
                    {console.log('checking the male or not',userDetails.data.gender)}
                    {userDetails.data.gender === 'male' ? <p>पुरुष / {userDetails.data.gender}</p> : <p>महिला / {userDetails.data.gender}</p>  }
                    
                    
                  </div>
                  <div className=' border-2 border-red-500 w-[264px]'>
                    <p className='text-[9px]'>
                      <span className='font-bold'>
                        आधार पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं ।
                        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>{' '}
                      इसका उपयोग सत्यापन (ऑनलाइन प्रमाणीकरण, या क्यूआर कोड /
                      ऑफ़लाइन एक्सएमएल की स्कैनिंग ) के साथ किया जाना चाहिए।
                    </p>
                    <p className='text-[10px]'>
                      {' '}
                      <span className='font-bold'>
                        Aadhaar is proof of identity, not of citizenship <br />
                        or date of birth.
                      </span>{' '}
                      It should be used with verification (online
                      authentication, or scanning of QR code / offline XML).
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className='text-center mt-0'>
                <p className='font-bold'>{userDetails.data.aadharNo}</p>
                <hr className='border-t-2 border-red-600 w-full ' />
                <p className='mt-0'>
                  मेरा <span className='text-red-600'>आधार</span>, मेरी पहचान
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back side of the aadhar */}
        <div className='flex justify-center items-center'>
          <div className='bg-white shadow-md w-[430px] h-[275px] border-black border-2 rounded-lg'>
            {/* Header */}
            <div className='flex justify-between items-center p-3  '>
              <img className='h-10 ' src={lion} alt='lion' />
              <div className='flex'>
                <img className='h-9 ' src={india_back} alt='head' />
                <img
                  className='h-10 '
                  src={aadhar_eng}
                  alt='aadhar_hindi_logo'
                />
              </div>
            </div>
            {/* Body */}
            <div className='space-y-0'>
              <div className='flex w-[100%] text-[10px] px-6 -space-y-1 '>
                <p className='text-[10px] transform origin-center -rotate-90 translate-x-[-70px] translate-y-16 absolute font-bold'>
                  {' '}
                  Details as on: {formatDate(new Date())}
                </p>
                <div className='w-[60%] space-y-3 font-bold'>
                <p className="whitespace-pre-line">
                    {userDetails.data.gender === 'male' 
                    ? `पता: \n आत्मज: ${userDetails.data.hinAddress}`
                    :`पता: \n आत्मजा: ${userDetails.data.hinAddress}`}
                 </p>



                  <p>
                    
                  </p>
                  <p className="whitespace-pre-line">
                    {userDetails.data.gender === 'male' 
                    ? `Address: \n S/O: ${userDetails.data.address}`
                    :`Address: \n D/O: ${userDetails.data.address}`}
                 </p>
                </div>
                <img className='h-40 w-40' src={userDetails.data?.QRCode?.secure_url} alt='QR CODE' />
              </div>

              {/* Footer */}
              <div className='text-center'>
                <div className='mt-[2px]'>

                <p className='font-bold'>{userDetails.data.aadharNo}</p>
                <hr className='border-t-2 border-red-600 w-full ' />
                </div>

                <div className='mt-1 flex  justify-between px-4'>
                  <div className='flex justify-center items-center text-center '>
                    <img className='h-4' src={old_phone} alt='phone' />
                    <p className='text-[12px] font-bold'>1947</p>
                    <hr className='border border-solid border-black h-3 mx-3' />
                  </div>
                  <div className='flex justify-center items-center'>
                    <div className='space-x-1 flex ml-3'>
                    <TfiEmail className='h-3/5' />
                    <p className='text-[12px] font-bold'>help@uidai.gov.in</p>
                    </div>
                    <hr className='border border-solid border-black h-3 mx-5' />
                  </div>
                  <div className='flex justify-center items-center space-x-1'>
                    <TfiWorld className='h-4' />
                    <p className='text-[12px] font-bold'>www.uidai.gov.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ): null}
      
    </div>
  )
}

export default AadharCard
