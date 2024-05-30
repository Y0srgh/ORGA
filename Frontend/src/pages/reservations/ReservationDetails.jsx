import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch'; // Import InputSwitch
import './style.css'; // Make sure to import the CSS file

const ReservationDetails = () => {
    const location = useLocation();
    const { detail } = location.state;
    const [changes, setChanges] = useState([]);
    console.log(detail);

    const handleApprove = (id) => {
        setChanges([...changes.filter(change => change.id !== id), { id, newState: 'approved' }]);
    };

    const handleReject = (id) => {
        setChanges([...changes.filter(change => change.id !== id), { id, newState: 'rejected' }]);
    };

    const handleSubmit = () => {
        changes.forEach(async (change) => {
            try {
                await axios.put(`/api/reservations/${change.id}`, { state: change.newState });
                console.log(`Reservation ${change.id} state updated successfully`);
            } catch (error) {
                console.error(`Failed to update reservation ${change.id} state:`, error);
            }
        });

        setChanges([]);
    };

    return (
        <div className="p-grid p-justify-center p-mt-5">
            <div className="p-col-12 p-md-8">
                <Card title="Reservation Details" subTitle={`Club: ${detail[0].club}`} className="p-shadow-6">
                    <Panel header="General Information" toggleable>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-6">
                                <div className="p-field">
                                    <label><strong>Motif de la réservation:</strong></label>
                                    <p>{detail[0].motive}</p>
                                </div>
                                <div className="p-field">
                                    <label><strong>Date:</strong></label>
                                    <p>{detail[0].date}</p>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <Divider />
                    <Panel header="Detailed Information" toggleable>
                        {detail.map((item, index) => (
                            <div key={index} className="p-mb-4">
                                <div className="p-grid p-fluid">
                                    <div className="p-col-12 p-md-4">
                                        <div className="p-field">
                                            <label><strong>Temps:</strong></label>
                                            <p>{item.time}</p>
                                        </div>
                                    </div>
                                    <div className="p-col-12 p-md-4">
                                        <div className="p-field">
                                            <label><strong>l'Id de la salle:</strong></label>
                                            <p>{item.facilityId}</p>
                                        </div>
                                    </div>
                                    <div className="p-col-12 p-md-4">
                                        <div className="p-field">
                                            <label><strong>Etat:</strong></label>
                                            <p>{item.state}</p>
                                        </div>
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <div className="p-field">
                                            <label><strong>Date de la création:</strong></label>
                                            <p>{new Date(item.createdAt).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}</p>
                                        </div>
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <div className="p-field">
                                            <label><strong>Date de la mise à jour:</strong></label>
                                            <p>{new Date(item.updatedAt).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}</p>
                                        </div>
                                    </div>
                                    {item.state==="pending" && (<div className="p-col-12 p-mt-2 p-text-right">
                                        <div className="p-d-flex p-ai-center">
                                            <div className="p-mr-2">Approve</div>
                                            <InputSwitch checked={changes.some(change => change.id === item.id && change.newState === 'approved')} onChange={() => handleApprove(item.id)} />
                                        </div>
                                        <div className="p-d-flex p-ai-center p-mt-2">
                                            <div className="p-mr-2">Reject</div>
                                            <InputSwitch checked={changes.some(change => change.id === item.id && change.newState === 'rejected')} onChange={() => handleReject(item.id)} />
                                        </div>
                                    </div>)}
                                </div>
                                <Divider />
                            </div>
                        ))}
                    </Panel>
                    <div className="p-mt-3 p-text-right">
                        <Button
                            label="Submit"
                            icon="pi pi-send"
                            rounded
                            text
                            raised
                            className="tailwind-button bg-[#102162] hover:bg-[#172f8b] text-white font-bold py-2 px-4 rounded-full"
                            onClick={handleSubmit}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ReservationDetails;
