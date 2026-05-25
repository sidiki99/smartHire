import { useState } from "react";
function getCookie(name) {

    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {

            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {

                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );

                break;
            }
        }
    }

    return cookieValue;
}

function Signin() {
  

    const [formData, setFormData] = useState({
        username: "",
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
            "http://127.0.0.1:8000/app/login/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                   
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
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
                Login
            </button>

        </form>
    );
}

export default Signin;