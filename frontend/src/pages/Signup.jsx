import { useState } from "react";

function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch(
            "http://127.0.0.1:8000/app/signup/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify(formData)
            }
        );

        const data = await response.json();

        alert(data.message || data.error);
    };

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
                Signup
            </button>

        </form>
    );
}

export default Signup;