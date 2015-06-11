App.Settlement = DS.Model.extend({
    settlements     : DS.attr(),
    spendingUser    : DS.attr('string'),
    amount          : DS.attr('number'),
});

App.Settlement.FIXTURES = [
    {
        "id" : 1,
        "amount" : 861,
        "settlements" : [ {
                "settled" : false,
                "user" : "Rohan"
            }, {
                "settled" : false,
                "user" : "Roy"
            }, {
                "settled" : false,
                "user" : "Soumili"
            }, {
                "settled" : false,
                "user" : "Anks"
            } ],
        "spendingUser" : "Soumili"
    },
    {
        "id" : 2,
        "amount" : 3300,
        "settlements" : [ {
                "settled" : false,
                "user" : "Rohan"
            }, {
                "settled" : false,
                "user" : "Roy"
            }, {
                "settled" : false,
                "user" : "Anks"
            } ],
        "spendingUser" : "Roy"
    }
];