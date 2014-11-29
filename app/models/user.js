import DS from 'ember-data';

var attr = DS.attr;

var User = DS.Model.extend({
  name: attr('string'),
  displayName: attr('string'),
  comment: attr('string')
});

// Fixtures data
User.reopenClass({
  FIXTURES: [
    {id: 1, name: 'Donald Draper', displayName: 'Don', comment: 'Mad Men' },
    {id: 2, name: 'Harvey Specter', displayName: 'Harvey', comment: 'Suits' },
    {id: 3, name: 'Sherlock Holmes', displayName: 'Sherlock', comment: 'Sherlock' },
  ]
});

export default User;
