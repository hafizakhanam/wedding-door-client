import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";


const CkeckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransectionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    //const [bioData, refetch] = useBioData();
    //const navigate = useNavigate();
    const totalPrice = 500;
    const location = useLocation();
    const [bioDataId, setBiodataId] = useState();
    const [bioDataName, setBiodataName] = useState();

    useEffect( () =>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            console.log('payment error', error)
            setError(error.message);
        }
        else{
            console.log('Payment method', paymentMethod)
            setError('');
        }
        const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
//
        }
        else{
            if(paymentIntent.status === 'succeeded'){
                setTransectionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    reqBioDataId: location.state.id,
                    userBioDataId: bioDataId,
                    userBioDataName: bioDataName,
                    status: 'pending'
                }
                const res = await axiosSecure.post('/reqContacts', payment);
                //refetch();
                if(res.data.paymentResult.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your request is send to admin",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //navigate('/dashboard/paymentHistory');
                }
            }
        }
    }
    useEffect( () =>{
        axiosSecure.get(`bioData/me`)
        .then(res => {
            setBiodataId(res.data._id);
            setBiodataName(res.data.name)
        })
    },[])
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 mt-8">
                <div className="flex-col flex my-4">
                    <label className="mb-1">Requesting bio data Id</label>
                    <input defaultValue={location.state.id} name="reqBioDataId" type="text" className="p-2 border" readOnly />
                </div>
                <div className="flex-col flex my-4">
                    <label className="mb-1">Self bio data Id</label>
                    <input defaultValue={bioDataId} name="selfBioDataId" type="text" className="p-2 border" readOnly />
                </div>
                <div className="flex-col flex my-4">
                    <label className="mb-1">Self Email</label>
                    <input defaultValue={user.email} name="selfEmail" type="email" className="p-2 border" readOnly />
                </div>
            </div>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
             <button className="btn mt-4 bg-green-600 px-12 py-2 text-white" type="submit" disabled={!stripe || !clientSecret}>Request Contact</button>
             <p className="text-red-600">{error}</p>
             {
                transactionId  && <p className="text-green-600 mt-4">Your transaction id: {transactionId}</p>
             }
        </form>
    );
};

export default CkeckoutForm;