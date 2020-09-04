import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    rootTabs: {
        flexGrow: 1,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    rootCard: {
        flexGrow: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        minHeight: '50vh'
    },
    persInfo: {
        margin: '10px'
    },
    avatar: {
        height: '100px',
        width: '100px',
        marginBottom: '40px'
    }
}))