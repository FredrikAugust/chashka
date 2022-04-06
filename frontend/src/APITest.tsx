import React, {FormEvent} from 'react'
import {useAuth0} from "@auth0/auth0-react";
import useRoles from "./useRoles";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {CoffeeType, createCoffeeType, fetchCoffeeTypes, mutationKeys, queryKeys} from "./api";


const APITest: React.FC = () => {
    const {getAccessTokenSilently, logout} = useAuth0()

    const roles = useRoles('https://chashka.com')

    const queryClient = useQueryClient()

    const {
        data,
        isLoading,
        error,
        isError
    } = useQuery<CoffeeType[], Error>(queryKeys.COFFEE_TYPES, fetchCoffeeTypes(getAccessTokenSilently))

    const {
        mutate,
        isLoading: mutationLoading
    } = useMutation(mutationKeys.CREATE_COFFEE_TYPE, async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const entity: Omit<CoffeeType, 'id'> = {
            name: formData.get('name') as string,
            characteristics: (formData.get('characteristics') as string).split(","),
            originCountry: formData.get('originCountry') as string
        }
        await (createCoffeeType(getAccessTokenSilently)(entity))
    }, {
        onSuccess: () => queryClient.invalidateQueries(queryKeys.COFFEE_TYPES)
    })

    return <>
        <h1>Coffee</h1>

        <div>
            <h2>Coffee types</h2>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {data && data.map(type => (
                    <div key={type.id}>
                        <small>{type.originCountry}</small>
                        <h3>{type.name}</h3>
                        <p>{type.characteristics.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>

        {roles?.includes("administrator") &&
            <form onSubmit={(event) => {
                event.preventDefault();
                mutate(event);
            }}>
                <div>
                    <label htmlFor={"name"}>Name</label>
                    <input type={"text"} name={"name"} id={"name"}/>
                </div>

                <div>
                    <label htmlFor={"originCountry"}>Origin country</label>
                    <input type={"text"} name={"originCountry"} id={"originCountry"}/>
                </div>

                <div>
                    <label htmlFor={"characteristics"}>Characteristics</label>
                    <input type={"text"} name={"characteristics"} id={"characteristics"}/>
                </div>

                <button disabled={mutationLoading} type={"submit"}>Create coffee type</button>
            </form>
        }

        <div>
            <h2>Roles</h2>
            <ul>
                {roles?.map(role => <li key={role}>{role}</li>)}
            </ul>
        </div>

        <hr/>

        <button onClick={() => logout()}>Sign out</button>
    </>

}

export default APITest