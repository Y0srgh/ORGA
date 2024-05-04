import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchAllClubs = async () => {
      try {
        const response = await axios.get("http://localhost:5500/clubs");
        const transformedClubs = response.data.data.map(club => ({
          name: club.clubName,
          code: club._id
        }));
        fetchUser(transformedClubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    const fetchUser = async (transformedClubs) => {
      try {
        const response = await axios.get(`http://localhost:5500/users/${id}`);
        setUser(response.data);

        if (response.data.role === "Président") {
          const newClubs = response.data.clubs.map((selectedId) => {
            const selectedClub = transformedClubs.find((club) => club.code === selectedId);
            return selectedClub ? { code: selectedClub.code, name: selectedClub.name } : null;
          }).filter(Boolean);
          setClubs(newClubs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllClubs();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#800020]">{user ? `Les détails du compte ${user.role}` : "Aucun employé trouvé avec cet ID."}</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <DetailRow label="ID" value={user._id} />
            <DetailRow label="Pseudo-Identité" value={user.userName} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Date d'ajout" value={new Date(user.createdAt).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} />
            <DetailRow label="Role" value={user.role} />
            {user.role === "Président" && (
              <>
                <DetailRow label="Carte étudiant" value={user.StudentID} />
                <DetailRow label="Année d'étude" value={user.levelOfStudy} />
                {user.clubs?.length > 0 && (
                  <DetailRow label="Liste des clubs" value={clubs.map((club) => club.name).join(', ')} />
                )}
              </>
            )}
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

export default ShowUser;
