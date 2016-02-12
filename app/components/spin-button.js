import Ember from 'ember';

export default Ember.Component.extend({
    isLoading :false,
    actions   :{
                showLoading : function(params)
                              {
                              if(!this.get('isLoading'))
                              {
                                  this.set('isLoading', true);
                                  this.controller.set('isLoading', true);
                                  this.sendAction('action', this.get('param'));
                              }
        }
    }
});
