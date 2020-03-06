import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {List, Button, Container, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import Input from "../Forms/Input";
import OneColumn from "../../Containers/Layout/Onecolumn";
import Spinner from "../../HelperComponents/Spinner/Spinner";
import * as actions from "../../Store/Actions/index";


const styles = theme => ({
  root: {
    padding: '30px 30px',
    backgroundColor: "#FFF",
    border: "1px solid #FFF",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important"
  },
  LoginBtn: {
    padding: "5px 30px",
    marginTop: "20px"
  },
  newUser: {
    margin: "auto",
    marginTop: "20px"
  }
});

class Login extends React.Component {
    state = {
        logForm: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: "",
                validation: {
                    required: true,
                    isMail: false
                },
                valid: false,
                isTouched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            }
        },
        formIsValid: false
    }
    loginHandler = e => {
      e.preventDefault();
      let loginData = [];
      for(let formdata in this.state.logForm){
        loginData[formdata] = this.state.logForm[formdata].value;
      }
      const signInAPI = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdRTbQTAu_U9tTONaKzj-SO7n6aU2gbbs";
      this.props.Authentication(loginData, signInAPI);
    }

    eventChange = (event, id) => {
        const getLogStates = {...this.state.logForm};
        const updateLogStates = {
            ...getLogStates[id]
        }
        updateLogStates.value = event.target.value;
        updateLogStates.isTouched = true;
        updateLogStates.valid = this.checkValidity(updateLogStates.value, updateLogStates.validation);
        getLogStates[id] = updateLogStates;
        let formIsValid = true;
        for(let fieldValid in getLogStates){
            formIsValid = getLogStates[fieldValid].isValid && formIsValid;
        }
        this.setState({ logForm: getLogStates, formIsValid: formIsValid });
    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
        let regEmail = /^.+@.+\..+$/;
        if(rules.isMail){
            isValid = regEmail.test(value.trim()) !== "" && isValid;
        }
        return isValid;
    }
    render() {
        const { classes } = this.props;
        let logArray = [];
        for (let key in this.state.logForm){
            logArray.push({
                id: key,
                config: this.state.logForm[key]
            });
        }
        let errorMsg = null;
        if(this.props.error){
              errorMsg = this.props.error;
        }
        let loginForm = <Container maxWidth="sm" className={classes.root}>
                <Typography variant="h6">SIGN IN HERE</Typography>
                {errorMsg}
                <form onSubmit={this.loginHandler}>
                    <List>
                        {logArray.map(element => {
                            return <Input key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={element.config.valid}
                            isTouched={element.config.touched}
                            change={(event) => this.eventChange(event, element.id)}
                            />
                        })}
                    </List>
                    <Button variant="contained" color="secondary" className={classes.LoginBtn} type="submit" /* disabled={!this.state.formIsValid} */ >Login</Button>
                </form>
                <Button className={classes.newUser}><NavLink exact to="/register">New User ? Create an account</NavLink></Button>
            </Container>;

            if(this.props.loading){
              loginForm = <Container maxWidth="sm" className={classes.root}><Spinner /></Container>
            }

          return (
            <OneColumn>
              {loginForm}
            </OneColumn>
          )
        }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    Authentication : (postData, signInAPI) => dispatch(actions.auth(postData, signInAPI))
  }
}

const getStatesToProps = state => {
  return {
    token: state.token,
    userId: state.userId,
    email: state.email,
    loading: state.loading,
    error: state.error
  }
}

export default connect(getStatesToProps, mapDispatchToProps)(withStyles(styles)(Login));
