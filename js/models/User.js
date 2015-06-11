App.User = DS.Model.extend({
    name        : DS.attr('string'),
    description : DS.attr('string')
});

App.User.FIXTURES = [
    {
        "id"    : 1,
        "description" : "engineer",
        "name" : "Rohan"
    },
    {
        "id"    : 2,
        "description" : "Automation",
        "name" : "Roy"
    },
    {
        "id"    : 3,
        "description" : "Engineer",
        "name" : "Soumili"
    },
    {
        "id"    : 4,
        "description" : "BOP",
        "name" : "Anks"
    }
];