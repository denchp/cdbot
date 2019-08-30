import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase/FirebaseContext.jsx';
import { ErrorHandler } from "./components";

const mainTheme = createMuiTheme({
    overrides: {
        MuiAvatar: {
            root: {
                cursor: 'pointer',
            },
            colorDefault: {
                backgroundColor: 'purple'
            }
        },
        MuiTab: {
            wrapper: {
                pointerEvents: 'none'
            }
        },
        MuiGrid: {
            item:{
                padding: '1em'
            }
        },
        MuiTextField: {
            root: {
                margin: '0 1em'
            }
        }
    },
    palette: {
        warning: '#ff0000',
        success: '#008000',
        secondaryContrast: 'white'
    },
});

ReactDOM.render((
    <FirebaseContext.Provider value={new Firebase()}>
        <ErrorHandler>
            <Provider store={reduxStore}>
                <Router>
                    <ThemeProvider theme={mainTheme}>
                        <Main />
                    </ThemeProvider>
                </Router>
            </Provider>
        </ErrorHandler>
    </FirebaseContext.Provider>
), document.getElementById('app-root'));