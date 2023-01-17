import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav';
import auth from '../../firebase'
import { toast } from 'react-toastify';
import { getAuth, updatePassword } from 'firebase/auth';
import { LoadingOutlined } from '@ant-design/icons';

const UserPassword = () => {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password)
    let user = auth.currentUser;

    await updatePassword(user, password)
    .then(
      () => {
        // toast message
        setLoading(false);
        toast.success("Successfully updated password")
      }
    ).catch((err) => {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    })
  }

  const passwordUpdateForm = () => (

    <form className="text-center border border-light p-5" onSubmit={handleSubmit}>

      <input
        type="password"
        className="form-control mb-4"
        placeholder="Current Password"
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-4"
        placeholder="New Password"
        disabled={loading}
      />

      <button 
      className="btn btn-info btn-block my-4" 
      disabled={!password || password.length < 6 || loading}
      >
      {loading ? <LoadingOutlined /> : <span>Update Password</span>}
      </button>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Password update</h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>

  )
}

export default UserPassword;