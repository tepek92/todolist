import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

const root = createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>);

serviceWorker.unregister();
