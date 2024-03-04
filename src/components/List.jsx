// import { useState } from 'react';

import '../index.css';

function Task() {
    return (
        <div className="square">
            Here is a task! motherfucker
        </div>
    );
}

export default function List() {
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
