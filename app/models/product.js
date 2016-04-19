import DS from 'ember-data';

export default DS.Model.extend({
	sku: DS.attr('string'),
	itemName: null,
	basePrice: null,
	rules: [],
	modifiedPrice: null,
	description: null
});
