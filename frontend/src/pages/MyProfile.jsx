import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')


  const {
    token,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  } = useContext(AppContext)

  // 🔹 Update profile
  const updateUserProfileData = async () => {
  try {
    if (password && password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    const formData = new FormData()

    formData.append('name', userData.name || '')
    formData.append('email', userData.email || '') // ✅ added
    formData.append('phone', userData.phone || '')
    formData.append('address', JSON.stringify(userData.address || {}))
    formData.append('gender', userData.gender || '')
    formData.append('dob', userData.dob || '')

    // 🔐 Send password only if user entered it
    if (password) {
      formData.append('password', password)
    }

    image && formData.append('image', image)

    const { data } = await axios.post(
      backendUrl + '/api/user/update-profile',
      formData,
      { headers: { token } }
    )

    if (data.success) {
      toast.success(data.message)
      await loadUserProfileData()
      setIsEdit(false)
      setImage(false)
      setPassword('')
      setConfirmPassword('')
    } else {
      toast.error(data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  return userData ? (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

      {/* PROFILE IMAGE */}
      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img
              className='w-36 rounded opacity-75'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            {!image && (
              <img
                className='w-10 absolute bottom-12 right-12'
                src={assets.upload_icon}
                alt=""
              />
            )}
          </div>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <img className='w-36 rounded' src={userData.image} alt="" />
      )}

      {/* NAME */}
      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60'
          type="text"
          value={userData.name || ''}
          onChange={(e) =>
            setUserData(prev => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className='font-medium text-3xl text-[#262626] mt-4'>
          {userData.name}
        </p>
      )}

      <hr className='bg-[#ADADAD] h-[1px] border-none' />

      {/* CONTACT INFORMATION */}
      <div>
        <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>

          <p className='font-medium'>Email id:</p>
          
{isEdit ? (
  <input
    className='bg-gray-50 max-w-60'
    type="email"
    value={userData.email || ''}
    onChange={(e) =>
      setUserData(prev => ({ ...prev, email: e.target.value }))
    }
  />
) : (
  <p className='text-blue-500'>{userData.email}</p>
)}


          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-50 max-w-52'
              type="text"
              value={userData.phone || ''}
              onChange={(e) =>
                setUserData(prev => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <p>
              <input
                className='bg-gray-50'
                type="text"
                value={userData.address?.line1 || ''}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
              />
              <br />
              <input
                className='bg-gray-50'
                type="text"
                value={userData.address?.line2 || ''}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
              />
            </p>
          ) : (
            <p className='text-gray-500'>
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {isEdit && (
  <div className='mt-5'>
    <p className='text-gray-600 underline'>SECURITY</p>

    <div className='flex flex-col gap-2 mt-2 max-w-60'>
      <input
        type="password"
        placeholder="New Password"
        className='bg-gray-50'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className='bg-gray-50'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  </div>
)}


      {/* BASIC INFORMATION */}
      <div>
        <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>

          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-gray-50'
              value={userData.gender || ''}
              onChange={(e) =>
                setUserData(prev => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-500'>
              {userData.gender || 'Not Selected'}
            </p>
          )}

          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-28 bg-gray-50'
              type='date'
              value={
                userData.dob && userData.dob !== "Not selected"
                  ? userData.dob
                  : ""
              }
              onChange={(e) =>
                setUserData(prev => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className='text-gray-500'>
              {userData.dob || 'Not selected'}
            </p>
          )}

        </div>
      </div>

      {/* BUTTON */}
      <div className='mt-10'>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
          >
            Edit
          </button>
        )}
      </div>

    </div>
  ) : null
}

export default MyProfile
