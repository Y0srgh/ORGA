import React, { useState } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail, MdPermIdentity } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoPhonePortraitOutline } from "react-icons/io5";


import './styles.css'; // Import custom CSS for styling

const AddPresidentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send formData to your backend
    console.log(formData);
  };

  return (
    <div className='mt-32'>
      <form className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6">
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Pseudo-Identité</label>
            <input type="text" placeholder="Pseudo-Identité"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <MdPermIdentity className="w-[18px] h-[18px] absolute right-4" />
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">ID d'étudiant</label>
            <input type="text" placeholder="ID d'étudint"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <HiOutlineIdentification className="w-[18px] h-[18px] absolute right-4" />
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Numéro de téléphone</label>
            <input type="number" placeholder="Numéro de téléphone."
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <IoPhonePortraitOutline className="w-[18px] h-[18px] absolute right-4"/>
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Niveau d'étude</label>
            <input type="number"
              min={1}
              max={5} placeholder="Niveau d'étude"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <PiStudentBold className="w-[18px] h-[18px] absolute right-4"/>
          </div>
          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Email</label>
            <input type="email" placeholder="Enter email"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <MdOutlineMail className="w-[18px] h-[18px] absolute right-4"/>
          </div>
          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Mot de passe</label>
            <input type="password" autoComplete="new-password" placeholder="Enter password"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <RiLockPasswordLine className="w-[18px] h-[18px] absolute right-4"/>
          </div>
        </div>
        <button type="button"
          className="mt-10 px-2 py-2.5 w-full rounded text-sm font-semibold bg-[#333] text-white hover:bg-[#222]">Submit</button>
      </form>
    </div>
  );
};

export default AddPresidentForm;
