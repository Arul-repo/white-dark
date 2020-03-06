import React, { isValidElement } from "react";
import { Container, Grid, Input, Button } from "@material-ui/core";

import * as Icons from '@material-ui/icons';

import "./addItems.css";

class AddItems extends React.Component {

   state = ({
        forms: {
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
            age: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Age'
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 2
                }
            },
            deal: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Deal'
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
            eId: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Employee ID'
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    maxLength: 8
                }
            },
            reporting: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Reporting TO'
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
            contact: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'INFO'
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
            about: {
                elementType: "input",
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Phone'
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 200
                }
            },
            eMail: {
                elementType: "input",
                elementConfig: {
                    type: 'input',
                    placeholder: 'EMAIL'
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 30
                }
            }
        }
    });

    checkValidity = (values, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = values.trim() !== "" && isValid;
        }
        if(rules.minLength > 3){
            isValid = values.trim();
        }
        return isValid;
    }

    eventChange = (event, id) => {
        let getForms = {...this.state.forms}
        let updateForms = {...this.state.forms[id]}
        updateForms.value = event.target.value;
        updateForms.valid = this.checkValidity(updateForms.value, updateForms.validation);
        getForms[id] = updateForms;
        this.setState({forms: getForms});
    }

    addUser = (event) => {
        event.preventDefault();
        let postData={};

        for(let formdata in this.state.forms){
            postData[formdata] = this.state.forms[formdata].value;
        }
        console.log(postData);
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.forms){
            formElementArray.push({
            id: key,
            config: this.state.forms[key]
        });
    }
    let fields = <form  onSubmit={this.addUser} className="formSubmit" >
            {formElementArray.map((element, index) => {
                return <Grid item xs={6} key={index} style={{height:"50px"}}>
                    <Input
                        label={element.config.elementConfig.placeholder} 
                        onChange={(event) => this.eventChange(event, element.id)}
                        placeholder={element.config.elementConfig.placeholder}
                        value={element.config.value} />
                </Grid>
            })}
            <Grid item xs={12} className="submitGrid">
                <Button type="submit" className="submitBtn">Default <Icons.Send fontSize="small"/></Button>
            </Grid>
    </form>;

return (
        <Container style ={{height: "100%"}}>
            <Grid container spacing={3}>
                {fields}
            </Grid>
        </Container>
    );
}
}

export default AddItems;