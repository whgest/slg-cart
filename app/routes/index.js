import Ember from 'ember';
import MOCKED_CART from '../fake-store';



export default Ember.Route.extend({
	model: function() {
		var model = [];

		MOCKED_CART.forEach(function(fakeModel) {
			model.pushObject(fakeModel);
		});

		return model;
	},
	setupController: function(controller, model) {
		var store = this.store;
		controller.set('userCart', store.createRecord('cart'));
		this._super(controller, model);
	}
});
