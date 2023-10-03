import React from 'react';
import './ListTodo.scss';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';

class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making videos' },
            { id: 'todo3', title: 'Fixing bugs' },
        ],
        editTodo: {},



    }


    addNewTodo = (todo) => {
        // let currentListTodo = this.state.listTodos;
        // currentListTodo.push(todo);

        this.setState({
            listTodos: [...this.state.listTodos, todo],
            // listTodos: currentListTodo
        })

        toast.success("Wow so easy!")
    }

    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id);
        this.setState({
            listTodos: currentTodos
        })
        toast.success("Delele succeed!")
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        //save
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos];
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            listTodosCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })
            toast.success("Update todo succeed!")
            return;
        }

        //edit
        this.setState({
            editTodo: todo
        })


    }

    handleOnchangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render() {
        let { listTodos, editTodo } = this.state;
        // let listTodos = this.state.listTodos;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        console.log('>>> check empty object: ', isEmptyObj)
        return (
            <div className="list-todo-container">
                <h1>My Todos</h1>
                <AddTodo
                    addNewTodo={this.addNewTodo}
                />
                <div className="list-todo-content">
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {

                            return (
                                <div className="todo-child" key={item.id}>

                                    <>
                                        {editTodo.id === item.id ?
                                            <span className='span'>
                                                <input type="checkbox" />
                                                <input className='input-edit'
                                                    value={editTodo.title}
                                                    onChange={(event) => this.handleOnchangeEditTodo(event)}

                                                />
                                            </span>
                                            :
                                            <span className='span'>
                                                <input type="checkbox" />  {item.title}
                                            </span>
                                        }

                                    </>
                                    <button className="delete"
                                        onClick={() => this.handleDeleteTodo(item)}
                                    >Delete</button>
                                    <button className="edit"
                                        onClick={() => this.handleEditTodo(item)}>
                                        save
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )



    }

}

export default ListTodo;