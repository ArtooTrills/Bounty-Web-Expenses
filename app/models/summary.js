import DS from 'ember-data';

export default DS.Object.extend({
  person      :  DS.hasMany('person'),
  expence     :  DS.hasMany('expence'),
  payments    :  DS.hasMany('payment'),
});
