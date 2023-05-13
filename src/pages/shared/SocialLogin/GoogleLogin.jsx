import React, { useContext } from 'react';
import { authContext } from '../../../providers/AuthProvider';

const GoogleLogin = () => {
    const {googleSignIn} = useContext(authContext);

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result =>{
            const loggedUser  = result.user;
            console.log(loggedUser);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
             <div className="divider">Or Sign Up with</div>
             <div className='text-center'>
             <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                G
             </button>
             </div>
        </div>
    );
};

export default GoogleLogin;