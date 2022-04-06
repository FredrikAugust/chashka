import React from 'react'
import {useAuth0} from "@auth0/auth0-react";
import APITest from "./APITest";

const Main: React.FC = () => {
    const {isLoading, error, isAuthenticated, loginWithRedirect} = useAuth0();

    if (isLoading)return <code>loading...</code>
    if (error)return <code>shit! {error.message}</code>

    if (isAuthenticated) {
        return <APITest/>
    }

    return <button onClick={loginWithRedirect}>sign in</button>
}

export default Main