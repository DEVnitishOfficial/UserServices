import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import axios from 'axios'

function SignUp () {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState('')

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    mobileNo: '',
    whatsAppNumber: '',
    panNo: '',
    aadharNo: '',
    caste: '',
    address: '',
    gender: '',
    avatar: ''
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
    formData.append('fullName', userData.fullName)
    formData.append('email', userData.email)
    formData.append('dateOfBirth', userData.dateOfBirth)
    formData.append('fatherName', userData.fatherName)
    formData.append('motherName', userData.motherName)
    formData.append('mobileNo', userData.mobileNo)
    formData.append('whatsAppNumber', userData.whatsAppNumber)
    formData.append('panNo', userData.panNo)
    formData.append('aadharNo', userData.aadharNo)
    formData.append('caste', userData.caste)
    formData.append('address', userData.address)
    formData.append('gender', userData.gender)
    // Append file
    formData.append('avatar', userData.avatar)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/submitForm',
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
        navigate('/getUser')
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
          Registration Form
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

        <div className='flex space-x-32 max-[400px]:flex-col  max-[400px]:space-x-0 px-10 max-[400px]:px-0 '>
          {/* Personal Information Section */}
          <div className='mb-6'>
            <h6 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
              Personal Information
            </h6>

            {/* your name  */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your Name
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                required
                value={userData.fullName}
                onChange={e =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
            </div>

            {/** email */}
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Email
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='E-mail'
                value={userData.email}
                onChange={e =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            {/** date of birth */}
            <div className='mb-6'>
              <label
                htmlFor='dateOfBirth'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                D.O.B
              </label>
              <input
                type='date'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='01/01/1999'
                value={userData.dateOfBirth}
                onChange={e =>
                  setUserData({ ...userData, dateOfBirth: e.target.value })
                }
              />
            </div>
            {/** Gender */}
            <div className='mb-6'>
              <label
                htmlFor='gender'
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

            {/** Father name */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Father Name
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='jhon'
                value={userData.fatherName}
                onChange={e =>
                  setUserData({ ...userData, fatherName: e.target.value })
                }
              />
            </div>

            {/** Mother name */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Mother Name
              </label>
              <input
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='Meera'
                value={userData.motherName}
                onChange={e =>
                  setUserData({ ...userData, motherName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className='mb-6'>
            <h6 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
              Contact Information
            </h6>

            {/** Mobile No. */}
            <div className='mb-6 '>
              <label
                htmlFor='mobileno'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Mobile No.
              </label>
              <input
                type='Number'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                value={userData.mobileNo}
                onChange={e =>
                  setUserData({ ...userData, mobileNo: e.target.value })
                }
              />
            </div>

            {/** WhatsApp No. */}
            <div className='mb-6'>
              <label
                htmlFor='whatsAppNumber'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                WhatsApp No.
              </label>
              <input
                type='Number'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                value={userData.whatsAppNumber}
                onChange={e =>
                  setUserData({ ...userData, whatsAppNumber: e.target.value })
                }
              />
            </div>

            {/** Pan No. */}
            <div className='mb-6'>
              <label
                htmlFor='panNumber'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                PAN No.
              </label>
              <input
                type='text'
                id='panNumber'
                pattern='[A-Z]{5}[0-9]{4}[A-Z]{1}'
                title='Enter a valid PAN number (e.g., ABCDE1234F)'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                value={userData.panNo}
                onChange={e =>
                  setUserData({ ...userData, panNo: e.target.value })
                }
              />
            </div>

            {/** Aadhar No. */}
            <div className='mb-6'>
              <label
                htmlFor='aadharNumber'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Aadhar No.
              </label>
              <input
                type='text'
                id='aadharNumber'
                pattern='[0-9]{12}'
                title='Enter a valid 12-digit Aadhar number'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='1254-6521-3620'
                value={userData.aadharNo}
                onChange={e =>
                  setUserData({ ...userData, aadharNo: e.target.value })
                }
              />
            </div>

            {/** caste */}
            <div className='mb-6'>
              <label
                htmlFor='caste'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Caste
              </label>
              <input
                type='text'
                id='caste' // Set a specific ID for the input
                list='casteOptions' // Match the ID of the datalist
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='Enter your caste'
                value={userData.caste}
                onChange={e =>
                  setUserData({ ...userData, caste: e.target.value })
                }
              />
              <datalist id='casteOptions'>
                {' '}
                {/* Match the ID of the datalist with the input's list attribute */}
                <option value='Yadav' />
                <option value='Kushwaha (Koeri)' />
                <option value='Kurmi' />
                <option value='Brahmin' />
                <option value='Teli' />
                <option value='Bania' />
                <option value='Bhumihar' />
                <option value='Rajput' />
                <option value='Ravidas' />
                <option value='Musahar' />
                <option value='BC-1' />
                <option value='BC-11' />
              </datalist>
            </div>

            {/** Address */}
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Address
              </label>
              <textarea
                type='text'
                id=''
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                placeholder='user name'
                value={userData.address}
                onChange={e =>
                  setUserData({ ...userData, address: e.target.value })
                }
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

        {/* get user details if already exist */}
        <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
          User already exist?{' '}
          <Link
            to='/getUser'
            className='text-blue-700 hover:underline dark:text-blue-500'
          >
            Find User Details
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
