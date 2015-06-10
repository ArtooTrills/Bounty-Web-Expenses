App.Settlement = DS.Model.extend({
    expenseID       : DS.attr('string'),
    settlements     : DS.attr(),
    spendingUser    : DS.attr('string'),
    amount          : DS.attr('number'),
});
