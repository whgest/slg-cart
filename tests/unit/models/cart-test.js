import { moduleForModel, test } from 'ember-qunit';
import fakeStore from 'slg-cart/fake-store';

moduleForModel('cart', 'Unit | Model | cart', {
  // Specify the other units that are required for this test.
  needs: ['model:product']
});

let tea = fakeStore[0],
	apple = fakeStore[1],
	coffee = fakeStore[2];

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('it can reset', function(assert) {
  let model = this.subject();
  model.addItem(tea);
  model.addItem(apple);
  model.addItem(coffee);
  model.reset();
  assert.equal(model.get('totalPrice'), 0);
});


test('it correctly totals 1 tea, one apple, one coffee, no pricing rules apply', function(assert) {
  let model = this.subject();
  model.addItem(tea);
  model.addItem(apple);
  model.addItem(coffee);
  assert.equal(model.get('totalPrice'), 19.34);
});

test('it correctly totals 2 teas, applying the buy one get 1 rule', function(assert) {
  let model = this.subject();
  model.addItem(tea);
  model.addItem(tea);
  assert.equal(model.get('totalPrice'), 3.11);
});

test('it correctly totals 1 tea, three apples, applying the bulk discount rule', function(assert) {
  let model = this.subject();
  model.addItem(tea);
  model.addItem(apple);
  model.addItem(apple);
  model.addItem(apple);
  assert.equal(model.get('totalPrice'), 16.61);
});



