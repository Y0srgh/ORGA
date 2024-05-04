import React, { useState } from 'react';
import BackButton from "../../../components/BackButton"
import Spinner from "../../../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5500/users/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('La suppression a été réalisée avec succès', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Effacer cet utilisateur</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Voulez-vous vraiment effacer cet utilisateur ?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDelete}
        >
          Confirmer
        </button>
      </div>
    </div>
  )
}

export default DeleteEmployee;