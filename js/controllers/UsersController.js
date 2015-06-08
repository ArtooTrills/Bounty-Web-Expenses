App.UsersController = Ember.ArrayController.extend({
    actions : {
        addUser : function(){
            var name = this.get('name');
            var description = this.get('description');
            // validate not-empty
            if (!name.trim()&&!description.trim()){return;}

            var user = this.store.createRecord('user', {
                'name'			: name,
                'description'	: description
            });
            // reset fields to empty
            this.set('name', '');
            this.set('description', '');
            // persist
            user.save();
        }
    }
});
