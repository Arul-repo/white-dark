import React from "react";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';


const useStyles = theme => ({
    root: {
        display: "none"
      }

});

class OneColumn extends React.Component {
    render() {

        return (
            <Container component="main" maxWidth = "lg" spacing={1} style={{marginTop: "100px"}} className={this.props.root}>
                 <CssBaseline />
            <Grid container spacing={1} >
            {this.props.children}
            </Grid>
            </Container>
        );
   }
}

export default withStyles(useStyles)(OneColumn);
