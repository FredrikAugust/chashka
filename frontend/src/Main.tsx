import React from 'react'
import {useAuth0} from "@auth0/auth0-react";
import APITest from "./APITest";

const Main: React.FC = () => {
    const {isLoading, error, isAuthenticated, loginWithRedirect} = useAuth0();

    if (isLoading)return <p>Loading...</p>
    if (error)return <p>Crikey! An error: {error.message}</p>

    if (isAuthenticated) {
        return <APITest/>
    }

    return <button onClick={loginWithRedirect}>sign in</button>
}

export default Main