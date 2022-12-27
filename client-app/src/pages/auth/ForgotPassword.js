import React, { useEffect, useState, useLayoutEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux"
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";



const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useLayoutEffect(() => {
        if (user && user.token) history.push('/');
    }, [user]);

    const auth = getAuth();

    const resetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const actionCodeSettings = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                alert("Password reset link is sent to your email!");
                setEmail('');
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("ERROR MESSAGE IN FORGOT PASSWORD", error);
                toast.error(error.message);
            });
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Password Reset</h4>

            <form onSubmit={resetPassword}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                />
                <br />
                <button
                    className="btn btn-raised"
                    disabled={!email}
                >
                    {loading ? <LoadingOutlined style={{ fontSize: '16px' }} /> : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword