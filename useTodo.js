
import { useReducer,useEffect } from "react"
import { todoReducer } from "../08-useReducer/ToDoReducer";

export const useTodo = () => {

    const initialState = [{
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false,
    },

    ];

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const [toDos, dispatchToDo] = useReducer(todoReducer, initialState, init);
    
    useEffect(() => {
      localStorage.setItem('todos',JSON.stringify(toDos) || []);
    }, [toDos])
    
    const pendingToDos = () =>{
        return toDos.filter(todo => !todo.done).length
    }

    const allToDos = () =>{
        return toDos.length
    }

    const handlerSubmit = (toDo) =>{
        const action = {
            type: 'Add Todo',
            payLoad: toDo,
        }
        dispatchToDo(action);
        
    }

    const handlerDeleteToDo = (id) =>{
        dispatchToDo({
            type: 'Delete Todo',
            payLoad: id,
        });
    }

    const handlerDoneToDo = (id) =>{
        dispatchToDo({
            type: 'Modify Done Todo',
            payLoad: id,
        });
        
    }


    return {
        toDos,
        handlerSubmit,
        handlerDeleteToDo,
        handlerDoneToDo,
        allToDos,
        pendingToDos,
    }
}
