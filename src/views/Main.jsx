import React, { lazy, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    container: {
        backgroundColor: '#ddd',
        display: 'flex',
        justifyItems: 'center',
        minHeight: '100vh',
        '&:nth-child(2)': {
            zIndex: 2            
        }
    }
});

export const Main =
    connect(store => ({
            loggedIn: store.user.loggedIn
        }))(
        withStyles(styles)(({ classes, loggedIn }) => (
            <div className={classes.container}>
                <Suspense fallback={<div></div>}>
                    
                </Suspense>
            </div>
        )));