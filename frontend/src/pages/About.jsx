import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <samp className='text-gray-700 font-medium'>US</samp></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>welcome To Prescripto, Your Trusted partner In Managing Your Healthcare Needs Convenienthtly And Efficiently, At Prescripto, We Understand The Challenges Inddviduals Face When It Comes TO Scheduling Doctor Appointments And Managing Therir Health Records.</p>
          <p>Prescripto Is Committed To Excellence In Healthcare Technology. we continuously Strive TO Enhance Our Platform, Interating The Latest Advancements To Improve Uesr Experience And Deliver Superior service.Whether YOu're Booking Your First Appointment or Managing ongoing Care. Prescripto Is Here To Support you Every Step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our Vision At Prescripto Is TO Create A Seamless Healthcare Experience For EVery User. We AIm To Bridge The Gap Between Patients And Healyhcare Providers,Making It Easier For You To Access The Care You Need,When You Need It.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <samp className='text-gray-700 font-semibold'>CHOOSE US</samp> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Stramlined appointment scheduling that fits into you busy lifestyle</p>
        </div >
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals i yor area. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health</p>
        </div>
      </div>
    </div>
  )
}

export default About
