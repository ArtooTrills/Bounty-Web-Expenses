import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
         expence: this.store.findAll('expence'),
         person: this.store.findAll('person')
     });
 },
 afterModel : function(model){

 },
 setupController: function(controller, model) {
        this.controller.set('expence', model.expence);
        this.controller.set('person', model.person);
        var _this = this;
        var expenceMap = {}
        var final_expenceMap = {};
        var startTime = new Date();
        model.person.forEach(function(person){
            model.expence.forEach(function(expence){
                var _expence = expence;
                if(expence.get('payee').get('id') == person.get('id'))
                {
                  var totalPaidPerPerson = expence.get('amount')/expence.get('paidTo').get('length');

                  expence.get('paidTo').forEach(function(temp_person){
                      if(temp_person.get('id') != person.get('id'))
                      {
                        if(!expenceMap[person.get('id')])
                        {
                          expenceMap[person.get('id')] = {};
                          expenceMap[person.get('id')][temp_person.get('id')]  = 0;
                        }
                        var expence_amount =  expenceMap[person.get('id')][temp_person.get('id')] ? expenceMap[person.get('id')][temp_person.get('id')] : 0;
                        expence_amount += totalPaidPerPerson;
                        expenceMap[person.get('id')][temp_person.get('id')] = expence_amount;
                      }
                  });
                }
            });
        });
        Object.keys(expenceMap).forEach(function(payee_id){
          Object.keys(expenceMap[payee_id]).forEach(function(payer_id){
            if(!final_expenceMap[payee_id] ) {
              final_expenceMap[payee_id]  = {};
            }
            if(!final_expenceMap[payer_id] || !final_expenceMap[payer_id][payee_id])
            {
              final_expenceMap[payee_id][payer_id] =( (expenceMap[payer_id] ? +expenceMap[payer_id][payee_id] : 0) - (+expenceMap[payee_id][payer_id]));
            }
          });
        });
        this.controller.set('expenceMap', final_expenceMap);
        console.log((new Date()).getTime() - startTime.getTime() + " miliseconds");
    }
});
