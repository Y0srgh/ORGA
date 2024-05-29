import React, { useEffect, useState } from 'react';
import { MdOutlineMail, MdPermIdentity } from "react-icons/md";
import { LiaUniversitySolid } from "react-icons/lia";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";


import './styles.css'; // Import custom CSS for styling

const EditClub = () => {

  const [clubName, setClubName] = useState("");
  const [selected, setSelected] = useState(false);
  const [presidents, setPresidents] = useState([])
  const [selectedPresident, setSelectedPresident] = useState(null)

  const { id } = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {

    const fetchClub = async (transformedPres) => {
      axios
        .get(`http://localhost:5500/clubs/${id}`)
        .then((response) => {
          console.log("club resp", response.data);
          setClubName(response.data.clubName);
          if (response.data.selected) {
            setSelected(true);
            console.log("transformed", transformedPres);
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


  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      clubName,
      selectedPresident,
      selected
    };


    await axios
      .put(`http://localhost:5500/clubs/${id}`, data)
      .then(() => {
        enqueueSnackbar("Un email a été envoyé !", {
          variant: "success",
        });
        navigate("/club");
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className='mt-20 form-wrapper '>
      <h1 className="text-3xl font-bold mb-8 text-center text-[#800020]">Affecter des modifications au club</h1>
      <div className="blur-frame max-w-4xl mx-auto px-6 py-8 my-6">

        <form className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-10">

            <div className="relative flex items-center">
              <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Nom du club</label>
              <input
                type="text"
                placeholder="Le nom du club"
                className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                value={clubName}
                required
                onChange={(e) => setClubName(e.target.value)}
              />
              <LiaUniversitySolid className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
            </div>
            <div className="card flex flex-column align-items-center gap-3">
              <Checkbox checked={selected} onChange={(e) => {setSelected(e.checked); !selected&&setSelectedPresident(null)}} />
              <label>{selected && "Liberer le club" || "Affecter à un président"}</label>
            </div>

            {selected && (<div className="relative flex items-center">
              <Dropdown value={selectedPresident} onChange={(e) => { setSelectedPresident(e.value); console.log(selectedPresident); }} options={presidents} optionLabel="name"
                placeholder="Choisissez un président" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
            </div>)}

          </div>

          <button type="submit" className="mt-10 mb-5 px-2 py-2.5 rounded text-sm font-semibold bg-[#333] text-white hover:bg-[#222] mx-auto block w-80">Submit</button>

        </form>
      </div>
    </div>
  );
};

export default EditClub;
