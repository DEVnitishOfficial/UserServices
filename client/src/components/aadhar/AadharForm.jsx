import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AadharForm = () => {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    hinName: '',
    engName: '',
    DOB: '',
    gender: '',
    aadharNo: '',
    address: '',
    hinAddress:'',
    aadharIssueDate:'',
  })

  function getImage (event) {
    event.preventDefault()
    // getting the image
    const uploadImage = event.target.files[0]
    console.log('uploadImage>>>', uploadImage)

    if (uploadImage) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(uploadImage)
      fileReader.addEventListener('load', function () {
        setPreviewImage(this.result)
      })

      // Store file in separate state
      setUserData({
        ...userData,
        avatar: uploadImage
      })
    }
  }

  async function handleSignUp (e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()

    // Append form data
    formData.append('hinName', userData.hinName)
    formData.append('engName', userData.engName)
    formData.append('DOB', userData.DOB)
    formData.append('gender', userData.gender)
    formData.append('aadharNo', userData.aadharNo)
    formData.append('address', userData.address)
    formData.append('hinAddress', userData.hinAddress)
    formData.append('aadharIssueDate', userData.aadharIssueDate)
    // Append file
    formData.append('avatar', userData.avatar)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/aadhar/submitAadharForm',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('response>>', response)

      if (response.data.success) {
        alert('Data successfully saved !!!')
        navigate('/card')
      }
      setLoading(false)
    } catch (error) {
      alert(error.response.message)
      console.log(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='w-auto p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 m-4 '>
      <form className='space-y-6 ' onSubmit={e => handleSignUp(e)}>

      
      <h5 className='text-xl font-medium text-gray-900 dark:text-white flex justify-center'>
        Fill Form To Get Aadhar
      </h5>

       {/* Upload image */}
       <div className='text-white text-center'>
          <label htmlFor='image_uploads' className='cursor-pointer'>
            {previewImage ? (
              <img
                className='h-24 w-24 rounded-full m-auto'
                src={previewImage}
                alt='profileImage'
              />
            ) : (
              <BsPersonCircle className=' h-24 w-24 rounded-full m-auto' />
            )}
          </label>
          <input
            onChange={getImage}
            type='file'
            name='image_uploads'
            id='image-upload'
            accept='.jpg, .jpeg, .png, .svg,'
          />
        </div>

      <div className='flex space-x-32 mt-10 max-[400px]:flex-col  max-[400px]:space-x-0 px-10 max-[400px]:px-0 '>

        {/* Aadhar front info */}
        <div>
          
          <h6 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
             Aadhar Front
            </h6>


            
            {/* your name in english  */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
              Name
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                required
                value={userData.engName}
                onChange={e =>
                  setUserData({ ...userData, engName: e.target.value })
                }
              />
            </div>


            {/* your name in hindi  */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                नाम
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                required
                value={userData.hinName}
                onChange={e =>
                  setUserData({ ...userData, hinName: e.target.value })
                }
              />
            </div>

            {/* DOB  */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
               जन्म तिथि / DOB :
              </label>
              <input
                type='date'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                required
                value={userData.DOB}
                onChange={e =>
                  setUserData({ ...userData, DOB: e.target.value })
                }
              />
            </div>

            {/* Gender */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
               Gender
              </label>
              <select
                id='gender'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                value={userData.gender}
                onChange={e =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value='' disabled>
                  Select your gender
                </option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='transgender'>Transgender</option>
              </select>
            </div>
        </div>

       {/* Aadhar back info */}
        <div>
        <h6 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
             Aadhar Back
            </h6>

            {/* your address  */}
            <div className='mb-6'>
              <label
                htmlFor='engAddress'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Address
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='address in english'
                required
                value={userData.address}
                onChange={e =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />
            </div>

            {/* your address in hindi  */}
            <div className='mb-6'>
              <label
                htmlFor='hinAddress'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                पता
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='address in hindi'
                required
                value={userData.hinAddress}
                onChange={e =>
                  setUserData({ ...userData, hinAddress: e.target.value })
                }
              />
            </div>

                {/* aadhar issue date */}
            <div className='mb-6'>
              <label
                htmlFor='aadharIssueDate'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Aadhar issue date
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='02/04/2006'
                required
                value={userData.aadharIssueDate}
                onChange={e =>
                  setUserData({ ...userData, aadharIssueDate: e.target.value })
                }
              />
            </div>

            {/* your aadhar no.  */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Aadhar No.
              </label>
              <input
                type='text'
                id='aadharNo'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='12 digit Aadhar no.'
                required
                value={userData.aadharNo}
                onChange={e => {
                let inputNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                inputNumber = inputNumber.slice(0, 12); // Limit input to 12 digits
                let formatted = '';

                // Format the number into groups of 4 digits
                for (let i = 0; i < inputNumber.length; i++) {
                if (i % 4 === 0 && i !== 0) {
                formatted += ' '; // Add a space after every 4 digits
                }
                formatted += inputNumber[i];
                }

                setUserData({ ...userData, aadharNo: formatted });
                }}
              />

            </div>
        </div>

      </div>
       {/*  signUp button */}
       <button
          type='submit'
          className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
          {loading ? (
            <svg
              aria-hidden='true'
              role='status'
              className='inline w-4 h-4 mr-3 text-white animate-spin ml-2'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='#E5E7EB'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentColor'
              />
            </svg>
          ) : null}
        </button>
        <Link to={'/card'} className='text-blue-700 hover:underline dark:text-blue-500 text-xl'>Already user exist</Link>
      </form>

    </div>
  )
}

export default AadharForm
