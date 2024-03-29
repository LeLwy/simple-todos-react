import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter};

  const tasks = useTracker(() => {

    if(!user){

      return [];
    }

    return TasksCollection.find(
      hideCompleted ? hideCompletedFilter : userFilter, {
      sort: {createdAt: -1}
    }).fetch();
  });

  const pendingTasksCount = useTracker(() => {

    if(!user){

      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count()
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const deleteTask = ({_id}) => TasksCollection.remove(_id);

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={()=>setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>
            <ul className="tasks">
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm/>
        )}
      </div>
    </div>
  );
};
