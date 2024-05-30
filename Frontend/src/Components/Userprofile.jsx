import React, { useState } from 'react';

function Userprofile({ profileImg, username }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = () => {
        // Logique de mise à jour du mot de passe
        console.log("Mot de passe mis à jour:", newPassword);

        // Réinitialisation des champs et de l'erreur après la mise à jour
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className="profile-container">
            <div className="userprf">
                <img src={profileImg} alt="Profile" className="prf" />
                <div className="username">
                    <h4>{username}</h4>
                </div>
                <button className="editButton">Modify Profile</button>
            </div>
            <div className="container">
                <h2 className="form-title">Changer le mot de passe</h2>
                <div className="form-group">
                    <label htmlFor="oldPassword" className="required-label">Ancien mot de passe:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword" className="required-label">Nouveau mot de passe:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="required-label">Confirmer le nouveau mot de passe:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleChange} className="button">Changer le mot de passe</button>
            </div>
        </div>
    );
}

export default Userprofile;
