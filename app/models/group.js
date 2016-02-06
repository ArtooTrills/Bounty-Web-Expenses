import DS from 'ember-data';

export default DS.Model.extend({
  group_name:DS.attr('string'),
  persons:  DS.hasMany('person')
});
