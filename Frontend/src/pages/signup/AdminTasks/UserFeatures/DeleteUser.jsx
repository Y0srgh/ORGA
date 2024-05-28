import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5500/users/${id}`)
      .then(() => {
        enqueueSnackbar('La suppression a été réalisée avec succès', { variant: 'success' });
        navigate('/user')
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='max-w-lg mx-auto p-4 mt-40'>
      <h1 className='text-3xl font-bold mb-8 text-center text-[#800020]'>Voulez-vous vraiment effacer cet utilisateur ?</h1>
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <div className='p-8'>
          <button
            className='p-4 bg-red-800 text-white w-full rounded-md hover:bg-red-700 active:bg-red-500 transition duration-300'
            onClick={handleDelete}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
