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
    const footer = (
        <>
            <Button label="Voir les details" severity="secondary" icon="pi pi-list-check" text raised onClick={toggleDetails} />

            {/*<Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />*/}
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={model[0].club} subTitle={model[0].motive} footer={footer} header={header} className="md:w-10rem">
                <p className="m-0">
                    date : {model[0].date}
                </p>
            </Card>
        </div>
    )
}

export default SingleCardRes

