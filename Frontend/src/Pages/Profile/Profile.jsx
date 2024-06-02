import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';

import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TemplateDemo() {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const id = localStorage.userId;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5500/users/${id}`)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.profilePicture) {
                    setProfilePicture(resp.data.profilePicture)
                    localStorage.setItem("profilePicture", resp.data.profilePicture)
                }else {
                    setProfilePicture("")
                    localStorage.setItem("profilePicture", "")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formattedValue =
            fileUploadRef && fileUploadRef.current
                ? fileUploadRef.current.formatSize(totalSize)
                : '0 B';

        return (
            <div
                className={className}
                style={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formattedValue} / 1 MB</span>
                    <ProgressBar
                        value={value}
                        showValue={false}
                        style={{ width: '10rem', height: '12px' }}
                    ></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag
                    value={props.formatSize}
                    severity="warning"
                    className="px-3 py-2"
                    style={{
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#f00e0e',
                        marginLeft: '100px',
                    }}
                />
                <Button
                    type="button"
                    icon={<i className="pi pi-fw pi-times" style={{ fontSize: '1rem', color: '#f00e0e' }}></i>}
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#f00e0e',
                    }}
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i
                    className="pi pi-image mt-3 p-5"
                    style={{
                        fontSize: '5em',
                        borderRadius: '50%',
                        backgroundColor: 'var(--surface-b)',
                        color: 'var(--surface-d)',
                    }}
                ></i>
                <span
                    style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
                    className="my-5"
                >
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: <i className="pi pi-fw pi-images" style={{ fontSize: '1rem', color: 'blue' }}></i>,
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined',
        style: {
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '25px',
            cursor: 'pointer',
            margin: '20px',
        },
    };
    const uploadOptions = {
        icon: <i className="pi pi-fw pi-cloud-upload" style={{ fontSize: '1rem', color: '#12a612' }}></i>,
        iconOnly: true,
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
        style: {
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '22px',
            borderColor: '#12a612',
            margin: '20px',
        },
    };
    const cancelOptions = {
        icon: <i className="pi pi-fw pi-times" style={{ fontSize: '1rem', color: '#f00e0e' }}></i>,
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
        style: {
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '22px',
            borderColor: '#f00e0e',
            margin: '20px',
        },
    };

    const handlePasswordUpdate = () => {
        if (password === confirmPassword) {
            axios
                .post(`http://localhost:5500/users/modifier-password/${id}`, { password })
                .then((resp) => {
                    console.log(resp);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Password Updated',
                    });
                    //navigate('/profile');
                    setPassword('')
                    setConfirmPassword('')
                })
                .catch((error) => {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.response.data.message,
                    });
                });
        } else {
            toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Passwords do not match',
            });
        }
    };
    
    return (
        <>
            <div className="profile-picture flex justify-content-center">
                <Image src={profilePicture&&`http://localhost:5500/${profilePicture}`||"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"} alt="Image" width="250" preview />
            </div>
            <Splitter style={{ height: '410px', width: '100%' }}>
                <SplitterPanel className="flex align-items-center justify-content-center">
                    <div className="profile-container">
                        <Toast ref={toast}></Toast>
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                        <FileUpload
                            ref={fileUploadRef}
                            name="file" // Make sure the name matches the backend expectation
                            url={`http://localhost:5500/users/update-profile/${id}`} // Corrected backend URL
                            multiple={false} // Assuming single file upload
                            accept="image/*"
                            maxFileSize={1000000}
                            onUpload={onTemplateUpload}
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            uploadOptions={uploadOptions}
                            cancelOptions={cancelOptions}
                        />
                    </div>
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center">
                    <div className="inputs-container">

                        <h1>Mot de passe</h1>
                        <div className="card5 flex justify-content-center">
                            <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                        </div>
                        <h1>Confirmer votre mot de passe</h1>
                        <div className="card5 flex justify-content-center">
                            <Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false} toggleMask />
                        </div>
                        <button className='submit-button' onClick={handlePasswordUpdate}>Confirmer</button>
                    </div>
                </SplitterPanel>
            </Splitter>
        </>
    );
}
