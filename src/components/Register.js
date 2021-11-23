import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Register() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
    });
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const getUser = ({target})=>{
        setUser({...user,[target.name]:target.value});
    }

    const submitData =async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup",user);
        if(data.message === "success"){
            setIsLoading(false);
            navigate('/login');
        }
        else{
            setError(data.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="register">
            <form onSubmit={submitData}>
                <input type="text" name="first_name" placeholder="first name" className="form-control mb-3"  onChange={getUser}/>
                <input type="text" name="last_name" placeholder="last name" className="form-control mb-3"  onChange={getUser}/>
                <input type="email" name="email" placeholder="email" className="form-control mb-3"  onChange={getUser}/>
                <input type="password" name="password" placeholder="password" className="form-control mb-3" onChange={getUser} />
                {error && 
                    <div className="alert alert-danger">{error}</div>
                }
                
                <button type="submit" className="btn btn-info text-white w-100" >{isLoading?<i className="fas fa-spinner fa-spin"></i>:"Register"}</button>
                
            </form>
        </div>
    )
}

export default Register
