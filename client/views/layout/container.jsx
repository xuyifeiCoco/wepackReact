import React from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  }
}
const Container = ({ classes,children }) => {
  return (
    <Paper elevation={4} className={classes.root}>
        {children}
    </Paper>
  );
}

Container.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default withStyles(styles)(Container)
