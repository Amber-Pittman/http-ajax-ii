import React, { useState } from "react"
import api from "../utils/api"
function Signup(props) {
    const [error, setError] = useState()
    const [data, setData] = useState({
        email: "",
        password: "",
        name: '',
    })
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // We are using are axios instance with predefined values,
        // rather than just plain old axios
        api()
            .post("/signup", data)
            .then(result => {
                // Store our new token in local storage so it persists
                localStorage.setItem("token", result.data.token)
                // Redirect the user to their account page after logging in
                props.history.push("/account")
            })
            .catch(err => {
                setError(err.response.data)
            })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <input type="name" name="name" placeholder="Name" value={data.name} onChange={handleChange} />
            <input type="email" autoComplete="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} />
            <input type="password" autoComplete="current-password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
            
            <button type="submit">Sign Up</button>
        </form>
    )
}
export default Signup