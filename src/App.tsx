import React, {} from 'react';
import {Todolists} from "./components/Todolists/Todolists";
import {Header} from "./components/Header/Header";


export function App() {
    return (
        <div className="App">
            <Header />
            <Todolists />
        </div>
    );
}

