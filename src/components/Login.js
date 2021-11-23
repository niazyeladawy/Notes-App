import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Login() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
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
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin",user);
        if(data.message === "success"){
            setIsLoading(false);
            localStorage.setItem("notesToken",data.token)
            navigate('/');
        }
        else{
            setError(data.message);
            setIsLoading(false);
            
        }

    }
    return (
        <div className="login">
            <form onSubmit={submitData}>
                <input type="email" name="email" placeholder="email" className="form-control mb-3"  onChange={getUser}/>
                <input type="password" name="password" placeholder="password" className="form-control mb-3" onChange={getUser} />
                {error && 
                    <div className="alert alert-danger">{error}</div>
                }
                
                <button type="submit" className="btn btn-info text-white w-100" >{isLoading?<i className="fas fa-spinner fa-spin"></i>:"Login"}</button>
                
            </form>
        </div>
    )
}

export default Login
