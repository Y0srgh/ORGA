import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowClub = () => {
  const [club, setClub] = useState(null);
  const [presidents, setPresidents] = useState([])
  const [selectedPresident, setSelectedPresident] = useState(null)
  const { id } = useParams();

  useEffect(() => {

    const fetchClub = async (transformedPres) => {
      axios
        .get(`http://localhost:5500/clubs/${id}`)
        .then((response) => {
          console.log("club resp", response.data);
          setClub(response.data);
          if (response.data.selected) {
            console.log("transformed 1", transformedPres);
            const president = transformedPres.find(president => president.code === response.data.president);

            if (president) {
              console.log('President found:', president);
              setSelectedPresident(president)
            } else {
              console.log('President not found');
            }
          }

        })
        .catch((error) => {
          console.log(error);
        })

    }

    axios
      .get("http://localhost:5500/users")
      .then((response) => {
        console.log("response", response.data.data);
        const pres = response.data.data.filter(item => {
          return item.role === "Président"
        })
        console.log("pres", pres);
        const transformedPres = pres.map(user => ({
          name: user.userName,
          code: user._id
        }));

        console.log(transformedPres);

        setPresidents(transformedPres);
        fetchClub(transformedPres);

      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });

  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#800020]">{club ? `Les détails du club ${club.clubName}` : "Aucun club n'est trouvé avec cet ID."}</h1>
      {club && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <DetailRow label="ID" value={club._id} />
            <DetailRow label="Pseudo-Identité" value={club.clubName} />
            <DetailRow label="Selected" value={club.selected?"Vrai":"Faux"} />
            {club.selected && (<DetailRow label="President" value={selectedPresident?.name} />)}            
            <DetailRow label="Date d'ajout" value={new Date(club.createdAt).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} />
            <DetailRow label="Date de la dernière mise à jour" value={new Date(club.updatedAt).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} />

          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex items-center border-b py-3">
    <span className="w-1/3 text-red-800 font-semibold">{label}</span>
    <span className="w-2/3 text-gray-600">{value}</span>
  </div>
);

export default ShowClub;
