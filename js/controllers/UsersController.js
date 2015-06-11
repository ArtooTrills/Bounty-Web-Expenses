App.UsersController = Ember.ArrayController.extend({
    actions : {
        remove : function(user){
            user.deleteRecord();
            user.save();
        }
    }
});
