import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "./../firebase.js";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpFunc = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className='sign-in-container'>
            <form onSubmit={signUpFunc}>
                <h1>Create an Account</h1>
                <input type='email' value={email} placeholder='Enter your email' 
                onChange={(e)=>setEmail(e.target.value)}/>

                <input type="password" value={password} placeholder='Enter your password'
                onChange={(e)=>setPassword(e.target.value)} />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;