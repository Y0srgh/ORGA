import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModelCardRes from './ModelCardRes';
import "./style.css"

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupedReservations, setGroupedReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            const url = "/api/reservations";
            try {
                const response = await axios.get(url);
                setReservations(response.data.reservations);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setError("Failed to fetch reservations");
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    useEffect(() => {
        const groupReservations = () => {
            const grouped = reservations.reduce((acc, reservation) => {
                const key = `${reservation.club}-${reservation.motive}-${reservation.date}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(reservation);
                return acc;
            }, {});
            setGroupedReservations(Object.values(grouped));
        };

        groupReservations();
    }, [reservations]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8 mx-4 text-[#730202]'>Admin Dashboard</h1>
            <ModelCardRes model={groupedReservations} />
        </div>
    );
};

export default AdminDashboard;
