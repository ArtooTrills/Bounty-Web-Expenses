import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('expence', function(){
    this.route("new");
  });
  this.resource('person',function(){
    this.route("new");
    this.route("update", { path: "update/:id"});
  });
  this.resource('summary', function(){
    this.route("new");
  });
});

export default Router;
