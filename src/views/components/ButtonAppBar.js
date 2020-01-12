import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{alignItems: 'center'}} position="static">
        <Toolbar>
          <RoomIcon/>
          <Typography variant="h5" className={classes.title}>
            Adventure Advisor
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}