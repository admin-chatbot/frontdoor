import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import regex from '../../utils/regex';
import notRed from "../../assets/not-red.svg";
import checkGreen from "../../assets/check-green.svg";
import apiCall from "../../utils/apiCallHelper";

export default function SignUp() {
    const navigate = useNavigate();
    type ICreateUserData = {
        email: string;
        password: string;
        clientName:string;

    }
    const [formData, setFormData] = useState({
        clientName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Clear the corresponding error when the input changes
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        const newErrors = {};

        if (!formData.clientName || formData.clientName.length < 3) {
            newErrors.name = "The name field must contain at least 3 characters.";
        }

        if (!formData.email || !formData.email.includes("@")) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            // If there are errors, update the errors state and stop form submission
            setErrors(newErrors);
            return;
        }
        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/auth/register/', // Replace with your API endpoint
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
        // Validation passed, perform form submission
        navigate("/registered");
        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center outline-none">
                <p className="place-self-start font-semibold text-base text-[#5473E3]">Register to the system</p>

                <input
                    type="text"
                    name="clientName"
                    placeholder="Complete Name"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className={
                        errors.name
                            ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                            : "block peer rounded-[5px] mt-5 border-[#AEBBCD] w-[25rem] focus:outline-none focus:ring-1"
                    }
                />
                <span className="place-self-start text-[14px] text-[#C93B32]">{errors.name}</span>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={
                        errors.email
                            ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                            : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
                    }
                />
                <span className="place-self-start text-[14px] text-[#C93B32]">{errors.email}</span>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={
                        errors.password
                            ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                            : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
                    }
                />
                <span className="place-self-start text-[14px] text-[#C93B32]">{errors.password}</span>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={
                        errors.confirmPassword
                            ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                            : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
                    }
                />
                <span className="place-self-start text-[14px] text-[#C93B32]">{errors.confirmPassword}</span>

                <button
                    type="submit"
                    className={`rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[25rem] p-3 mt-5 hover:bg-[#2347C5] mb-5`}
                >
                    SIGN UP
                </button>

                <Link to="/" className="hover:text-[#2347C5] hover:underline">
                    <p className="text-[#5473E3] mb-5">Already have an account? Sign in</p>
                </Link>
            </form>

            {/* ... (password rules display) */}
        </div>
    );
}
