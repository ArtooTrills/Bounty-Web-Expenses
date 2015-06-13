App.Settlement = DS.Model.extend({
    settlements     : DS.attr(),
    spendingUser    : DS.attr('string'),
    amount          : DS.attr('number'),
});