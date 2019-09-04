// 1) Redux classic style
// const mapStateToProps = (state)=> {
//     return {
//         todolist : state.todolist
//     }
// }

// const mapDispatchToProps = (dispatch)=> {
//     return {
//         addTodo : (todo) => dispatch(TodoActionCreator.addTodo(todo)),
//         deleteTodo : (no) => dispatch(TodoActionCreator.deleteTodo(no)),
//         toggleDone : (no) => dispatch(TodoActionCreator.toggleDone(no)),
//     }
// }

// const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);


// 2) react-redux hook style  hook? (7.1.0-alpha.5)
// useSelector()
// useDispatch()
// useStore()

//import { useDispatch, useSelector } from 'react-redux'
// const AppContainer = () => {
//     const dispatch = useDispatch()

//     var propsObject = {
//         todolist : useSelector(state => state.todolist),
//         addTodo : (todo) => dispatch(TodoActionCreator.addTodo(todo)),
//         deleteTodo : (no) => dispatch(TodoActionCreator.deleteTodo(no)),
//         toggleDone : (no) => dispatch(TodoActionCreator.toggleDone(no)),
//     }

//     return (
//         <App {...propsObject} />
//     );
// };

// export default AppContainer;