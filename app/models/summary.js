import DS from 'ember-data';

export default DS.Model.extend({
  person      :  DS.hasMany('person'),
  expence     :  DS.hasMany('expence'),
});
