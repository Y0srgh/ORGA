import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ModelCard from '../../../../components/Cards/ModelCard';

const HomeUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
          .get('http://localhost:5500/users')
          .then((response) => {
            console.log("reponse home emp: ",response.data);
            setUsers(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


  return (
    <div className='p-4 home-club'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 mx-4 text-[#730202]'>Liste des membres</h1>
        <Link to='/user/add-user'>
          <MdOutlineAddBox className='text-sky-800 text-4xl mr-6' />
        </Link>
      </div>
      <ModelCard model={users} route={"user"} />
    </div>
  )
}

export default HomeUsers
