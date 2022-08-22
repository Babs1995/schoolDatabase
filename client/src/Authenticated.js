import React, { UseContext } from 'react';
import Context from './components/Context';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const context = UseContext(Context)
    const authUser = context.authUser
    
    return(
        <div className='bonds'>
            div className="grid-100"{'>'} 
            <h1>{authUser.name} has been verified! </h1>
            <p>New username is {authUser.username}</p>
        </div>
    );
}