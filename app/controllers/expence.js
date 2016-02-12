import Ember from 'ember';

export default Ember.Controller.extend({
  init              : function()
                      {

                      },
  actions           : {
                        downloadFile: function(type)
                                      {
                                        var data = [];
                                        var firstRow = ["Date", "Description", "Payee", "Amount", "Paid To"];
                                        data.push(firstRow);
                                        this.get('model').forEach(function(expence){
                                           var row = [expence.get('date'), expence.get('description'), expence.get('payee').get('display_name'), expence.get('amount')];
                                           var personNames = [];
                                           expence.get('paidTo').forEach(function(person){
                                             personNames.push(person.get('display_name'));
                                           });
                                           row.push(personNames.join("& "))
                                           data.push(row);
                                        });
                                        if(type == 'excel')
                                        {
                                          this.get('excel').export(data, 'sheet1', 'expence.xlsx');
                                        }
                                        else {
                                          this.get('csv').export(data, 'expence.csv');
                                        }
                                      }
                        },
});
