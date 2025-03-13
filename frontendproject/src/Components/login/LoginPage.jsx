import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/loginCss.scss';



function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    const handelsubmit = (e) => {
        e.preventDefault();

        if(!email || !password){
            alert("Please fill in all fields")
        }

        let kitchen = localStorage.getItem("local");

        try {
            kitchen = kitchen ? JSON.parse(kitchen) : [];
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            kitchen = []; // Reset to empty array if data is corrupted
        }


        const usermatch = kitchen.find(user => user.email === email  && user.password === password);

        if (usermatch) {
            localStorage.setItem("isAuthenticated", "true"); 
            localStorage.setItem("loggedInUser", JSON.stringify(usermatch));
            alert("Login successful!");
            navigate("/dashboard");
            window.location.reload();
        } else {
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className='login-main' style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="login-box">
                <div className="card-login">
                    <div className="card-body-login login-card-body">
                        <div className="login-logo">
                            <b className=''>Login</b>
                        </div>
                        <form onSubmit={handelsubmit}>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control login-form-input" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                                <div className="input-group-text"><span className="bi bi-envelope "></span></div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); }}
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
                                <div className="col-xl-4 col-md-6 col-6">
                                    <div className="d-grid gap-2">
                                        <button className="btn login-btn">Log In</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="social-auth-links text-center mb-3 d-grid gap-3">
                            <p>- OR -</p>
                            <button className="btn facebook-btn">
                                <i className="bi bi-facebook me-2"></i> Sign in using Facebook
                            </button>
                            <button className="btn google-btn">
                                <i className="bi bi-google me-2"></i> Sign in using Google+
                            </button>
                        </div>
                        {/* <p className="mb-1 have"><Link to={'/forgot'} className='text-dark under'>I forgot my password</Link></p> */}
                        <p className="mb-0 have text-center">
                            <Link to={'/register'} className='text-dark under'> Don't have an account? Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
