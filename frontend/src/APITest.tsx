import React from 'react'
import {useAuth0} from "@auth0/auth0-react";
import useRoles from "./useRoles";
import {useQuery} from "react-query";
import {CoffeeType, fetchCoffeeTypes, queryKeys} from "./api";


const APITest: React.FC = (props) => {
    const {getAccessTokenSilently, logout} = useAuth0()

    const roles = useRoles('https://chashka.com')

    const {data, isLoading, error, isError} = useQuery<CoffeeType[], Error>(queryKeys.COFFEE_TYPES, fetchCoffeeTypes(getAccessTokenSilently))

    const createCoffeeType = async () => {
        const token = await getAccessTokenSilently({audience: 'https://chashka.com'});
        try {
            const response = await fetch(`http://localhost:8080/coffeeType`, {
                headers: {'Authorization': `Bearer ${token}`},
                method: 'POST'
            });
            console.debug(await response.json());
        } catch (e) {
            console.error(e)
        }
    }

    return <>
        <div>
            <h2>coffee types</h2>
            {isLoading && <p>loading...</p>}
            {isError && <p>{error.message}</p>}
            <ul>
                {data && data.map(type => <li key={type.id}>{type.name}</li>)}
            </ul>
        </div>

        <div>
            <h2>roles</h2>
            <ul>
                {roles?.map(role => <li key={role}>{role}</li>)}
            </ul>
        </div>

        <hr/>

        <button onClick={() => createCoffeeType()}>create</button>

        <button onClick={() => logout()}>sign out</button>
    </>

}

export default APITest