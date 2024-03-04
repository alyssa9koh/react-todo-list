// import { useState } from 'react';

import Task from './Task';

import '../index.css';

export default function List() {
    // meow
    return (
        <>
            <div className="list-title">
                Your fuckin TODO list bitch
            </div>
            <Task />
            <Task />
            {/* <ol>
                {tasks}
            </ol> */}
        </>
    );
}
