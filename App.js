import React from 'react';
import './index.css';
var todos = [{content: "todo1", completed: false, id: 1}, {content: "todo2", completed: false, id: 2}, {
    content: "todo3",
    completed: false,
    id: 3
}];

var id = 3;

var App = React.createClass({
    todosDisplay: todos,
    getInitialState(){
        return ({
            todos: todos,
            displayOption: 1
        });
    },
    addTodo(input){
        this.setState({
            todos: [{content: input, completed: false, id: ++id}, ...this.state.todos],
        });
    },
    markTodoChecked(id){

        this.setState({
            todos: this.state.todos.map(todo=> {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    },
    deleteTodo(id){
        this.setState({
            todos: this.state.todos.filter(todo => todo.id!==id)
        });
    },
    filterTodos(option){
        this.setState({
            displayOption: option
        });
    },
    updateTodosDisplay(){
        let option = this.state.displayOption;
        if (option === 1) {
            this.todosDisplay = this.state.todos.filter(todo => true);
        } else if (option === 2) {
            this.todosDisplay = this.state.todos.filter(todo => !todo.completed);
        } else{
            this.todosDisplay = this.state.todos.filter(todo => todo.completed);
        }
    },
    calculateItemsRemaining(){
        var count = 0;
        for (let todo of  this.state.todos) {
            count = count + +!todo.completed;
        }
        return count;
    },
    render(){
        this.updateTodosDisplay();
        return (
            <div>
                <div>
                    <InputBar onUserInput={this.addTodo}/>
                </div>
                <div className="todos-view">
                    <TodoList markTodoChecked={this.markTodoChecked} todos={this.todosDisplay}
                              deleteTodo={this.deleteTodo}/>
                    <Footer filterTodos={this.filterTodos} itemsRemaining={this.calculateItemsRemaining()}/>
                </div>
            </div>
        );
    }
});

var TodoList = React.createClass({
    render(){
        var arr = this.props.todos.map(todo => {
            return (<Todo key={todo.id} deleteTodo={this.props.deleteTodo} markTodoChecked={this.props.markTodoChecked}
                          todo={todo}/>);
        });
        return (<div>{arr}</div>);
    }
});

var Todo = React.createClass({
    markTodoChecked(){
        this.props.markTodoChecked(this.props.todo.id);
    },
    deleteTodo(){
        this.props.deleteTodo(this.props.todo.id);
    },
    render(){
        return (
            <div className={this.props.todo.completed ? 'checked todo' : 'todo'}>
                <input type="checkbox"
                       onClick={this.markTodoChecked}
                       defaultChecked={this.props.todo.completed?"checked":""}/>
                <div className="todo__content">{this.props.todo.content}</div>
                <button className="todo__delete" onClick={this.deleteTodo}>Delete</button>
            </div>);
    }
});

var InputBar = React.createClass({
    onUserInput(event){
        if (event.keyCode == 13) {
            var inputText = this.refs.input.value;
            this.props.onUserInput(inputText);
            this.refs.input.value = '';
        }
    },
    render(){
        return (<div className="input"><input className="input__field" ref="input" placeholder="Add todo"
                                              onKeyDown={this.onUserInput}/></div>);
    }
});

var Footer = React.createClass({
    onFooterClick(event){
        if (event.target.className === "footer-item")
            this.props.filterTodos(+event.target.id);
    },
    render(){
        return (<div>
            <div onClick={this.onFooterClick}>
                <span>{this.props.itemsRemaining} items remaining.</span>
                <button className="footer-item" id="1">All</button>
                <button className="footer-item"
                        id="2">Active
                </button>
                <button
                    className="footer-item" id="3">Completed
                </button>
            </div>
        </div>);
    }
});

export default App;