import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
        useContext(DoctorContext)

    const { currency } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updateProfile = async () => {
        try {

            // ✅ password confirmation check
            if (password && password !== confirmPassword) {
                toast.error("Passwords do not match")
                return
            }

            const updateData = {
                name: profileData.name,
                email: profileData.email,
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            // send password only if changed
            if (password.trim() !== '') {
                updateData.password = password
            }

            const { data } = await axios.post(
                backendUrl + '/api/doctor/update-profile',
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            )

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                setPassword('')
                setConfirmPassword('')
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>

                {/* Profile Image */}
                <div>
                    <img
                        className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
                        src={profileData.image}
                        alt=""
                    />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

                    {/* Name */}
                    {
                        isEdit
                            ? <input
                                className='text-3xl font-medium text-gray-700 outline-primary'
                                value={profileData.name}
                                onChange={(e) =>
                                    setProfileData(prev => ({ ...prev, name: e.target.value }))
                                }
                              />
                            : <p className='text-3xl font-medium text-gray-700'>
                                {profileData.name}
                              </p>
                    }

                    {/* Degree & Experience */}
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>
                            {profileData.experience}
                        </button>
                    </div>

                    {/* Email */}
                    <p className='text-gray-600 mt-2'>
                        Email:
                        {
                            isEdit
                                ? <input
                                    type="email"
                                    className='ml-2 outline-primary'
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData(prev => ({ ...prev, email: e.target.value }))
                                    }
                                  />
                                : <span className='ml-2 text-gray-800'>
                                    {profileData.email}
                                  </span>
                        }
                    </p>

                    {/* About */}
                    <div>
                        <p className='text-sm font-medium text-[#262626] mt-3'>About :</p>
                        {
                            isEdit
                                ? <textarea
                                    rows={6}
                                    className='w-full outline-primary p-2 text-sm'
                                    value={profileData.about}
                                    onChange={(e) =>
                                        setProfileData(prev => ({ ...prev, about: e.target.value }))
                                    }
                                  />
                                : <p className='text-sm text-gray-600 mt-1'>
                                    {profileData.about}
                                  </p>
                        }
                    </div>

                    {/* Fees */}
                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fee:
                        <span className='text-gray-800 ml-2'>
                            {currency}
                            {
                                isEdit
                                    ? <input
                                        type='number'
                                        className='ml-2 outline-primary'
                                        value={profileData.fees}
                                        onChange={(e) =>
                                            setProfileData(prev => ({ ...prev, fees: e.target.value }))
                                        }
                                      />
                                    : profileData.fees
                            }
                        </span>
                    </p>

                    {/* Address */}
                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {
                                isEdit
                                    ? <input
                                        className='outline-primary'
                                        value={profileData.address.line1}
                                        onChange={(e) =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line1: e.target.value }
                                            }))
                                        }
                                      />
                                    : profileData.address.line1
                            }
                            <br />
                            {
                                isEdit
                                    ? <input
                                        className='outline-primary'
                                        value={profileData.address.line2}
                                        onChange={(e) =>
                                            setProfileData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line2: e.target.value }
                                            }))
                                        }
                                      />
                                    : profileData.address.line2
                            }
                        </p>
                    </div>

                    {/* Availability */}
                    <div className='flex gap-1 pt-2'>
                        <input
                            type="checkbox"
                            checked={profileData.available}
                            onChange={() =>
                                isEdit &&
                                setProfileData(prev => ({
                                    ...prev,
                                    available: !prev.available
                                }))
                            }
                        />
                        <label>Available</label>
                    </div>

                    {/* Password fields */}
                    {
                        isEdit && (
                            <>
                                <div className='mt-3'>
                                    
                                    <p className='text-gray-600 mt-2'>password:</p>
                        
                                    <p className='text-sm text-gray-600'>New Password</p>
                                    <input
                                        type="password"
                                        className='border p-1 rounded outline-primary'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className='mt-2'>
                                    <p className='text-sm text-gray-600'>Confirm Password</p>
                                    <input
                                        type="password"
                                        className='border p-1 rounded outline-primary'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )
                    }

                    {/* Buttons */}
                    {
                        isEdit
                            ? <button
                                onClick={updateProfile}
                                disabled={password && password !== confirmPassword}
                                className='px-4 py-1 border border-primary text-sm rounded-full mt-5
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:bg-primary hover:text-white transition-all'
                              >
                                Save
                              </button>
                            : <button
                                onClick={() => setIsEdit(true)}
                                className='px-4 py-1 border border-primary text-sm rounded-full mt-5
                                hover:bg-primary hover:text-white transition-all'
                              >
                                Edit
                              </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
