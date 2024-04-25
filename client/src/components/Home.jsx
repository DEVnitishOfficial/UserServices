import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home () {
  const [loading, setLoading] = useState(false)
  const [searchName, setSearchName] = useState()
  const [userDetails, setUserDetails] = useState(null)

  console.log('serachName>>>>',searchName)

  const handleSearch = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/getUser/${searchName}`
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

  return (
    <div className=' md:flex md:flex-col'>
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
            Search User By Name
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
            User Not Registered?{' '}
            <Link
              to='/submitForm'
              className='text-blue-700 hover:underline dark:text-blue-500 text-xl'
            >
              Register User
            </Link>
          </div>
        </div>
      )}
      <div>
        {userDetails ? (
          <div className='overflow-x-auto space-x-5 space-y-5 justify-center items-center text-xl xl:flex max-[768px]:flex-col max-[768px]:mx-10 '>

            <div className='overflow-x-auto'>
              <h1 className='font-bold text-center text-white text-3xl'>
                Personal Information
              </h1>
              <table className='min-w-full table-auto border'>
                {/* head */}
                <thead className='text-yellow-400'>
                  <tr>
                    <th className='px-4 py-2'>Sr. No.</th>
                    <th className='px-4 py-2'>Title</th>
                    <th className='px-4 py-2'>Content</th>
                  </tr>
                </thead>
                <tbody className='text-green-500'>
                  {/* row 0 */}
                  <tr>
                    <td className='border px-4 py-2'>1.</td>
                    <td className='border px-4 py-2'>Image</td>
                    <td className='border px-4 py-2'>
                      <img className='w-[150px]' src={userDetails.data.avatar.secure_url} alt="human image" />
                    </td>
                  </tr>
                  {/* row 1 */}
                  <tr>
                    <td className='border px-4 py-2'>1.</td>
                    <td className='border px-4 py-2'>Full Name</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.fullName}
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td className='border px-4 py-2'>2.</td>
                    <td className='border px-4 py-2'>Email</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.email}
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td className='border px-4 py-2'>3.</td>
                    <td className='border px-4 py-2'>D.O.B</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>4.</td>
                    <td className='border px-4 py-2'>Father Name</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.fatherName}
                    </td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>5.</td>
                    <td className='border px-4 py-2'>Mother Name</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.motherName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='overflow-x-auto lg:max-w-[600px] pb-10'>
              <h1 className='font-bold text-center text-white text-3xl'>
                Contact Information
              </h1>
              <table className='min-w-full table-auto border'>
                {/* head */}
                <thead className='text-yellow-400'>
                  <tr>
                    <th className='px-4 py-2'>Sr. No.</th>
                    <th className='px-4 py-2'>Title</th>
                    <th className='px-4 py-2'>Content</th>
                  </tr>
                </thead>
                <tbody className='text-green-500'>
                  {/* row 1 */}
                  <tr>
                    <td className='border px-4 py-2'>1.</td>
                    <td className='border px-4 py-2'>Mobile No.</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.mobileNo}
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td className='border px-4 py-2'>2.</td>
                    <td className='border px-4 py-2'>WhatsApp</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.whatsAppNumber}
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td className='border px-4 py-2'>3.</td>
                    <td className='border px-4 py-2'>Pan No.</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.panNo}
                    </td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>4.</td>
                    <td className='border px-4 py-2'>Aadhar No.</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.aadharNo}
                    </td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>5.</td>
                    <td className='border px-4 py-2'>Caste</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.caste}
                    </td>
                  </tr>
                  <tr>
                    <td className='border px-4 py-2'>6.</td>
                    <td className='border px-4 py-2'>Address</td>
                    <td className='border px-4 py-2'>
                      {userDetails.data.address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Home
