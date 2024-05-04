import React from 'react';
import { Link } from 'react-router-dom';

const AddUser = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-[#800020]">Choisissez le type du compte</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <RequestLink to="/user/add-president" title="Ajouter un président" />
                    <RequestLink to="/user/add-def" title="Ajouter un compte DEF" />
                    <RequestLink to="/user/add-dvure" title="Ajouter un compte DVURE" />
                </div>
            </div>
        </div>
    );
};

const RequestLink = ({ to, title }) => {
    return (
        <Link to={to} className="bg-[#5e0101] hover:bg-[#800000] text-white font-semibold py-3 px-4 rounded-lg block text-center transition duration-300">
            {title}
        </Link>
    );
};

export default AddUser;
