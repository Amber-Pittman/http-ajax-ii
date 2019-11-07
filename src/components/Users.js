// Borrowed from Account.js

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import api from "../utils/api"

function Users(props) {
	const [users, setUsers] = useState([])

	useEffect(() => {
		api().get("/users")
			.then(result => {
				setUsers(result.data)
			})
			.catch(error => {
				console.log(error)
			})
    }, [])
    
    const handleDelete = (event, id) => {
        event.preventDefault()

        if (window.confirm("Are you sure you want to delete this user?")) {

        // get user object in case we need to restore it
        const user = users.find(user => user.id === id)

        // optimistic update
        setUsers(users.filter(user => user.id !== id))

        api().delete(`/users/${id}`)
            .then(result => {
                console.log("User was deleted")
                //setUsers(users.filter(user => user.id !== id)) --- moved up in case network is taking too long
            })
            .catch(error => {
                console.log(error)

                // put user back if the request wasn't successful
                setUsers([...users, user])
            })
    }
}

	return (
		<>
			<h1>Users</h1>
            {users.map(user => (
                <div key={user.id} className="account">
                    <Link className="account-update" to={`/users/${user.id}`}>Edit</Link>
                    <button className="account-delete" onClick={(event) => handleDelete(event, user.id)}>Delete</button> 
                                                        {/* using a callback here gets both params */}
                    <div className="account-row">Name: {user.name}</div>
                    <div className="account-row">Email: {user.email}</div>
                </div>
            ))}
		</>
	)
}

export default Users