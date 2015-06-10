App.Expense = DS.Model.extend({
    description     : DS.attr('string'),
    amount          : DS.attr('string'),
    spendingUser    : DS.attr('string'),
    affectedUsers   : DS.attr('string'),
    createdAt       : DS.attr('string', {
                        defaultValue: function() { return new Date(); }
                      }),
    settled         : DS.attr('boolean', {
                        defaultValue: function() { return false; }
                      })
});
