import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
         expence: this.store.findAll('expence'),
         person: this.store.findAll('person')
     });
 },
 afterModel : function(model){
   var _this = this;
   var expenceMap = {};
   var final_expenceMap = {};
   var startTime = new Date();
   model.person.forEach(function(person){
       model.expence.forEach(function(expence){
           if(expence.get('payee').get('id') === person.get('id'))
           {
             var totalPaidPerPerson = expence.get('amount')/expence.get('paidTo').get('length');
             var name = "";
             var temp_name = "";
             expence.get('paidTo').forEach(function(temp_person){
                 if(temp_person.get('id') !== person.get('id'))
                 {
                   if(!expenceMap[person.get('id')+name])
                   {
                     expenceMap[person.get('id')] = {};
                     expenceMap[person.get('id')][temp_person.get('id')+temp_name]  = 0;
                   }
                   var expence_amount =  expenceMap[person.get('id')+name][temp_person.get('id')+temp_name] ? expenceMap[person.get('id')+name][temp_person.get('id')+temp_name] : 0;
                   expence_amount += totalPaidPerPerson;
                   expenceMap[person.get('id')+name][temp_person.get('id')+temp_name] = expence_amount;
                 }
             });
           }
       });
   });
   var paymentsArr = [];
   Object.keys(expenceMap).forEach(function(payee_id){
     Object.keys(expenceMap[payee_id]).forEach(function(payer_id){

       if(!final_expenceMap[payee_id] ) {
         final_expenceMap[payee_id]  = {};
       }
       if(!final_expenceMap[payer_id] || !final_expenceMap[payer_id][payee_id])
       {
         var amount = +( (expenceMap[payee_id] ? expenceMap[payee_id][payer_id] : 0) - (expenceMap[payer_id] ? (expenceMap[payer_id][payee_id] ? expenceMap[payer_id][payee_id] : 0) : 0) );
         if(amount)
         {
           final_expenceMap[payee_id][payer_id] = amount;
           var amount = +( (expenceMap[payee_id] ? expenceMap[payee_id][payer_id] : 0) - (expenceMap[payer_id] ? (expenceMap[payer_id][payee_id] ? expenceMap[payer_id][payee_id] : 0) : 0) );
           Ember.RSVP.hash({
                payee  : _this.store.find('person', payee_id),
                payer  : _this.store.find('person', payer_id)
            }).then(function(persons){
              var payment = _this.get('store').createRecord('payment',{
                payee   : amount > 0 ? persons.payee : persons.payer,
                payer   : amount < 0 ? persons.payee : persons.payer,
                amount  : Math.abs(amount)
              });
              paymentsArr.push(payment);
            });

         }
       }
     });
   });
   model.payments =  paymentsArr;
   model.expenceMap =  final_expenceMap;
 },
 setupController: function(controller, model) {
        this.controller.set('expence', model.expence);
        this.controller.set('person', model.person);
        this.controller.set('payments', model.payments);
    }
});
