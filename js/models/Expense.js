App.Expense = DS.Model.extend({
    description     : DS.attr('string'),
    amount          : DS.attr('string'),
    spendingUser    : DS.attr(),
    affectedUsers   : DS.attr(),
    createdAt       : DS.attr('string', {
                        defaultValue: function() { return new Date(); }
                      }),
    settlementID    : DS.attr('string',{
                        defaultValue: function() { return "null"; }
                      })
});