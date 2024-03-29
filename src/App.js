import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import usePrevious from "./usePrev";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = () => {

  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      // if this task has the same id as the edited task
      if (id === task.id) {
        // create a new object and toggle its completed property
        return { ...task, completed: !task.completed };
      }
      // return original object if it doesn't
      return task;
    });
    // update state with the new array
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    // add the tasks that don't match the id passed into the func, into a new array
    const remainingTasks = tasks.filter(task => id !== task.id);
    // set the state to the new array of remaining tasks
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        darkMode={darkMode}
      />
    )
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter} 
      darkMode={darkMode}
    />
  ));

  const addTask = (name) => {
    // put name into an object that has the same structure as our existing tasks
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    // add the newTask to a new array and update the state of the tasks data to this new state
    setTasks([...tasks, newTask]);
  };

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);  // track the length of the tasks state

  useEffect(() => {  // runs when the number of tasks changes
    // focuses on the listHeading if a task is deleted
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className={darkMode ? "todoapp stack-large dark" : "todoapp stack-large light"}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Form onSubmit={addTask} darkMode={darkMode}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading"
        tabIndex="-1"
        ref={listHeadingRef}
      >{headingText}</h2>
      <ul className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
};

export default App;
