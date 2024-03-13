import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BASE_URL ='https://65f10685da8c6584131cbb95.mockapi.io'

function Edit() {
    const { id } = useParams()
    const [todo, setTodo] = useState({
        name: ''
    })

    async function fetchTodo(todoId) {
        try {
          const response = await axios.get(`${BASE_URL}/todos/${todoId}`)
          setTodo(response.data)
        } catch (error){
          console.log('error', error)
        }
      }

    useEffect(() => {
        fetchTodo(id)
    }, [id])
    
    function handleNameChange(event){
        setTodo((previousState) => ({
            ...previousState,
            name: event.target.value
        }))
    }

    async function updateName(){
        try {
            await axios.put(`${BASE_URL}/todos/${id}`, {
                name: todo.name
            })
            alert('Update Successful!')
          } catch (error){
            console.log('error', error)
          }
        }
    

    return (
        <>
            <div>Hello Edit page {id}</div>
            <div>{todo.name}</div>
            <div>
                <input 
                type='text'
                onChange={handleNameChange} 
                value={todo.name}></input>
                {todo.status}
            </div>
            <button onClick={updateName}>Edit</button>
        </>
    )
}

export default Edit