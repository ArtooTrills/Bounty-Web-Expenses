App.UsersAddController = Ember.ArrayController.extend({
    actions : {
        addUser : function(){
            var name = this.get('name');
            var description = this.get('description');

            if (!name.trim()&&!description.trim()){return;}

            var user = this.store.createRecord('user', {
                //'id'            : 'id-' + Math.random().toString(36).substr(2, 16),
                'name'			: name,
                'description'	: description
            });

            //this.set('id', '');
            this.set('name', '');
            this.set('description', '');

            user.save();
        }
    }
});