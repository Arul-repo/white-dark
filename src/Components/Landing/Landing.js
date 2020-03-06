import React from "react";
import OneColumn from "../../Containers/Layout/Onecolumn";
import { Typography } from "@material-ui/core";

const Landing = props => {
    return (
        <OneColumn>
            <Typography variant="h6">
            Imagine that you’re a top singer, and fans ask day and night for your upcoming single.
            To get some relief, you promise to send it to them when it’s published. 
            You give your fans a list to which they can subscribe for updates. 
            They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, if plans to publish the song are cancelled, they will still be notified.
            </Typography>
        </OneColumn>

    );
}

export default Landing;