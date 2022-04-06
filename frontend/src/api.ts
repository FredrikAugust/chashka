import {Auth0ContextInterface} from "@auth0/auth0-react";

type AuthenticatedQuery<T> = (getAccessTokenSilently: Auth0ContextInterface['getAccessTokenSilently']) => () => Promise<T>

export type CoffeeType = {
    id: number;
    name: string;
    originCountry: string;
    characteristics: string[]
}

export const fetchCoffeeTypes: AuthenticatedQuery<CoffeeType[]> = (getAccessTokenSilently) => {
    return async () => {
        const token = await getAccessTokenSilently({audience: 'https://chashka.com'});

        const response = await fetch(`http://localhost:8080/coffeeType`, {headers: {'Authorization': `Bearer ${token}`}});
        if (!response.ok) throw new Error("Could not fetch coffee types")
        return (await response.json() as CoffeeType[]);
    }
}

export const queryKeys = {
    COFFEE_TYPES: 'coffee_types'
}