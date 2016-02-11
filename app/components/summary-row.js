import Ember from 'ember';

export default Ember.Component.extend({
  actions : {
              showLoading : function()
                    {
                      debugger;
                      if(!this.controller.get('isLoading'))
                      {
                          this.controller.set('isLoading', true);
                          this.sendAction('action', this.get('payment'));
                      }
                    }
            }
});
