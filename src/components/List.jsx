import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import Task from './Task';

import '../index.css';

export default function List() {
    const [taskInfo, setTaskInfo] = useState([]);
    const [timeInfo, setTimeInfo] = useState([]);
    const [archiveInfo, setArchiveInfo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputTime, setInputTime] = useState('');
    const [showArchive, setShowArchive] = useState(false);
    const [archiveDashText, setArchiveDashText] = useState('Go to archive');

    /*
    "onChange" means whenever you change the thing in the
    input field, aka whenever you just type something.
    updates input field with the thing you just typed in
    */
    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleTimeChange(event) {
        setInputTime(event.target.value);
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
        if (showArchive) {
            alert('Currently viewing archive. Your newly added task will be in the to-do list.');
        }
        const newTaskInfo = [...taskInfo, inputValue];
        const newTimeInfo = [...timeInfo, inputTime];
        setTaskInfo(newTaskInfo);
        setTimeInfo(newTimeInfo);
        setInputValue('');
        event.preventDefault();
    }

    function handleEdit(index, newDesc) {
        // Create a new array with the updated value at the specified index
        const newTaskInfo = taskInfo.map((item, i) => (i === index ? newDesc : item));
        setTaskInfo(newTaskInfo);
    }

    function handleArchiveEdit(index, newDesc) {
        // Create a new array with the updated value at the specified index
        const newArchiveInfo = archiveInfo.map((item, i) => (i === index ? newDesc : item));
        setArchiveInfo(newArchiveInfo);
    }

    function handleDelete(index) {
        const newTaskInfo = taskInfo.slice();
        newTaskInfo.splice(index, 1);
        setTaskInfo(newTaskInfo);
    }

    function handleArchiveDelete(index) {
        const newArchiveInfo = archiveInfo.slice();
        newArchiveInfo.splice(index, 1);
        setArchiveInfo(newArchiveInfo);
    }
    
    function handleArchive(index) {
        const newTaskInfo = taskInfo.slice();
        const archivedDesc = newTaskInfo.splice(index, 1);
        setTaskInfo(newTaskInfo);
        const newArchiveInfo = [...archiveInfo, archivedDesc];
        setArchiveInfo(newArchiveInfo);
    }

    function handleRestore(index) {
        const newArchiveInfo = archiveInfo.slice();
        const taskDesc = newArchiveInfo.splice(index, 1);
        setArchiveInfo(newArchiveInfo);
        const newTaskInfo = [...taskInfo, taskDesc];
        setTaskInfo(newTaskInfo);
    }

    const tasks = taskInfo.map((cur_desc, index) => {
        /*
        Each element in a react ordered list must have a unique id.
        For later: need to look at the specific mechanics behind this.
        Previously in development, using 'index' as the key would lead in
        tasks being rendered improperly after deletion / archiving--the
        array taskInfo was updated properly, but tasks would be rendered as
        if the last element in the array was the one being deleted / archived.
        */ 
        const taskId = uuidv4();
        const cur_time = timeInfo[index];
        return (
            <Task key={taskId} index={index} desc={cur_desc} time={cur_time} onEdit={handleEdit} onDelete={()=>handleDelete(index)} onArchive={()=>handleArchive(index)} isArchived={false}/>
        )
    });

    const archive = archiveInfo.map((cur_desc, index) => {
        /*
        Each element in a react ordered list must have a unique id.
        For later: need to look at the specific mechanics behind this.
        Previously in development, using 'index' as the key would lead in
        tasks being rendered improperly after deletion / archiving--the
        array taskInfo was updated properly, but tasks would be rendered as
        if the last element in the array was the one being deleted / archived.
        */ 
        const archiveId = uuidv4();
        return (
            <Task key={archiveId} index={index} desc={cur_desc} onEdit={handleArchiveEdit} onDelete={()=>handleArchiveDelete(index)} onArchive={()=>handleRestore(index)} isArchived={true}/>
        )
    })

    function handleGoToArchive() {
        if (!showArchive) {
            setArchiveDashText('Go back to to-do list');
        } else {
            setArchiveDashText('Go to archive');
        }
        setShowArchive(!showArchive);
    }

    return (
        <>
            <div className="list-title">
                <div>
                    Your fuckin TODO list bitch
                </div>
                <div className="list-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={inputValue} onChange={handleChange}/>
                        <input type="datetime-local" value={inputTime} onChange={handleTimeChange}/>
                        <input type="submit" value="Add task"/>
                    </form>
                    <div className="dash-button" onClick={handleGoToArchive}>
                        {archiveDashText}
                    </div>
                </div>
            </div>
            <div className={`${showArchive ? 'hidden' : ''}`}>
                <ol className={`task-list`}>
                    {tasks}
                </ol>
            </div>
            <div className={`${showArchive ? '' : 'hidden'}`}>
                <ol className={`task-list`}>
                    {archive}
                </ol>
            </div>
        </>
    );
}
