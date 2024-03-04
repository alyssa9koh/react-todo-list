// import { useState } from 'react';

import Task from './Task';

import '../index.css';

export default function List() {
    return (
        <>
            <div className="list-title">
                <div>
                    Your fuckin TODO list bitch
                </div>
                <button>Add a task bitch</button>
            </div>
            <Task />
            <Task />
            {/* <ol>
                {tasks}
            </ol> */}
        </>
    );
}
