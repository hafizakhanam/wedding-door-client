import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
       
       createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser) ;
            updateUserProfile(data.name, data.photoURL, )
            .then(() =>{
                
                const userInfo ={
                    name: data.name,
                    email: data.email,
                }
                console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res)
                    if(res.data.insertedId){
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User created successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                })
            })
            .catch(error => console.log(error))
        })
    };

    return (
        <>
            <Helmet>
                <title>Wedding Door | Sign Up</title>
            </Helmet>
            <div className="min-h-screen">  
                <div className="flex items-center justify-center mt-12">
                    <div className="md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100 p-4">
                        <h1 className="text-center text-3xl my-8">Please Sign UP</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            <div className="flex-col flex my-4">
                                <label className="mb-1">Name</label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="p-2 border" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="flex-col flex my-4">
                                <label className="mb-1">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="p-2 border" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="flex-col flex my-4">
                                <label className="mb-1">Email</label>
                                <input type="email" {...register("email", { required: true })} placeholder="Email" className="p-2 border" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="flex-col flex my-4">
                                <label className="mb-1">Password</label>
                                <input type="password" {...register("password", { required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])/})} placeholder="password" className="p-2 border" />
                                {errors.password?.type === "required" && (<p className="text-red-600">Password is required</p>)}
                                {errors.password?.type === "minLength" && (<p className="text-red-600">Password must be 6 characters</p>)}
                                {errors.password?.type === "maxLength" && (<p className="text-red-600">Password must be 6 less than characters</p>)}
                                {errors.password?.type === "pattern" && (<p className="text-red-600">Password must 1 uppercase, 1 lowercase, 1 number & 1 special character</p>)}
                                {errors.password && <span className="text-red-600"></span>}
                            </div>
                            <div className="text-center mt-6">
                                <input type="submit" value="Sign Up" className="w-full bg-green-500 text-white p-2" />
                            </div>
                        </form>
                        <p><small>Already have an account? <Link to="/login" className="text-green-500">Login</Link></small></p>

                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;