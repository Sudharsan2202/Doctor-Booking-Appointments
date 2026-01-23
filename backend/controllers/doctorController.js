import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js";

// API to get all doctors list for Frontend
const changeAvailablity= async(req,res)=>{
    try {
        const {docId} =req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({ success: true, message: 'Availablity changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async(req,res)=>{
    try {
        const doctors =await doctorModel.find({}).select(['-password','-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for doctor Login 


const loginDoctor = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    const user = await doctorModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel


const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.user.docId;

        const appointments = await appointmentModel.find({ docId });

        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// API to cancel appointment for doctor panel
 const appointmentCancel = async (req, res) => {
    try {
        const docId = req.user.docId;
        const {  appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.user.docId;
        const {  appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const docId = req.user.docId;

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const docId = req.user.docId;
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.user?.docId

        if (!docId) {
            return res.json({
                success: false,
                message: "Unauthorized access"
            })
        }

        const { fees, address, about, available } = req.body

        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            docId,
            {
                fees,
                address,
                about,
                available
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedDoctor) {
            return res.json({
                success: false,
                message: "Doctor not found"
            })
        }

        res.json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}



export {
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorDashboard,
    updateDoctorProfile,
    doctorProfile 
}