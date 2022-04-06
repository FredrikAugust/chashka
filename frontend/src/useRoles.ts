import {IdToken, useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";

const useRoles = (audience: string): string[] | undefined => {
    const {getIdTokenClaims} = useAuth0();

    const [idToken, setIdToken] = useState<IdToken>()

    useEffect(() => {
        (async () => {
            setIdToken(await getIdTokenClaims({audience: 'https://chashka.com'}))
        })()
    }, [getIdTokenClaims]);

    return idToken ? idToken[`${audience}/roles`] : undefined;
}

export default useRoles