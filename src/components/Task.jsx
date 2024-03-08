import { useState } from 'react';

import '../index.css';

export default function Task({ initDesc, onDelete }) {
    const [isDone, setIsDone] = useState(false);
    const [desc, setDesc] = useState(initDesc);

    function handleDone() {
        setIsDone(!isDone);
    }

    function handleDelete() {
       onDelete();
    }

    return (
        <div className="square">
            <div className="done-button" onClick={handleDone}>
                {isDone ? 'X' : ''}
            </div>
            <div className="desc">
                { desc }
            </div>
            <div className="button-container">
                <div className="task-button">
                    edit
                </div>
                <div className="task-button" onClick={handleDelete}>
                    delete
                </div>
            </div>
        </div>
    );
}
