import { useState, useRef, useEffect } from 'react';

import '../index.css';

export default function Task({ initDesc, onDelete, onArchive, isArchived }) {
    const [isDone, setIsDone] = useState(false);
    const [desc, setDesc] = useState(initDesc);
    const [editInputValue, setEditInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    /*
    Setting up event listeners. This will allow the user to cancel edit mode
    just by clicking outside of the task.
    */
    const editRef = useRef(null);
    function handleCancelEdit(event) {
        if (editRef.current && !editRef.current.contains(event.target)) {
            setEditMode(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleCancelEdit);
        return () => {
          document.removeEventListener("mousedown", handleCancelEdit);
        };
    });

    function handleDone() {
        setIsDone(!isDone);
    }

    function handleEdit() {
        setEditMode(!editMode);
    }

    function handleDelete() {
       onDelete();
    }

    function handleArchive() {
        onArchive();
    }

    function handleEditSubmit(event) {
        if (editInputValue === '') {
            setEditMode(false);
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
        <div className="square" ref={editRef}>
            <div className="done-button" onClick={handleDone}>
                {isDone ? 'X' : ''}
            </div>
            <div className={`desc ${editMode ? 'hidden' : ''}`}>
                { desc }
            </div>
            <form onSubmit={handleEditSubmit} className={`edit-form ${!editMode ? 'hidden' : ''}`}>
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
                <div className='task-button' onClick={handleArchive}>
                    {isArchived ? 'restore' : 'archive'}
                </div>
            </div>
        </div>
    );
}
