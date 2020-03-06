import React from "react";
import {Dialog, DialogContent} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import "./backdrop.css";

const useStyle = makeStyles({
    close: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        cursor: "pointer"
    }
});

const Backdrop = props => {
    const classes = useStyle();
    return(
        <Dialog open={props.open} fullWidth="true" maxWidth="lg" >
            <Icons.CloseOutlined className={classes.close} onClick = {props.onClose}/>
            <DialogContent >
                {props.children}
            </DialogContent>
        </Dialog>
    );
}

export default Backdrop;