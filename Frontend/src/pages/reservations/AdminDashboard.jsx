import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModelCardRes from './ModelCardRes';
import "./style.css";

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupedReservations, setGroupedReservations] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedClub, setSelectedClub] = useState('');
    const [uniqueClubs, setUniqueClubs] = useState([]);
    const [dateSortOrder, setDateSortOrder] = useState('asc');

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
    
    useEffect(() => {
        const fetchReservations = async () => {
            axios
                .get("http://localhost:5500/reservations")
                .then((response) => {
                    const fetchedReservations = response.data.data;
                    console.log("reservation response", fetchedReservations);
                    setReservations(fetchedReservations);
                    setUniqueClubs([...new Set(fetchedReservations.map(res => res.club))]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching reservations:", error);
                    setError("Failed to fetch reservations");
                    setLoading(false);
                });
        };

        fetchReservations();
    }, []);

    const toggleDateSortOrder = () => {
        setDateSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Filtrage par date
    const filteredReservations = groupedReservations.filter(reservation => {
        const reservationDate = new Date(reservation[0].createdAt);
        const startFilterDate = startDate ? new Date(startDate) : null;
        const endFilterDate = endDate ? new Date(endDate) : null;

        if (startFilterDate && reservationDate < startFilterDate) {
            return false;
        }
        if (endFilterDate && reservationDate > endFilterDate) {
            return false;
        }
        return true;
    });

    // Filtrage par club
    const filteredByClub = selectedClub ? filteredReservations.filter(reservation => reservation[0].club === selectedClub) : filteredReservations;

    // Tri des réservations
    const sortedReservations = filteredByClub.sort((a, b) => {
        const dateA = new Date(a[0].createdAt);
        const dateB = new Date(b[0].createdAt);
        return dateSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8 mx-4 text-[#730202]'>Admin Dashboard</h1>
            <div className="filters mb-4">
                <label className="mr-2">Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mr-4" />
                <label className="mr-2">End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mr-4" />
                <label className="mr-2">Club:</label>
                <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className="mr-4">
                    <option value="">All</option>
                    {uniqueClubs.map(club => (
                        <option key={club} value={club}>{club}</option>
                    ))}
                </select>
                <button onClick={toggleDateSortOrder} className="mr-4">{`Sort Date ${dateSortOrder === 'asc' ? 'Ascending' : 'Descending'}`}</button>
            </div>
            <ModelCardRes model={sortedReservations} />
        </div>
    );
};

export default AdminDashboard;
