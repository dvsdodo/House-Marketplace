import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';

function Contact() {
    const [message, setMessage] = useState("");
    const [landlord, setLandlord] = useState(null);
    // eslint-disable-next-line
    const [seachParams, setSeachParams] = useSearchParams();
    const params = useParams();

    const onChange = (e) => setMessage(e.target.value);

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, "users", params.landlordId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setLandlord(docSnap.data())
            } else {
                toast.error("Could not get Landlord data")
            }
        }

        getLandlord();
    }, [params.landlordId])

    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">Contact Landlord</p>
            </header>

            {landlord !== null && (
                <main>
                    <div className="contactLandlord">
                        <p className="landlordName">Contact {landlord?.name}</p>
                    </div>

                    <form className="messageForm">
                        <div className="messageDiv">
                            <label htmlFor="message" className='messageLabel'>
                                Message
                            </label>
                            <textarea name="message" id="message" className='textarea' onChange={onChange}></textarea>
                        </div>
                        <a href={`mailto:${landlord.email}?Subjct=${seachParams.get("lsitingName")}&bod=${message}`}>
                            <button className='primaryButton'>Send Message</button>
                        </a>
                    </form>
                </main>
            )}    
        </div>
    )
}

export default Contact
