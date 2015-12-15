import Ember from 'ember';

export default Ember.Component.extend({
    users: [],
    failure: false,
    actions: {
        addUser: function () {
            var user = {};
            user.name = this.get('name');
            user.phone = this.get('phone');
            user.hasReceived = "";
            user.hasPaid = "";
            for(var i = 0; i < this.get("users").length; i++){
                if(this.get("users")[i].name == user.name){
                    this.set("failure", true);
                    return
                }
            }
            this.get('users').pushObject(user);
            var temp = JSON.stringify(user);
            this.sendAction('action', temp);
            this.set("failure", false);
            this.set('name', "");
            this.set('phone', "");
        }
    }
});
