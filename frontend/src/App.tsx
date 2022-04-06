import React from 'react';
import './App.css';
import {Auth0Provider} from "@auth0/auth0-react";
import Main from "./Main";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider domain={"coach.eu.auth0.com"} clientId={"YcUTmokSnUlorc0NaRSlAvtgmdPzbGvq"}
                           audience={"https://chashka.com"} redirectUri={window.location.origin}>
                <Main/>
            </Auth0Provider>
        </QueryClientProvider>
    );
}

export default App;
