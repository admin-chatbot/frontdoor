import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiCall from "../../utils/apiCallHelper";
import {useState} from "react";


    type ICreateUserData = {
        email: string;
        password: string;
    }

    const SignIn = () => {
    const [formData, setFormData] = useState<ICreateUserData>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

    const handleSubmit = (data: any) => {
        console.log(data);
        navigate("/u")
    }
        const onHandleSubmit = async () => {
            console.log("Click");

            const config = {
                method: 'post',
                url: 'http://localhost:8080/api/v1/auth/login/', // Replace with your API endpoint
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: formData,
            };

            try {
                const response = await apiCall<ICreateUserData>(config);

                if (response.status === 200) {
                    console.log('API call successful:', response.data);
                    // Handle the successful response, e.g., store authentication token
                    navigate("/u");
                } else {
                    console.error('API call failed:', response.status, response.statusText);
                    // Handle errors
                    // Implement your error handling logic here
                }
            } catch (error) {
                console.error('API call failed:', error.message);
                // Handle errors
                // Implement your error handling logic here
            }
        };


        let errors;
        return (
            <div className="flex flex-col items-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onHandleSubmit();
                    }}
                    className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none"
                >
                    <p className="place-self-start font-semibold text-base text-[#5473E3]">Login to the system</p>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={
                            errors?.email
                                ? "block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                                : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
                        }
                    />
                    <span className="place-self-start text-[14px] text-[#C93B32]">{errors?.email?.message}</span>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={
                            errors?.password
                                ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                                : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
                        }
                    />
                    <span className="place-self-start text-[14px] text-[#C93B32]">{errors?.password?.message}</span>

                    <Link to="/forgotpassword" className="place-self-end hover:text-[#2347C5] hover:underline">
                        <p className="text-[#5473E3]">Forgot Password?</p>
                    </Link>

                    <button
                        type="submit"
                        className={`rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[25rem] p-3 mt-5 hover:bg-[#2347C5] mb-5`}
                    >
                        SIGN IN
                    </button>

                    <Link to="/signup" className="hover:text-[#2347C5] hover:underline">
                        <p className="text-[#5473E3] mb-5">Don't have an account? Sign up</p>
                    </Link>
                </form>
            </div>
        );


    }
export default SignIn;