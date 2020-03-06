import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../Forms/Input";
import OneColumn from "../../Containers/Layout/Onecolumn";
import { Container, Typography, Button, List, Grid } from "@material-ui/core";
import Spinner from "../../HelperComponents/Spinner/Spinner";
import Backdrop from "../../Containers/Backdrop/Backdrop";
import "../../Styles/authentication.css";

import * as actions from "../../Store/Actions/index";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    state = {
        regForm:{
            name: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                }
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: "",
                valid: false,
                validation: {
                    required: true,
                    maxLength: 20,
                    isMail: true
                },
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: "",
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                touched: false
            },
            phone: {
                elementType: "input",
                elementConfig: {
                    type: 'number',
                    placeholder: 'Phone Number'
                },
                value: "",
                valid: false,
                validation: {
                    required: true,
                    isNum: true,
                    maxLength: 10
                },
                touched: false
            },
            country: {
                elementType : "select",
                elementConfig : {
                    options : [
                        {value: "INDIA", displayValue: "INDIA"},
                        {value: "UNITED STATES", displayValue: "UNITED STATES"},
                        {value: "UNITED KINGDOM", displayValue: "UNITED KINGDOM"}
                    ]
                },
                value: "",
                valid: true,
                validation: "",
                touched: ""
            },
        },
        formIsValid: false,
        RegisterMsg: false
    }

    checkValidity  = (values, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = values.trim() !== "" && isValid;
        }
        if(values.length <= rules.minLength){
            isValid = values.trim() !== "" && isValid;
        }
        if(values.length >= rules.maxLength){
            isValid = values.trim() !== "" && isValid;
        }
        let regEXP01 = /^.+@.+\..+$/;
        if(rules.isMail){
            isValid = regEXP01.test(values.trim()) && isValid;
        }
        let regEXP02 = /^\d+$/;
        if(rules.isNum){
            isValid = regEXP02.test(values.trim()) && isValid;
        }
        return isValid;
    }

    eventChange = ( event, formItem ) => {
        const getRegForm = {...this.state.regForm};
        const updateRegForm = {
            ...getRegForm[formItem]
        }
        updateRegForm.value= event.target.value;
        updateRegForm.valid = this.checkValidity(updateRegForm.value, updateRegForm.validation);
        updateRegForm.touched = true;
        getRegForm[formItem] = updateRegForm;

        let formIsValid = true;

        for (let inputName in getRegForm){
            formIsValid = getRegForm[inputName].valid && formIsValid;
        }
        this.setState({regForm: getRegForm, formIsValid: formIsValid});
    }

    regHandler = event => {
        event.preventDefault();
        const postData = {};
        for(let formdata in this.state.regForm){
            postData[formdata] = this.state.regForm[formdata].value;
        }
        let signupAPI = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdRTbQTAu_U9tTONaKzj-SO7n6aU2gbbs";
        this.props.Authentication(postData, signupAPI);
    }

    componentDidMount(){
        this.textInput.current.focus();
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.regForm){
            formElementArray.push({
                id: key,
                config: this.state.regForm[key]
            });
        }
        let errMsg = null;
        if(this.props.error){
            errMsg = this.props.error;
        }
        let form;
        if(this.state.RegisterMsg){
            form = <Backdrop><Grid container spacing={1} >
                    <Typography style={{padding: "10px 30px", color: "green"}}>
                        Your are registered successfully. So please login
                    </Typography>
                    </Grid>
                </Backdrop>
        }else{
            form = <Container maxWidth="sm" className="authContainer">
                {errMsg}
            <form onSubmit={this.regHandler} style ={{marginTop: "30px", margin: "auto"}}>
            <Typography variant="h4" style={{width: "100%"}}>Register Here</Typography>
                <List>
                    {formElementArray.map( element => {
                        return <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        isValid={element.config.valid}
                        isTouched={element.config.touched}
                        reference = {this.textInput}
                        change={(event) => this.eventChange(event, element.id)} />
                    })}
                </List>
                <Button variant="contained" color="secondary" type="submit" style={{marginTop: "20px"}} disabled={!this.state.formIsValid}>REGISTER USER</Button>
            </form>
            <Button style={{textAlign: "center", marginTop: "20px"}}><NavLink exact to="/Login">Existing User ? Login</NavLink></Button>
            </Container>;
        }
        if(this.props.loading){
            form = <Container maxWidth="sm" className="authContainer"><Spinner /></Container>
        }
        return (
            <OneColumn>
              {form}
            </OneColumn>
        );
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

const mapDispatchToProps = dispatch => {
  return {
    Authentication: (formData, signupAPI) => dispatch(actions.auth(formData, signupAPI))
  }
}

export default connect(getStatesToProps, mapDispatchToProps)(Register);
