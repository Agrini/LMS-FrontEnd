import React, {useState} from "react";
import { useHistory } from "react-router";
import LoginInputForm from "../Components/LoginInputForm";
import axios from "axios";

function AdminLogin(){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminDetails, setAdminDetails] = useState({});
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if(email==='' || password===''){

            if(email===''){
                setError("Email ID cannot be empty!");
            }else if(password===''){
                setError("Password cannot be empty");
            }else{
                setError("Feilds are Empty")
            }
            e.stopPropagation();
        }else{
      
            axios.get(`http://localhost:8080/adminLogin/${email}/${password}`)
            .then(res => {
                setAdminDetails(res.data);
                setError('');
                history.push("/adminPart")
            }).catch(err => setError(err.response.data))
      
          }
    };

    return(
        <div style={{padding: "2rem"}}>
            <center>
                <h1 className="display-5">Members Login</h1>
                <div style={{"width" : "80%", "paddingTop" : "2rem"}}>
                <form className="row g-3 needs-validation" style={{"justifyContent" : "center"}} noValidate>
                    <LoginInputForm
                        role="Admin"
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                    />
                </form>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
                </div>
                </div>
                <div style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: "50%"}}>
                            {error}
                        </div>
                    }
                </div>
            </center>
        </div>
    );

}

export default AdminLogin;