import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function Navbar() {
  const useStyles = makeStyles({
    nav: {
      backgroundColor: "#464159"
    },
    link: {
      color: "white",
      textDecoration: "none"
    }
  });

  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="fixed">
      <Toolbar>
        <Typography>Activity Tracker</Typography>
        <Tabs>
          <Link className={classes.link} to="/">
            <Tab label="Activities" />
          </Link>
          <Link className={classes.link} to="/create">
            <Tab label="Add Activity" />
          </Link>
          <Link className={classes.link} to="/user">
            <Tab label="Create User" />
          </Link>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
