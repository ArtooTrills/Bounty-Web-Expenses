import Ember from 'ember';

export default Ember.Component.extend({
  actions : {
              showLoading : function()
                    {
                      if(!this.controller.get('isLoading'))
                      {
                          this.controller.set('isLoading', true);
                          this.sendAction('action', this.get('payment'));
                      }
                    }
            }
});
