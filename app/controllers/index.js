import Ember from 'ember';

export default Ember.Controller.extend({
	userCart: null,

	actions: {
		addItem: function(item) {			
			this.get('userCart').addItem(item);
		},
		removeItem: function(item) {			
			this.get('userCart').removeItem(item);
		},
		resetCart: function() {
			this.get('userCart').reset();
		}
	}
});
