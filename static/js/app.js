App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    $.ajax({
      type: 'post',
      url: '//localhost:5000/dvds'
    }).then(function(dvds) {
      return JSON.parse(dvds);
    });
  }
});
