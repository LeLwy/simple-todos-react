import React from 'react';

function formatDate() {
	const today = new Date();
	// Month starts at 0, annoyingly
	const monthNum = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
	const dateNum = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
	const yearNum = today.getFullYear();
	return dateNum + "/" + monthNum + "/" + yearNum;
}

export const Task = ({ task, onCheckboxClick }) => {
    return <li>
            <input 
                type="checkbox" 
                checked={!!task.isChecked}
                onClick={()=> onCheckboxClick(task)} 
                readOnly
            />
            <span>{task.text}</span><span>, created at {formatDate(task.createdAt)}</span>
        </li>
};