import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                navigate('/');
            })
        })
    }
    return (
        <div className="p-6">
            <div className="border-t border-b text-center">or</div>
            <div className="text-center mt-4">
                <button onClick={handleGoogleSignIn} className="p-2 bg-green-500 text-white">
                    <FaGoogle className="inline mr-2"></FaGoogle>Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;