import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import './style.css'; // Assurez-vous d'importer le fichier CSS

const ReservationDetails = () => {
    const location = useLocation();
    const { detail } = location.state;

    const handleApprove = (id) => {
        // Logique d'approbation
        console.log(`Approved reservation with ID: ${id}`);
    };

    const handleReject = (id) => {
        // Logique de rejet
        console.log(`Rejected reservation with ID: ${id}`);
    };

    const handleSubmit = () => {
        // Logique de soumission du formulaire
        console.log('Form submitted');
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
                                    <div className="p-col-12 p-mt-2 p-text-right">
                                        <Button
                                            label="Approve"
                                            icon="pi pi-check"
                                            rounded
                                            text raised
                                            className="tailwind-button bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2"
                                            onClick={() => handleApprove(item.id)}
                                        />
                                        <Button
                                            label="Reject"
                                            icon="pi pi-times"
                                            rounded
                                            text raised
                                            className="tailwind-button bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleReject(item.id)}
                                        />
                                    </div>
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
                            text raised
                            className="tailwind-button bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={handleSubmit}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ReservationDetails;
