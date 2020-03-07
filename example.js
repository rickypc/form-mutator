const formMutator = require('form-mutator');

formMutator.fillOut({
  '[name="fullName"]': 'Your Name',
  '[name="address"]': '1 Awesome Way',
  '[name="city"]': 'Lalaland',
  '[type="submit"]': true,
});
