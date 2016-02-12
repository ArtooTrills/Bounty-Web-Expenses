import DS from 'ember-data';

export default DS.Model.extend({
  payer           : DS.belongsTo('person'),
  payee           : DS.belongsTo('person'),
  amount          : DS.attr('number'),
});
