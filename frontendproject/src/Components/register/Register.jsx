import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../register/registerCss.scss';

const local = [{
    email: "",
    password: ""
}]

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    let kitchen = localStorage.getItem('local');

    try {
        kitchen = kitchen ? JSON.parse(kitchen) : [];
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
        kitchen = []; // Reset to empty array if corrupted
    }



    const handelsubmit = (e) => {
        e.preventDefault();

        if (name == "" || name.length < 4 && email == "" && password == "" || password.length < 5) {
            alert("plese enter you details")
        }
        else{
        const user = { name: name, email: email, password: password }
        kitchen.push(user)
        localStorage.setItem('local', JSON.stringify(kitchen))
        console.log(kitchen)
        navigate('/login');
        }

    };

    return (
        <div className='register-main' style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="register-box">
                <div className="card-register">
                    <div className="card-body-register register-card-body">

                        <div className="register-logo">
                            <b>Register</b>
                        </div>
                        <form onSubmit={handelsubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className="input-group-text">
                                    <span className="bi bi-person" />
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-text">
                                    <span className="bi bi-envelope" />
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className='input-group-text'>
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6">
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn reg-btn">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="social-auth-links text-center mb-3 d-grid gap-3">
                            <p>- OR -</p>
                            <button className="btn facebook-btn">
                                <i className="bi bi-facebook me-2"></i>   Sign in using Facebook
                            </button>
                            <button className="btn google-btn">
                                <i className="bi bi-google me-2"></i>  Sign in using Google+
                            </button>
                        </div>
                        <p className="mb-0 text-center have">
                            <Link to={'/login'} className='text-dark under'>
                                Already have an account? Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
