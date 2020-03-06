import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as Color from "../../Containers/Layout/Color";

import NavBar from "../../Containers/NavBar/NavBar";
/* import Backdrop from "../../Containers/Backdrop/Backdrop"; */

const useStyles = makeStyles({
    customBtn: {
        color: Color.WHITE,
        "& a": {
            color: Color.WHITE,
            textDecoration: "none"
        },
        '&:hover': {
            backgroundColor: Color.RED
        }
    },
    link: {
        color: Color.WHITE,
        padding: "10px",
        textDecoration: "none",
        fontSize: "16px"
    }
});

const Header = props => {

    const classes = useStyles();
    let logText = props.onAuthState ? "LOGOUT" : "LOGIN & SIGNUP";

    return (
      // <Button className={classes.customBtn} onClick={props.onAuth}><NavLink to="#">{logText}</NavLink></Button>
      // <Button className={classes.customBtn} onClick={props.register}><NavLink exact to="/register">REGISTER</NavLink></Button>
      /* <Backdrop open={props.onAuthState} close={props.onAuth}><Login /></Backdrop> */
        <Container maxWidth={false} style = {{flexGrow: 1}}>
            <NavBar>
                <NavLink to="/dashboard" activeClassName="active" className={classes.link}>DASHBOARD</NavLink> | 
                <Button className={classes.customBtn} onClick={props.register}><NavLink exact to="/login">{logText}</NavLink></Button>
            </NavBar>
        </Container>
    );
}

export default Header;
