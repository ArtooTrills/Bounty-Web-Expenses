import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var url = 'http://localhost:5000/api/person';
        return Ember.$.ajax({
            method: 'GET',
            url: url,
        });
    },
    actions: {
        storeUser: function (user) {
            Ember.$.ajaxSetup({
                contentType: "application/json"
            });
            Ember.$.post('http://localhost:5000/api/person', user);
        }
    }
});
