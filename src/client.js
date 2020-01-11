import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './views/App';
import theme from '../public/style/theme';
import {BrowserRouter} from 'react-router-dom'

function Main() {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles) {
                jssStyles.parentElement.removeChild(jssStyles);
            }
    }, []);

    return (
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <App />
            </ThemeProvider>
    );
}

ReactDOM.hydrate(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
    ,document.querySelector('#root')
);
