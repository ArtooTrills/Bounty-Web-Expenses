$('.datepicker').datepicker();
function checkAll(bx) {
  var cbs = document.getElementsByTagName('input');
  for(var i=0; i < cbs.length; i++) {
    if(cbs[i].type == 'checkbox') {
      cbs[i].checked = bx.checked;
    }
  }
}

App = Ember.Application.create();

var usersChecked=[];

App.ApplicationAdapter = DS.FixtureAdapter;

// App.ApplicationAdapter = DS.FixtureAdapter.extend({
//         queryFixtures: function(fixtures, query, type) {
//             console.log(query);
//             console.log(type);
//             return fixtures.filter(function(item) {
//                 for(prop in query) {
//                     if( item[prop] != query[prop]) {
//                         return false;
//                     }
//                 }
//                 return true;
//             });
//            }
//           });

// ////// Stub data store fixture adapter ///////
// App.store = DS.Store.extend({
//     revision: 12,
//     //adapter: 'DS.RESTAdapter',
//     adapter: DS.FixtureAdapter.extend({
//         queryFixtures: function(fixtures, query, type) {
//             console.log(query);
//             console.log(type);
//             return fixtures.filter(function(item) {
//                 for(prop in query) {
//                     if( item[prop] != query[prop]) {
//                         return false;
//                     }
//                 }
//                 return true;
//             });
//         }
//     })
// });

App.User = DS.Model.extend({
  name         : DS.attr(),
  displayname  : DS.attr(),
  comment      : DS.attr(),
});



App.User.FIXTURES = [{
  id: 1,
  name: 'Sponge Bob',
  displayname: 'SB',
  comment: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
}, {
  id: 2,
  name: 'John David',
  displayname: 'JD',
  comment: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
}
];

App.Expense = DS.Model.extend({
  date  :DS.attr('date'),
  desc  :DS.attr('string'),
  payer :DS.belongsTo('user'),
  amount  :DS.attr('number'),
  forwhom :DS.hasMany('user',{async: true}),
});

App.Expense.FIXTURES = [{
  id: 1,
  date: new Date(),
  desc: 'Groceries',
  payer: '2',
  amount: 2500,
  forwhom: [1,2],
},{
  id: 2,
  date: new Date(),
  desc: 'Clothes',
  payer: '2',
  amount: 1000,
  forwhom: [1,2],
},{
  id: 3,
  date: new Date(),
  desc: 'House Rent',
  payer: '1',
  amount: 8000,
  forwhom: [1,2],
}
];

Ember.Handlebars.helper('format-date',function(date){
  return moment(date).format("YYYY-MM-DD");
});

Ember.Handlebars.helper('csv', function(items) {
    console.log(items);
    // var temp='';
    // for(expense in items)
    // {
    //   temp+=expense.displaymame+", ";
    // }
    // var n=temp.lastIndexOf(",");
    // temp=temp.substring(0,n);
    return "hello";
});

App.Router.map(function(){
  this.resource('users', function(){
    this.resource('user', { path:'/:user_id' });
    this.route('create');
  });
  this.resource('expenses',function(){
    this.resource('expense',{ path:'/:expense_id'});
    this.route('create');
  });
  this.resource('payments');
});


App.UsersRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('user');  
  }
});


App.UsersCreateRoute = Ember.Route.extend({
  model: function(){
    // the model for this route is a new empty Ember.Object
    return this.store.createRecord('user');;
  },

  // in this case (the create route), we can reuse the user/edit template
  // associated with the usersCreateController
  renderTemplate: function(){
    this.render('user', {
      controller: 'usersCreate'
    });
  }
});


App.UsersCreateController = Ember.ObjectController.extend({
  actions: {
    doneEditing: function(){
      this.get('model').save();
      this.transitionToRoute('users');
    }
  }
});

App.UsersController = Ember.ObjectController.extend({
  actions:{
    deleteRecords: function(){
      var records=(this.store.all('user',{deleteRecord:true})).toArray();
      console.log(records);
      for(var i=0; i<records.length;i++)
      {
       console.log(records[i].get('deleteRecord'));
       records[i].destroyRecord();
      }
    },
     expensestab: function(){
      $('#userstab').removeClass("active"); 
      $('#expensestab').addClass("active");
      $('#paymentstab').removeClass("active");
      this.transitionTo('expenses');
    },
    removeUser: function(user) {
      //var user = this.get('user');
      console.log(user);
      user.destroyRecord();
      //user.save();
    }
  }
});

App.UserController = Ember.ObjectController.extend({
  actions:{
    doneEditing : function(){
      //this.set('isEditing',false);
      this.transitionTo('users');
    },
    deleteUser: function() {
      var user=this.get('model');
      console.log(user);
      user.destroyRecord();
      this.transitionTo('users');
    }
  }
});


App.ExpensesRoute = Ember.Route.extend({
  model: function(){
    $('#userstab').removeClass("active"); 
    $('#expensestab').addClass("active");
    $('#paymentstab').removeClass("active");
    return this.store.find('expense');
  }
});

App.ExpensesController = Ember.ObjectController.extend({
  actions:{
    paymentstab: function(){
      $('#userstab').removeClass("active"); 
      $('#expensestab').removeClass("active");
      $('#paymentstab').addClass("active");
      this.transitionTo('payments');
    }
  }
});

Ember.RadioButton = Ember.View.extend({
    tagName : "input",
    type : "radio",
    attributeBindings : [ "name", "type", "value", "checked:checked:" ],
    click : function() {
        this.set("selection", this.$().val());
    },
    checked : function() {
        return this.get("value") == this.get("selection");   
    }.property()
});

App.PayerController = Ember.ObjectController.extend({
  model: function(){
    return this.store.find('user');
  }.property("model")  
})

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('users');
  }
});

App.ApplicationController = Ember.ObjectController.extend({
  actions: {
    userstab: function(){
      $('#userstab').addClass("active"); 
      $('#expensestab').removeClass("active");
      $('#paymentstab').removeClass("active");
    },
    expensestab: function(){
      $('#userstab').removeClass("active"); 
      $('#expensestab').addClass("active");
      $('#paymentstab').removeClass("active");
    },
    paymentstab: function(){
      $('#userstab').removeClass("active"); 
      $('#expensestab').removeClass("active");
      $('#paymentstab').addClass("active");
    }
  }
});