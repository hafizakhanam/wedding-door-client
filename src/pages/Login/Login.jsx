import { useContext} from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { useState } from 'react';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [loginErr, setLoginErr] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoginErr('');

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: "User Login Successful.",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
            navigate(from, {replace: true});
        })
        .catch(error =>{
            setLoginErr(error.message);
        })
    }

    return (
        <>
            <Helmet>
                <title>Wedding Door | Login</title>
            </Helmet>
            <div className="min-h-screen">  
                <div className="flex items-center justify-center mt-12">
                    <div className="md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100 p-4">
                    <h1 className="text-center text-3xl my-8">Please Login</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="flex-col flex my-4">
                                <label className="mb-1">Email</label>
                                <input type="email" name="email" placeholder="Your email" className="p-2 border" required />
                            </div>
                            <div className="flex-col flex my-4">
                                <label className="mb-1">Password</label>
                                <input type="password" name="password" placeholder="Your password" className="p-2 border" required />
                                <label className="mt-1">
                                    <a href="#" className="text-xs">Forgot password?</a>
                                </label>
                            </div>

                            <div className="text-center mt-6">
                                <input type="submit" value="Login" className="w-full bg-green-500 text-white p-2" />
                            </div>
                        </form>
                        {
                            loginErr && <p className="text-red-600 mt-2">{loginErr}</p>
                        }
                        <p><small>New here? <Link to="/signup" className="text-green-500">Create an Account</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;