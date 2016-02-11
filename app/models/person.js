import DS from 'ember-data';

export default DS.Model.extend({
  person_name : DS.attr('string'),
  display_name : DS.attr('string'),
  comment       :DS.attr('string')
});
