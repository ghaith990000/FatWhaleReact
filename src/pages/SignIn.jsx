import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "./../firebase.js";
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input type='email' value={email} placeholder='Enter your email' 
                onChange={(e)=>setEmail(e.target.value)}/>

                <input type="password" value={password} placeholder='Enter your password'
                onChange={(e)=>setPassword(e.target.value)} />

                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default SignIn;