import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import Task from './Task';

import '../index.css';

export default function List() {
    const [taskInfo, setTaskInfo] = useState([]);
    const [inputValue, setInputValue] = useState('');

    /*
    "onChange" means whenever you change the thing in the
    input field, aka whenever you just type something.
    updates input field with the thing you just typed in
    */
    function handleChange(event) {
        setInputValue(event.target.value);
    }

    /*
    Once the submit button is pressed, create a new task and
    add it to the list of tasks.
    */
    function handleSubmit(event) {
        if (inputValue === '') {
            alert('Input field is empty! Please add a basic description for your task.');
            event.preventDefault();
            return;
        }
        const newTaskInfo = [...taskInfo, inputValue];
        setTaskInfo(newTaskInfo);
        setInputValue('');
        event.preventDefault();
    }

    function handleDelete(index) {
        const newTaskInfo = taskInfo.slice();
        newTaskInfo.splice(index, 1);
        console.log(newTaskInfo);
        setTaskInfo(newTaskInfo);
    }
    
    function handleArchive(index) {
        console.log('poop');
    }

    const tasks = taskInfo.map((cur_desc, index) => {
        const taskId = uuidv4();
        return (
            <Task key={taskId} initDesc={cur_desc} onDelete={()=>handleDelete(index)} onArchive={()=>handleArchive(index)} isArchived={false}/>
        )
    });

    return (
        <>
            <div className="list-title">
                <div>
                    Your fuckin TODO list bitch
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={inputValue} onChange={handleChange}/>
                    <input type="submit" value="Add task"/>
                </form>
            </div>
            <ol className="task-list">
                {tasks}
            </ol>
        </>
    );
}
