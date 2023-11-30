import { Link } from "react-router-dom";

const BioData = ({item}) => {
    const { _id, gender, image, permanentDiv, age, occupation } = item;
    return (
        
        <div className="p-5 border border-green-600">
            <div className="text-center">
            <img className="h-40 w-40 rounded-full mx-auto mb-8" src={image} alt="Image" />
            </div>
            
            
            <div className="">
                <h3 className="text-base font-bold">Biodata Id: <span className="font-normal">{_id}</span></h3>
                <h2 className="text-base font-bold">Biodata Type: <span className="font-normal">{gender}</span></h2>
                <h3 className="text-base font-bold">Permanent Division: <span className="font-normal">{permanentDiv}</span></h3>
                <h3 className="text-base font-bold">Age: <span className="font-normal">{age}</span></h3>
                <h3 className="text-base font-bold">Occupation: <span className="font-normal">{occupation}</span></h3>
                
                <Link to={`/bioData/${_id}`}><button className="text-white bg-green-600 py-2 mt-5 w-full">View Profile</button></Link>

            </div>
        </div>
        
    );
};

export default BioData;