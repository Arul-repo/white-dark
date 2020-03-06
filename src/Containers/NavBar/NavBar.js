import React from "react";
import { Link } from "react-router-dom";
import * as MaterialUI from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import * as Color from "../Layout/Color";

const useStyles = makeStyles({
    toolBar: {
        backgroundColor: "#2874f0"
    },
    typographyH5: {
        flexGrow: 1,
        float: "left",
        color:Color.WHITE,
        "& a":{
            color:Color.WHITE,
            textDecoration: "none"
        }
    },
    typographyH7: {
        flexGrow: 1,
        float: "left",
        color:Color.WHITE,
        "& a":{
            color:Color.WHITE,
            textDecoration: "none"
        }
    }
});

const NavBar = props => {

    const classes = useStyles();

    return (
        <MaterialUI.AppBar >
            <MaterialUI.Toolbar className={classes.toolBar}>
                <MaterialUI.Typography variant = "h5" className ={classes.typographyH5}><Link to="/">WHITE DARK</Link> </MaterialUI.Typography>  
                <MaterialUI.Typography variant = "h6" className ={classes.typographyH7}><span>React - The Complete Guide (incl Hooks, React Router, Redux)</span></MaterialUI.Typography>
                {props.children}
            </MaterialUI.Toolbar>
        </MaterialUI.AppBar>
    );
}

export default NavBar;
