App.Expense = DS.Model.extend({
    id              : DS.attr();
    description     : DS.attr();
    amount          : DS.attr();
    user            : DS.belongsTo('User');
    affected_users  : DS.attr();
    date            : DS.attr();
});
