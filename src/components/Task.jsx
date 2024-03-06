import { useState } from 'react';

import '../index.css';

export default function Task({ desc }) {
    const [isDone, setIsDone] = useState(false);

    function handleDoneClick() {
        setIsDone(!isDone);
    }

    return (
        <div className="square">
            <div>
                { desc }
            </div>
            <div className="done-button" onClick={handleDoneClick}>
                {isDone ? 'X' : ''}
            </div>
        </div>
    );
}
