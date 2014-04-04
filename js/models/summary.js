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
     spent: 400.00,
     owes: 750.00,
     owed: 400.00,
     balance: -350.00
  },

  {
     id: 2,
     name: 'Kishore',
     spent: 800.00,
     owes: 750.00,
     owed: 800.00,
     balance: 50
  },

  {
     id: 3,
     name: 'Yuvi',
     spent: 600.00,
     owes: 750.00,
     owed: 600.00,
     balance: -150.00
  },

  {
     id: 4,
     name: 'Sunny',
     spent: 1200.00,
     owes: 750.00,
     owed: 1200.00,
     balance: 450.00
  }

 ];
