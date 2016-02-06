import DS from 'ember-data';

export default DS.Model.extend({
  date        : DS.attr('string'),
  description : DS.attr('string'),
  amount      :DS.attr('string'),
  payee       :  DS.belongsTo('person', { async : true }),
  paidTo      :  DS.hasMany('person', { async : true }),
});
