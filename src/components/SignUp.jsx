import React  from "react";

function SignUp() {
    return (
        <div className="container mt-4">
        <h2 className="mb-4">Sign Up</h2>
        <form>
            <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        </div>
    );
    }
export default SignUp;