import { useEffect, useState } from "react";

const PatchNotes = () => {
    const newestVersion = 'V2.0.0';
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
                        <h1 style={{color: 'black'}}>V2.0.0 is here!</h1>
                        <h2 style={{color: 'black'}}>-Improved weather information</h2>
                        <h2 style={{color: 'black'}}>-Shareable URLs</h2>
                        <button onClick={dismissPatchNotes}>Dismiss</button>
                    </div>
                </div>
            }
        </>
    );
};

export default PatchNotes;
