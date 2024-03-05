import { useState } from 'react';

import Task from './Task';

import '../index.css';

export default function List() {
    const [taskInfo, setTaskInfo] = useState([]);

    function handleAdd() {
        const newTaskInfo = [...taskInfo, 'new thing'];
        setTaskInfo(newTaskInfo);
    }

    const tasks = taskInfo.map((cur_desc, index) => {
        return (
            <Task key={index} desc={cur_desc}/>
        )
    });

    return (
        <>
            <div className="list-title">
                <div>
                    Your fuckin TODO list bitch
                </div>
                <button onClick={handleAdd} >Add a task bitch</button>
            </div>
            {/* <Task desc={template_desc} />
            <Task /> */}
            <ol>
                {tasks}
            </ol>
        </>
    );
}
