import React from 'react';
import bugerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = (props) => (
    <div className={classes.Logo} >
        <img src = {bugerLogo} alt = "buger logo"/>
    </div>
);

export default logo;