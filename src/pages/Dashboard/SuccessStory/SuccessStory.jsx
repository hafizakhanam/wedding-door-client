import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import '@smastrom/react-rating/style.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const SuccessStory = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://wedding-door-server.vercel.app/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, []);

    const [modalStates, setModalStates] = useState(reviews.map(() => false));

    const openModal = (index) => {
        const updatedModalStates = [...modalStates];
        updatedModalStates[index] = true;
        setModalStates(updatedModalStates);
    }

    const closeModal = (index) => {
        const updatedModalStates = [...modalStates];
        updatedModalStates[index] = false;
        setModalStates(updatedModalStates);
    }

    return (
        <div>
            <SectionTitle heading={"Couple Success Story"} ></SectionTitle>
            <div className="overflow-x-auto mt-8">
                <table className="table-auto border-collapse border border-slate-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 bg-green-600 p-2">#</th>
                            <th className="border border-slate-300 bg-green-600 p-2">Male Biodata Id</th>
                            <th className="border border-slate-300 bg-green-600 p-2">Female Biodata Id</th>
                            <th className="border border-slate-300 bg-green-600 p-2">Story</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => (
                                <tr key={review._id}>
                                    <th className="border border-slate-300 p-2">{index + 1}</th>
                                    <td className="border border-slate-300 p-2">{review.selfBioDataId}</td>
                                    <td className="border border-slate-300 p-2">{review.partnerBioDataId}</td>
                                    <th className="border border-slate-300 p-2">
                                        <button onClick={() => openModal(index)} className="bg-green-600 px-2">View</button>
                                        <Modal
                                            isOpen={modalStates[index]}
                                            onRequestClose={() => closeModal(index)}
                                            style={customStyles}
                                        >
                                            <button className="bg-green-600 p-2 mb-4" onClick={() => closeModal(index)}>X</button>
                                            <div className="italic">{review.successStory}</div>
                                        </Modal>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuccessStory;