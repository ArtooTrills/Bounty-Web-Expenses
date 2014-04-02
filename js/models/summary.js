App.Summary = DS.Model.extend({
	name: DS.attr('string'),
	spent: DS.attr('number'),
	owes: DS.attr('number'),
	owed: DS.attr('number'),
	balance: DS.attr('number')
});

App.Summary.FIXTURES = [

  {
     id: 1,
     name: 'Archana',
     spent: 450.00,
     owes: 8166.67,
     owed: 225.00,
     balance: -7941.67
  },

  {
     id: 2,
     name: 'Kishore',
     spent: 20000.00,
     owes: 0.00,
     owed: 13333.33,
     balance: 13333.33
  },

  {
     id: 3,
     name: 'Yuvi',
     spent: 3000.00,
     owes: 6891.67,
     owed: 1500.00,
     balance: -5391.67
  }

 ];
