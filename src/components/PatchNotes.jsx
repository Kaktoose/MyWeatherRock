import { useEffect, useState } from "react";

const PatchNotes = () => {
    const newestVersion = 'V1.2.0';
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('noteVersion') !== newestVersion) {
            setShowModal(true);
        }
    }, []);

    const dismissPatchNotes = () => {
        localStorage.setItem('noteVersion', newestVersion);
        setShowModal(false);
    };
    return (
        <>
            {showModal &&
                <div className="modal">
                    <div className="modal-content">
                        <h1 style={{color: 'black'}}>Whats New In V1.2.0?</h1>
                        <h2 style={{color: 'black'}}>-Set your default location with the star icon</h2>
                        <h2 style={{color: 'black'}}>-Fixed uncentered text in the footer</h2>
                        <button onClick={dismissPatchNotes}>Dismiss</button>
                    </div>
                </div>
            }
        </>
    );
};

export default PatchNotes;
