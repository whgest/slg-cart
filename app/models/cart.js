import DS from 'ember-data';

export default DS.Model.extend({
	pricingRules: {
		'bogo': {
			condition: function(items) {
				return items.length >= 2;
			},
			modifier: function(item, index) {
				var newPrice;
				newPrice = ((index + 1) % 2 !== 0) ? item.get('basePrice') : 0;
				item.set('modifiedPrice', newPrice);
			}
		},
		//buy 3 get 10% off
		'bulk': {
			condition: function(items) {
				return items.length >= 3;
			},
			modifier: function(item) {
				item.set('modifiedPrice', item.get('basePrice') * 0.9);
			}
		}
	},

	contents: DS.hasMany('product'),

	applyPricingRulesToLikeItems: function(rules, items) {
		var that = this;
		rules.forEach(function(rule) {
			if (that.get('pricingRules')[rule]) {
				var itemRule = that.get('pricingRules')[rule];
				if (itemRule.condition(items)) {
					items.forEach(function(item, index) {
						itemRule.modifier(item, index);
					});
				} else {
					items.forEach(function(item) {
						item.set('modifiedPrice', item.get('basePrice'));
					});
				}
			}
		});
	},

	totalPrice: function() {
		var that = this,
			totalPrice = 0,
			allSkus;

		allSkus = this.get('contents').mapBy('sku').uniq();

		allSkus.forEach(function(sku) {
			var itemsInCart = that.get('contents').filterBy('sku', sku),
				pricingRulesForSku = itemsInCart[0].get('rules'),	
				basePrice = itemsInCart[0].get('basePrice'),		 
				quantityInCart = itemsInCart.length;

			//apply special pricing to all like items, if any
			if (pricingRulesForSku && pricingRulesForSku.length) {
				that.applyPricingRulesToLikeItems(pricingRulesForSku, itemsInCart);
				itemsInCart.forEach(function(item) {
					totalPrice += item.get('modifiedPrice');
				});
			} else {
				totalPrice += basePrice * quantityInCart;
				itemsInCart.forEach(function(item) {
					item.set('modifiedPrice', basePrice);
				});
			}
		});

		return totalPrice.toFixed(2);
	}.property('contents.[]'),

	addItem: function(item) {
		this.get('contents').pushObject(this.store.createRecord('product', item));
	},

	removeItem: function(item) {
		this.store.deleteRecord(item);		
	}, 

	reset: function() {
		this.set('contents', []);
	}
});
