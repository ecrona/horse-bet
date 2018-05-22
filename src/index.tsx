import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app'
import {AppContainer} from "react-hot-loader";

declare let module: { hot: any };
const rootElement = document.getElementById('app');

ReactDOM.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept(['./app.tsx'], () => {
        const NewApp = require('./app.tsx').App;
        ReactDOM.render(
            <AppContainer>
                <NewApp />
            </AppContainer>,
            rootElement
        )
    });
}