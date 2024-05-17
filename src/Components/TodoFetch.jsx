import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid, TextField, Typography, Button, List, ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Card,
  CardHeader,
  Select,
  MenuItem,
  Radio,
} from '@mui/material'
import Key from './Clientvaribales.json'
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";


function TodoFetch() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodovalue] = useState("")
  const [notes, setNotes] = useState("")
  const [show, setShow] = useState(false)
  const [editTodo , seteditTodo] = useState("")
  const [editText , setEditText] = useState("")
  const [selectedType , setSelectedType] = useState("Incomplete")
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState('');
  const editDialogOpen = (todo) => {
    seteditTodo(todo)
    setShow(true)
  }
  const editDialogClose = () => {
    setShow(false)
  }
  const inputStyle = {
    margin: "30px",
    width: "70%",
    height: "30px",
    borderRadius: "50px",
    boxShadow: "0 0 5px white",
    padding: "10px",

  }
  const buttonStyle = {
    margin: "30px",
    padding: "1px 20px",
    borderRadius: "50px",
    boxShadow: "0 0 5px white",
    color: "white",

  }
 
  
  useEffect(() => {
    getTodos()
  }, [selectedType])
  const getTodos = () => {
    fetch(`${Key.domain}/getTodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json())
      .then((res) => {
        console.log(res)
        setTodos(res.data)
        filterTodos(res.data);
      }).catch((err) => {
        console.log(err)

      })
  }
  const filterTodos = (todos) => {
    let filtered = [];
    let message = '';

    switch (selectedType) {
      case 'Incomplete':
        filtered = todos?.filter((todo) => todo.completed === 0);
        message = '🎉✨ Hurrah! All tasks are completed! ✨🎉';
        break;
      case 'Completed':
        filtered = todos?.filter((todo) => todo.completed === 1);
        message = '😅🚀 Time to hustle! Get that work done, champ! 💼✏️';
        break;
      case 'Important':
        filtered = todos?.filter((todo) => todo.important === 1);
        message = '⭐️🌟Take a breather or focus on the essentials! 🌟⭐️';
        break;
      default:
        filtered = [];
        message = '';
    }

    setFilteredTodos(filtered);
    setNoTasksMessage(message);
  };

  const AddTodo = () => {
    if (todoValue !== "") {
      fetch(`${Key.domain}/createTodos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: todoValue,
          completed: 0,
          important: 0,
          add_to_day: 0,
          due_date: "",
          planned: 0,
          content: notes
        })
      }).then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            console.log("called")
            let msg = "Todo Created Successfully";
            getTodos()
            setTodovalue(" ")
          }
        }).catch((err) => {
          console.log(err)

        })
    }
    else {
      toast.error("Please enter a task");
    }
  }

  const deleteTodo = (todoID) => {
    console.log("tood", todoID)
    fetch(`${Key.domain}/deleteTodo`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todoID
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Todo deleted successfully");
          getTodos()
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  const EditTask = (todo) => {
    fetch(`${Key.domain}/updateTodo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todo?._id,
        title: editText,
        content: todo?.content,
        completed: todo?.completed,
        important: todo?.important,
        add_to_day: todo?.add_to_day,
        due_date: todo?.due_date,
        planned: todo?.planned,

      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && res.data.modifiedCount > 0) {
          toast.success("Todo edited successfully");
          getTodos()
          editDialogClose()
          setEditText("")
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  let handleSelectiontype = (e) => {
    setSelectedType(e.target.value)
    console.log(e.target.value)
  }
  const importantTask = (todo) => {
    fetch(`${Key.domain}/updateTodo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todo?._id,
        title: todo.title,
        content: todo?.content,
        completed: todo?.completed,
        important: todo.important === 0 ? 1 : 0,
        add_to_day: todo?.add_to_day,
        due_date: todo?.due_date,
        planned: todo?.planned,

      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && res.data.modifiedCount > 0) {
          toast.success("Todo updated successfully");
          getTodos()
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  const completeTask = (todo) => {
    fetch(`${Key.domain}/updateTodo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: todo?._id,
        title: todo.title,
        content: todo?.content,
        completed: todo?.completed === 0 ? 1 : 0,
        important: todo.important ,
        add_to_day: todo?.add_to_day,
        due_date: todo?.due_date,
        planned: todo?.planned,

      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && res.data.modifiedCount > 0) {
          toast.success("Todo updated successfully");
          getTodos()
        }
      }).catch((err) => {
        console.log(err)
      })
  }


  return (
    <>
      <Grid container spacing={1} sx={{ height: "100%", bgcolor: 'black', }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>
          <Grid elevation={2} sx={{ height: "100vh", width: "90vh", boxShadow: "0px 0px 10px grey" }} >
            <Typography variant='h5' sx={{ color: "white", textAlign: 'center', marginTop: "10px", }} >
              ToDo
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <input style={inputStyle} value={todoValue} onChange={(e) => { setTodovalue(e.target.value); console.log(e.target.value) }} />
              <Button style={buttonStyle} onClick={AddTodo}>AddTask</Button>
            </Box>
            <Card sx={{ bgcolor: 'black', color: "white", m: 3 }}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <CardHeader
                    title={
                      <Typography variant='h6' sx={{ color: 'white' }}>
                        {selectedType} Tasks
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={6} >
                  <Select sx={{ bgcolor: 'white' }}  value={selectedType} onChange={handleSelectiontype}>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                    <MenuItem value="Important">Important</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Card>
            
            {/* {
              selectedType === "Incomplete" ? (
                <List sx={{ margin: "0px 20px" }}>
                  {
                    IncompleteTodos?.length > 0 ? (
                      IncompleteTodos.map((todo) => (
                      <ListItemButton key={todo?._id} sx={{ boxShadow: "0px 0px 5px grey", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "white", textAlign: 'center', }} >
                          {todo.title}
                        </Typography>
                        <Box style={{ width: "100px", display: "flex", justifyContent: "space-around" }}>
                          <MdEdit color='white' onClick={() => editDialogOpen(todo)} />
                          {
                            todo.important === 0 ?
                              <FaRegStar color='white' onClick={() => importantTask(todo)} /> :
                              <FaStar color='white' onClick={() => importantTask(todo)} />
                          }

                          <MdDelete color='white' onClick={() => deleteTodo(todo?._id)} />

                        </Box>
                      </ListItemButton>
                    ))
                    ) : (
                      <Card sx={{ p: 2, bgcolor: 'black', color: "white" }}>
                        <Typography sx={{ fontWeight: "bold" }}>🎉✨ Hurrah! All tasks are completed! ✨🎉</Typography>
                      </Card>
                    )}
                </List>
              ) : selectedType === "Completed" ? (
                <List sx={{ margin: "0px 20px" }}>
                {
                  todos?.length > 0 ? (
                    todos.map((todo) => (
                      <ListItemButton key={todo?._id} sx={{ boxShadow: "0px 0px 5px grey", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ color: "white", textAlign: 'center', }} >
                          {todo.title}
                        </Typography>
                        <Box style={{ width: "100px", display: "flex", justifyContent: "space-around" }}>
                          <MdEdit color='white' onClick={() => editDialogOpen(todo)} />
                          {
                            todo.important === 0 ? 
                            <FaRegStar color='white' onClick={()=> importantTask(todo)} /> :
                            <FaStar color='white' onClick={()=> importantTask(todo)} />
                          }
                          <MdDelete color='white' onClick={() => deleteTodo(todo?._id)} />
                        </Box>
                      </ListItemButton>
                  ))
                      ) : (
                        <Card sx={{ p: 2, bgcolor: 'black', color: "white" }}>
                          <Typography sx={{ fontWeight: "bold" }}>😅🚀 Time to hustle! Get that work done, champ! 💼✏️</Typography>
                        </Card>
                      )}
              </List>
              ) : selectedType === "Important" ? (
                    <List sx={{ margin: "0px 20px" }}>
                      {importantTodos?.length > 0 ? (
                        importantTodos.map((todo) => (
                          <ListItemButton
                            key={todo?._id}
                            sx={{
                              boxShadow: "0px 0px 5px grey",
                              marginBottom: "10px",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <Typography sx={{ color: "white", textAlign: 'center' }}>
                              {todo.title}
                            </Typography>
                            <Box style={{ width: "100px", display: "flex", justifyContent: "space-around" }}>
                              <MdEdit color='white' onClick={() => editDialogOpen(todo)} />
                              {todo.important === 0 ? (
                                <FaRegStar color='white' onClick={() => importantTask(todo)} />
                              ) : (
                                <FaStar color='white' onClick={() => importantTask(todo)} />
                              )}
                              <MdDelete color='white' onClick={() => deleteTodo(todo?._id)} />
                            </Box>
                          </ListItemButton>
                        ))
                      ) : (
                        <Card sx={{p:2 }}>
                          <Typography sx={{fontWeight:"bold"}}>No Important Tasks to display</Typography>
                        </Card>
                      )}
                    </List>
              ) : ""
            } */}
            {/* <List sx={{ margin: "0px 20px" }}>
              {
                todos?.length > 0 && todos.map((todo) => {
                  return (
                    <ListItemButton key={todo?._id} sx={{ boxShadow: "0px 0px 5px grey", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ color: "white", textAlign: 'center', }} >
                        {todo.title}
                      </Typography>
                      <Box style={{ width: "100px", display: "flex", justifyContent: "space-around" }}>
                        <MdEdit color='white' onClick={() => editDialogOpen(todo)} />
                        {
                          todo.important === 0 ? 
                          <FaRegStar color='white' onClick={()=> importantTask(todo)} /> :
                          <FaStar color='white' onClick={()=> importantTask(todo)} />
                        }
                       
                        <MdDelete color='white' onClick={() => deleteTodo(todo?._id)} />
                       
                      </Box>
                    </ListItemButton>
                  )
                })
              }
            </List> */}
            <List sx={{ margin: "0px 20px" }}>
              {filteredTodos?.length > 0 ? (
                filteredTodos.map((todo) => (
                  <ListItemButton
                    key={todo?._id}
                    sx={{
                      boxShadow: "0px 0px 5px grey",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{ bgcolor:"black", color:"white",display: "flex",justifyContent: "space-between" }}>
                    <Radio
                              checked={todo.completed === 1}
                              onChange={() => completeTask(todo)}
                              size="small"
                              sx={{
                                color: 'white',
                                '&.Mui-checked': {
                                  color: 'white',
                                },
                              }}
                            />
                    <Typography sx={{ color: "white", textAlign: 'center' ,mt:1}}>
                      {todo.title}
                    </Typography>
                    </Box>
                   
                    <Box style={{ width: "100px", display: "flex", justifyContent: "space-around" }}>
                      <MdEdit color='white' onClick={() => editDialogOpen(todo)} />
                      {todo.important === 0 ? (
                        <FaRegStar color='white' onClick={() => importantTask(todo)} />
                      ) : (
                        <FaStar color='white' onClick={() => importantTask(todo)} />
                      )}
                      <MdDelete color='white' onClick={() => deleteTodo(todo?._id)} />
                    </Box>
                  </ListItemButton>
                ))
              ) : (
                <Card sx={{ p: 2, bgcolor: 'black', color: "white" }}>
                  <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>{noTasksMessage}</Typography>
                </Card>
              )}
            </List>
          

            <Dialog
              open={show}
              onClose={editDialogClose}
              fullWidth
              size="xs"
              scrollable={true}
            >
              <DialogTitle
                id="responsive-dialog-title"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <DialogContentText variant="h6" style={{ color: "#406882" }}>
                  Edit Task
                </DialogContentText>
                <IconButton aria-label="close" onClick={editDialogClose}>
                 X
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Box >
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    value={editText}
                    onChange={(e) => {
                      setEditText(e.target.value)
                    }}
                  />
                  {/* <TextField
                  id="outlined-basic"
                  label="Notes"
                  variant="outlined"
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value)
                  }}
                /> */}
                </Box>

              </DialogContent>
              <DialogActions>
                <Button onClick={editDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => EditTask(editTodo)} color="primary" autoFocus>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TodoFetch
{/* <Paper elevation={2}   style={{ background: 'linear-gradient(to right, rgb(90 80 125), rgb(37 37 68))',height: "600px", width: "800px" }} >
        {/* <Grid item xs={12}>
          Content of the Grid item
        </Grid> 
         <div style={{ width: '100%', height: '100%' }}>
          {/* Content of the Paper component
        </div>
       
      </Paper> */}