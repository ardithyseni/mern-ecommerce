import { getAuth, signInWithEmailLink } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
// import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, []) // If present, effect will only activate if the values in the list change.

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await signInWithEmailLink(auth, email, window.location.href)
            console.log("result: ", result)

            if (result.user.emailVerified) {
                // remove the email in local storage, 
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(user, password);
                const userTokenId = user.getIdTokenResult();
                // populate user in redux store, 
                console.log("user", user, "idTokenResult", userTokenId);
                // redirect
                history.push('/');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
            style={{ padding: '7px'}}
                type="email"
                className="form-control"
                placeholder="E-mail"
                value={email}
                disabled
            />
            
            <input
            style={{ padding: '7px', marginTop: '5px'}}
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
            />

            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                Complete Registration
            </button>
        </form>
    );


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete the Registration</h4>

                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;