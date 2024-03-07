import { useState } from 'react';

import '../index.css';

export default function Task({ desc, onDelete }) {
    const [isDone, setIsDone] = useState(false);

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
            <div className="delete-button" onClick={handleDelete}>
                delete
            </div>
        </div>
    );
}
