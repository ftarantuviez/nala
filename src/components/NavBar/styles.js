import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: '64px !important'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'block',
    },
    header: {
      justifyContent: 'center',
      height: '64px !important'
    },
    title: {
      flexGrow: 1,
    },
  }));