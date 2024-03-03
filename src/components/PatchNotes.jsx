import { useEffect, useState } from "react";

const PatchNotes = () => {
    const newestVersion = 'V1.3.0';
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
                        <h1 style={{color: 'black'}}>Whats New In V1.3.0?</h1>
                        <h2 style={{color: 'black'}}>-Added 3 Day Forecast</h2>
                        <h2 style={{color: 'black'}}></h2>
                        <button onClick={dismissPatchNotes}>Dismiss</button>
                    </div>
                </div>
            }
        </>
    );
};

export default PatchNotes;
