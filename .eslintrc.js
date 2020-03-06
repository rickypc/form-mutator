/* .eslintrc.js - ESLint configuration.
 * Copyright (c) 2018 - 2020 Richard Huang <rickypc@users.noreply.github.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

module.exports = {
  env: {
    'jest/globals': true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  globals: {
    document: true,
    Event: true,
    MouseEvent: true,
    window: true,
  },
  plugins: [
    'import',
    'jest',
  ],
  rules: {
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['el'], props: true }],
    'no-underscore-dangle': [2, { allow: ['__test__'] }],
    'space-before-function-paren': ['error', 'always'],
  },
}
