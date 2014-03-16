App.Person = DS.Model.extend({
	name: DS.attr('string'),
	displayName: DS.attr('string'),
	comment: DS.attr('string')
});

App.Person.FIXTURES = [
  {
     id: 1,
     name: 'Archana',
     displayName: 'archugs',
     comment: 'Developer'
  },

  {
     id: 2,
     name: 'Kishore',
     displayName: 'justjkk',
     comment: 'DevOps'
  },

  {
     id: 3,
     name: 'Yuvi',
     displayName: 'panda',
     comment: 'Coder'
  }

];
