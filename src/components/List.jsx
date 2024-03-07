import { useState } from 'react';

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
        setTaskInfo(newTaskInfo);
    }

    const tasks = taskInfo.map((cur_desc, index) => {
        return (
            <Task key={index} desc={cur_desc} onDelete={()=>handleDelete(index)}/>
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
                    <input type="submit"/>
                </form>
            </div>
            <ol className="task-list">
                {tasks}
            </ol>
        </>
    );
}
