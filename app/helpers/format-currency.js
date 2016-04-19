import Ember from 'ember';

export function formatCurrency(params) {
  let value = params[0];
  if (value) {
  	return value.toFixed(2);
  } else {
  	return "0.00";
  }
}

export default Ember.Helper.helper(formatCurrency);