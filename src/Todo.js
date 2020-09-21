import React, {useState} from 'react'
import {Avatar,Modal, List, ListItem, ListItemText,ListItemAvatar, Button,FormControl,Input} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase'
import './Todo.css'
function Todo({todo}) {
    
    const useStyles = makeStyles((theme) => ({
        paper: {
        position: 'absolute',
        left:500,
        top:120,
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:'flex',
        justifyContent:'center'
        },
    }));
    const classes = useStyles()
    const [open,setOpen] = useState(false);
    const [input, setInput] = useState('');
    

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const updateTodo = () =>{
        
        db.collection('todos').doc(todo.id).set({
            task:input
        },{merge:true})
        setInput('');
        handleClose()
    }

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            >
                <div className={classes.paper}>
                    <FormControl>
                    <Input placeholder={todo.task} value={input} onChange={e => setInput(e.target.value)} />
                    </FormControl>
                    <Button disabled={!input} color='primary' onClick={updateTodo}>Update</Button>
                </div>
            </Modal>
            <List className='todo_list'>
                <ListItem className='todo_list_item'>
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={todo.task} secondary='Todo'/>
                    <Button color='danger' onClick={e => db.collection('todos').doc(todo.id).delete()}>Delete</Button>
                </ListItem>
                <Button onClick={handleOpen}>Edit</Button>
            </List>
        </div>
    )
}

export default Todo
