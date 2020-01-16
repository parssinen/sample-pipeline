import React, { useState, useEffect, useParams } from 'react'

export default function Users() {
    const [userlist, setUserlist] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        const getUsersQuery = `query allUsers {
            users {
              id
              name
              password
              email
            }
          }`
        fetch("http://localhost:8080/v1/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({ query: getUsersQuery }),
        })
            .then(res => res.json())
            .then(json => {
                console.log('data', json.data.users)
                if (json.data.users) {
                    setUserlist(json.data.users)
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []); // <- empty array ensures this useEffect is ran only once

    return (<div>
        <div class="main-title">
            Users
        </div>
        <div class="main-content">
            {userlist.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
    </div>)
}