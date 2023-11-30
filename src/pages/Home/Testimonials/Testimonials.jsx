import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://wedding-door-server.vercel.app/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, []);
    const sortedReviews = reviews.sort((a,b) => { 
        var c = new Date(a.marriageDate);
        var d = new Date(b.marriageDate);
        return d - c;
    });
    
    return (
        <div className="py-24 bg-gray-100">
            <div className="max-w-[1280px] mx-auto px-4">
                <SectionTitle subHeading={'What Our Clients Say'} heading={'Reviews'}></SectionTitle>

                <div className="mt-20">
                    
                    {
                        sortedReviews.map(review => <div key={review._id} className="border rounded-lg bg-white mb-5">
                            <div className="flex flex-col items-center m-5">
                                <img src={review.image} className="h-40 w-40 rounded-full mb-5 mx-auto" />
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.reviewStar}
                                    readOnly
                                />
                                <h3 className="text-2xl text-green-600">Marriage Date: {review.marriageDate}</h3>
                                <p className="mt-4 text-center">{review.successStory}</p>
                                
                            </div>
                        </div>)
                    }
                </div>
            </div> 
        </div>
    );
};

export default Testimonials;