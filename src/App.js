import React, {useEffect, useState} from 'react';
import {Button,Breadcrumbs,FormControl,InputLabel,Input,Typography,Link} from '@material-ui/core'
import Todo from './Todo'
import db from './firebase'
import firebase from 'firebase'

import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc=> (
        {
          id: doc.id,
          task:doc.data().task
        }
        )))
    })
  },[])

  const addTodo = (event)=>{
    event.preventDefault();
    db.collection('todos').add({
      task:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setTodos([...todos,input]);
    setInput('');
    
  }


  return (
    <div className="App">
      <div className='todo_cases'>
      <Typography 
      variant='h3' 
      color='textSecondary' 
      align='center' 
      className='todo_header'
      gutterBottom
      >Todo App by Eftekar Raghib</Typography>
      <form className='todo_form'>
      <FormControl className='todo_input' gutterBottom>
      <InputLabel color="primary">Write a Todo</InputLabel>
      <Input  value={input} onChange={event => setInput(event.target.value)} />
      </FormControl>
      {' '}
      <Button disabled={!input} variant="contained" onClick={addTodo} color="primary">
      Add Todo
      </Button>
      </form>
      <ul>
        {todos.map(todo =>(
          <Todo todo={todo}/>
        ))}
      </ul>
      </div>
      <div className='todo_footer'>
    <Breadcrumbs className='todo_contact' aria-label="breadcrumb">
      <Link color="textPrimary" href="https://twitter.com/webmaster502" >
       Twitter
      </Link>
      <Link color="textPrimary" href="https://github.com/juniorEdris/todo-app-reactjs" >
      Github
      </Link>
      <Link
      color="textPrimary"
      href="https://www.fiverr.com/tonia_baumga"
      >
      Checkout Fiverr gig
      </Link>
      <Typography  variant='subtitle2'>
        Email: mdraghib17@gmail.com
      </Typography>
    </Breadcrumbs>
      </div>
    </div>
  );
}

export default App;

