import {Auth0ContextInterface} from "@auth0/auth0-react";

type AuthenticatedQuery<T> = (getAccessTokenSilently: Auth0ContextInterface['getAccessTokenSilently']) => () => Promise<T>
type AuthenticatedMutation<T, Params> = (getAccessTokenSilently: Auth0ContextInterface['getAccessTokenSilently']) => (params: Params) => Promise<T>

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

export const createCoffeeType: AuthenticatedMutation<number, Omit<CoffeeType, 'id'>> = (getAccessTokenSilently) => {
    return async (coffeeType) => {
        const token = await getAccessTokenSilently({audience: 'https://chashka.com'});

        const response = await fetch(`http://localhost:8080/coffeeType`, {
            headers: {Authorization: `Bearer ${token}`,'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(coffeeType)
        })
        if (!response.ok) throw new Error("Could not create coffee type");
        return (await response.json() as number);
    }
}

export const queryKeys = {
    COFFEE_TYPES: 'coffee_types'
}

export const mutationKeys = {
    CREATE_COFFEE_TYPE: 'create_coffee_type'
}