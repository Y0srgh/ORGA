import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const SingleCardRes = ({ model }) => {

    console.log("model sing", model);
    
    const navigate = useNavigate();

    const toggleDetails = () => {
        //setShowDetails(!showDetails);
        navigate('/reservation-details', { state: { detail: model } });

    };


    const header = (
        <img alt="Card" src="https://insat.rnu.tn/assets/images/insat-header.jpg" />
    );
    const footer = (<Button className='m-0' label="Voir les detailles" severity="secondary" icon="pi pi-list-check" text raised onClick={toggleDetails} />);

    return (
        <div className="card2 flex justify-content-center">
            <Card title={model[0].club} subTitle={model[0].motive} footer={footer} header={header} className="md:w-10rem m-0">
                    <div className='py-0'>
                    <p className="m-0">
                    date : {model[0].date}
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default SingleCardRes

