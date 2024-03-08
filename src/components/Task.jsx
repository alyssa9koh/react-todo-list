import { useState } from 'react';

import '../index.css';

export default function Task({ initDesc, onDelete }) {
    const [isDone, setIsDone] = useState(false);
    const [desc, setDesc] = useState(initDesc);
    const [editInputValue, setEditInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    function handleDone() {
        setIsDone(!isDone);
    }

    function handleEdit() {
        setEditMode(true);
    }

    function handleDelete() {
       onDelete();
    }

    function handleEditSubmit(event) {
        if (editInputValue === '') {
            setEditInputValue('');
            event.preventDefault();
            return;
        }
        setDesc(editInputValue);
        setEditInputValue('');
        setEditMode(false);
        event.preventDefault();
    }

    function handleEditChange(event) {
        setEditInputValue(event.target.value);
    }

    return (
        <div className="square">
            <div className="done-button" onClick={handleDone}>
                {isDone ? 'X' : ''}
            </div>
            <div className="desc">
                { desc }
            </div>
            <form onSubmit={handleEditSubmit} className={`${!editMode ? 'hidden' : ''}`}>
                <input type="text" value={editInputValue} onChange={handleEditChange}/>
                <input type="submit" value="Done!"/>
            </form>
            <div className="button-container">
                <div className="task-button" onClick={handleEdit}>
                    edit
                </div>
                <div className="task-button" onClick={handleDelete}>
                    delete
                </div>
            </div>
        </div>
    );
}
