import { Meteor } from 'meteor/meteor';
import { Account } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if(!Account.findUserByUsername(SEED_USERNAME)) {
    Account.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  };

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  };
});