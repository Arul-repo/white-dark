import React from "react";

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { FormControl, ListItem, Select, MenuItem, colors } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    errorMsg: {
        color: colors.red[500],
        fontSize: "14px"
    }
})

const Input = props => {
    let inputElem = null;
    let validationError = null;
    const classes = useStyle();

    if( !props.isValid && props.isTouched ){
        validationError = props.elementConfig.placeholder + " is required";
    }
    switch (props.elementType) {
        case ( "textarea" ) :
            inputElem = <TextareaAutosize />
            break;
        case ( "input" ) :
            inputElem = <React.Fragment>
                <TextField label={props.elementConfig.placeholder} value={props.value} ref={props.reference} type={props.elementConfig.type} onChange={props.change} />
                <span className={classes.errorMsg}>{validationError}</span>
                </React.Fragment>
            break;
        case ( "select" ) :
            inputElem = (
                <Select value = {props.value} label = {props.elementConfig.placeholder} onChange={props.change}>
                    {props.elementConfig.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.displayValue}</MenuItem>
                    ))}
                </Select>
            );
            break;
        default:
            inputElem =  <React.Fragment> 
                <TextField label={props.elementConfig.placeholder} value={props.value} ref={props.reference} type={props.elementConfig.type} onChange={props.change} />
                <span className={classes.errorMsg}>{validationError}</span>
            </React.Fragment>
    }
    return(
        <ListItem>
            <FormControl  fullWidth variant="outlined">
                {inputElem}
            </FormControl>
        </ListItem>
    );
}

export default Input;