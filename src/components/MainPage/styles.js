import {makeStyles} from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
    container: {
        height: '100%'
    },
    paper: {
        width: '100%',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paperFirstChart: {
        width: '100%',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paperList: {
        position: 'absolute',
        width: '100%',
        height: '824px',
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            height: '400px'
        }

    },
    paperDonut: {
        background: '#3f51b5',
        width: '100%',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    listEmployes: {
        width: '100%'
    },
    title: {
        margin: theme.spacing(3, 0, 2),
        textAlign: 'center'
    },
    titleDonut: {
        textAlign: 'center',
        marginBottom: '35px',
        color: "white"
    }
}))