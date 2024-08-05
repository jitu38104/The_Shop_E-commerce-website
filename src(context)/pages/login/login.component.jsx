import { Fragment, useEffect, useState } from "react";
import {getRedirectResult} from "firebase/auth";
import {
    auth,
    signInWithGooglePopup, 
    createUserDocFromAuth,
    createUserAuthWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils";

import "./login.styles.scss";

const signUpFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPass: ""
};

const signInFormFields = {
    userEmail: "",
    userPassword: ""
};


const Login = () => {
    const [alertMsg, setAlertMsg] = useState({flag: "", msg: ""});
    const [loginFields, setLoginFields] = useState(signInFormFields);
    const [formFields, setFormFields] = useState(signUpFormFields);
    const {name, email, password, confirmPass} = formFields;
    const {userEmail, userPassword} = loginFields;
    
    const resetForm = (formType) => {
        if(formType=="login") setLoginFields(signInFormFields);
        else setFormFields(signUpFormFields);
    }

    const signUpChangeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInChangeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setLoginFields({...loginFields, [name]: value});
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        try {
            const {user} = await createUserAuthWithEmailAndPassword(email, password);
            const userDocRef = await createUserDocFromAuth(user, {displayName: name});
            resetForm("register");
            setAlertMsg({
                flag: "success",
                msg: "User has been created successfully. Congratulations!"
            });
        } catch (error) {
            setAlertMsg({
                flag: "danger",
                msg: error.code == "auth/email-already-in-use" ? "User cannot be registered because email is already exists!": error.code
            });
        }
        setTimeout(() => {setAlertMsg({flag: "", msg: ""})}, 5000);
    }

    const signInHandler = async(e) => {
        e.preventDefault();

        try {
            const {user} = await logInWithEmailAndPassword(userEmail, userPassword);
            resetForm("login");
            setAlertMsg({
                flag: "success",
                msg: "Yor are successfully login. Congratulations!"
            });
        } catch (error) {
            setAlertMsg({
                flag: "danger",
                msg: error.code == "auth/invalid-credential" ? "Either email or password is wrong!": error.code
            });
        }
        setTimeout(() => {setAlertMsg({flag: "", msg: ""})}, 5000);
    }

    useEffect(() => {
        (async() => {
            try {
                const response = await getRedirectResult(auth);
                
                // if(response) { const userDocRef = await createUserDocFromAuth(response.user); }
            } catch (error) {
                console.log(error.code);
            }
        })();
    }, []);

    const authGoogleUser = async() => {
        try {
            const response = await signInWithGooglePopup();
            // const userDocRef = await createUserDocFromAuth(response.user);
        } catch (error) {
            console.log(error.code);
        }
    }


    return (
        <Fragment>
            <div className={`alert alert-${alertMsg.flag} ${alertMsg.msg=="" && "d-none"}`} role="alert">{alertMsg.msg}</div>

            <div className="login-container pt-5 w-75 mx-auto d-flex align-items-start justify-content-evenly">
                <div className="signin-container">
                    <div className="heading-box">
                        <h4>I already have an account</h4>
                        <p>Sign in with your email and password.</p>
                    </div>

                    <div className="form-box">
                        <form onSubmit={signInHandler}>
                            <div className="input-field">
                                <input type="email" onChange={signInChangeHandler} name="userEmail" value={userEmail} placeholder="Email" />
                                <p className="error">Email feild is required!</p>
                            </div>

                            <div className="input-field">
                                <input type="password" onChange={signInChangeHandler} name="userPassword" value={userPassword} placeholder="Password" />
                                <p className="error">Password feild is required!</p>
                            </div>

                            <div className="button-container mt-5">
                                <button className="btn btn-dark me-2" type="submit">SIGN IN</button>
                                <button className="btn btn-primary" type="button" onClick={authGoogleUser}>SIGN IN WITH GOOGLE</button>
                                {/* <button className="btn btn-primary" onClick={signInWithGoogleRedirect}>SIGN IN WITH GOOGLE REDIRECT</button> */}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="register-container">
                    <div className="heading-box">
                        <h4>I have no account</h4>
                        <p>Sign up with your email</p>
                    </div>

                    <div className="form-box">
                        <form onSubmit={submitHandler}>
                            <div className="input-field">
                                <input type="text" onChange={signUpChangeHandler} name="name" value={name} placeholder="Display Name" />
                                <p className="error">Name feild is required!</p>
                            </div>

                            <div className="input-field">
                                <input type="email" onChange={signUpChangeHandler} name="email" value={email} placeholder="Email" />
                                <p className="error">Email feild is required!</p>
                            </div>

                            <div className="input-field">
                                <input type="password" onChange={signUpChangeHandler} name="password" value={password} placeholder="Password" />
                                <p className="error">Password feild is required!</p>
                            </div>

                            <div className="input-field">
                                <input type="password" onChange={signUpChangeHandler} name="confirmPass" value={confirmPass} placeholder="Confirm Password" />
                                <p className="error">Confirm password feild is required!</p>
                            </div>

                            <div className="button-container mt-5">
                                <button type="submit" className="btn btn-dark">SIGN UP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
