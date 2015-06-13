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


App.Expense.FIXTURES = [
    {
        "id":1,
        "affectedUsers" : "Rohan,Roy,Soumili,Anks",
        "amount" : "3443",
        "createdAt" : "Thu Jun 11 2015 08:28:48 GMT+0530 (India Standard Time)",
        "description" : "sdfsdf",
        "settlementID" : "1",
        "spendingUser" : "Soumili"
    },
    {
        "id":2,
        "affectedUsers" : "Rohan,Roy,Anks",
        "amount" : "9898",
        "createdAt" : "Thu Jun 11 2015 08:50:02 GMT+0530 (India Standard Time)",
        "description" : "pplpl",
        "settlementID" : "2",
        "spendingUser" : "Roy"
    }
];