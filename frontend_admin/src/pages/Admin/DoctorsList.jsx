import React, { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


const DoctorsList = () => {



  const {
    doctors,
    changeAvailability,
    removeDoctor,
    aToken,
    getAllDoctors
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="bg-[#EAEFFF]"
            />

            <div className="p-4">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <p className="text-sm text-gray-500">{item.experience}</p>
              <p className="text-sm text-gray-500">{item.fees}</p>
              

              <p className="text-xs text-gray-500 mt-2 line-clamp-4">
                {item.about}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <span className="text-sm">Available</span>
              </div>


              <button
                onClick={() => {
                  if (window.confirm(`Remove Dr. ${item.name}?`)) {
                    removeDoctor(item._id)
                  }
                }}
                className="mt-3 w-full bg-primary text-white py-1 rounded hover:bg-red"
              >
                Remove Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
