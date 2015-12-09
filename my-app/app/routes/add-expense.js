import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            users: Ember.$.get('http://localhost:5000/api/person'),
            expenses: Ember.$.get('http://localhost:5000/api/expense')
        });
    },
    actions: {
        storeExpense: function (expense) {
            if (Ember.isArray(expense)) {
                expense.forEach(function (item) {
                    Ember.$.ajaxSetup({
                        contentType: "application/json"
                    });
                    Ember.$.post('http://localhost:5000/api/expense', item);
                });
            }
            else {
                Ember.$.ajaxSetup({
                    contentType: "application/json"
                });
                Ember.$.post('http://localhost:5000/api/expense', expense);
            }
        },
        modelReload: function () {
            this.refresh();
        }
    }
});
