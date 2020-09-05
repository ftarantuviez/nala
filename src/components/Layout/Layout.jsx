import React, {useState, useEffect} from 'react'
import {Grid, Typography, List, ListItem, LinearProgress ,ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton, Avatar} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import {makeStyles} from '@material-ui/core/styles'
import {db} from '../../firebase'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        height: '100%',
        background: '#7182de',
        color: 'white',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
    title: {
        padding: theme.spacing(4, 0, 2),
        textAlign: 'center',
        background: '#7182de',
        color: 'white'
    },
    exList: {
        height: 'calc(100vh - 160px)',
        zIndex: '1000'
    },
    gridMain: {
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: 'calc(100vh - 64px)',
        padding: '40px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Layout = (props) => {
    const classes = useStyles()
    const [sheets, setSheets] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = React.useState({open: false, id: ''});

    useEffect(() => {
        if(props.uid){
            db.collection('users').doc(props.uid).collection('sheets')
            .onSnapshot(snapshot => {
                setSheets(snapshot.docs.map(doc => ({data: doc.data(), id: doc.id})))
                setLoading(false)
            })
        }
    }, [props.uid])

    return(
        <Grid container>
            <Slide direction="up" in={props.openList} mountOnEnter unmountOnExit>
            <Grid item xs={12} md={3} className={classes.exList}>
                <Typography variant="h6" className={classes.title}>
                    Tus plantillas <IconButton onClick={() => {props.handleClick('', true); props.setOpenList(false)}}><LibraryAddIcon style={{color: 'white'}} /></IconButton>
                </Typography>
                <div className={classes.demo}>
                    <List>
                    {
                        loading
                        ? <LinearProgress />
                        : (<>
                            {sheets.map(sheet => (
                                <ListItem key={sheet.id} button onClick={() => {props.handleClick(sheet.id);  props.setOpenList(false)}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={sheet.data.name}
                                    />
                                    <ListItemSecondaryAction onClick={() => setOpenModal({open: true, id: sheet.id})}>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon style={{color: 'white'}} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </>)
                    }
                    </List>
                </div>
            </Grid>
            </Slide>

            <Grid item xs={12} md={props.openList ? 9 : 12} className={classes.gridMain}>
                {props.children}
            </Grid>

            <Dialog
                open={openModal.open}
                TransitionComponent={Transition}
                onClose={() => setOpenModal({open: false, id: ''})}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"ALERT! Estas segur@?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Una vez eliminado, el archivo no podra ser restablecido.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenModal({open: false, id: ''})} color="primary">
                    Disagree
                </Button>
                <Button onClick={() => {props.handleDelete(openModal.id); setOpenModal({open: false, id: ''})}} color="primary">
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

        </Grid>
    )

}