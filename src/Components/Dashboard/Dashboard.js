import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as Icons from '@material-ui/icons';
import Style from "./Customcss";

import FullWidth from "../../Containers/Layout/FullWidth";
import Backdrop from "../../Containers/Backdrop/Backdrop";
import AddItems from "../Products/AddItems";

const styles = theme => (
    Style(theme)
);


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

class Dashboard extends React.Component {

    state = {
        dialog: false
    }

    componentDidMount() {

    }

    dialogHandler = () => {
        this.setState({
            dialog: !this.state.dialog
        })
    }

    render(){
        const { classes } = this.props;
        let users = false;

        let tableUsers = <div style={{textAlign: "center"}}>Currently, No User Data Avaiable</div>
        if(users){
            tableUsers = <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>;
        }

        return (
            <FullWidth>
                <div className={classes.root}> 
                    <Paper className={classes.paper}>
                        <Icons.Home/><Typography variant="h6" className={classes.heading}>DASHBOARD</Typography> 
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className={classes.addItem}>
                        <Button variant="contained" onClick={this.dialogHandler}className={classes.addBtn}><Icons.Add fontSize="small"/> ADD ITEM</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            {tableUsers}
                        </Grid>
                    </Grid>
                </div>
                <Backdrop open={this.state.dialog} onClose={this.dialogHandler}><AddItems /></Backdrop>
            </FullWidth>
        );
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);