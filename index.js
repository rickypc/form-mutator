/* index.js - Form mutator utility main entry.
 * Copyright (c) 2018 - 2020 Richard Huang <rickypc@users.noreply.github.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Provide utility to fill out web form programmatically.
 *
 * @module form-mutator
 *
 * @example
 * const formMutator = require('form-mutator');
 *
 * formMutator.fillOut({
 *   '[name="fullName"]': 'Your Name',
 *   '[name="address"]': '1 Awesome Way',
 *   '[name="city"]': 'Lalaland',
 *   '[type="submit"]': true,
 * });
 */
((global) => {
  /* istanbul ignore next */
  exports = typeof exports !== 'undefined' ? exports : global.formMutator = {};
  const evt = { bubbles: true, cancelable: true };

  /**
   * Click on given element.
   *
   * @alias module:form-mutator.click
   * @param {Object} element - The element to click.
   * @return {boolean} Truthy if click triggered, otherwise falsy.
   *
   * @example
   * const el = document.querySelector('a[href="/"]');
   * const response = formMutator.click(el);
   */
  const click = (el) => {
    let response = false;

    try {
      el.dispatchEvent(new MouseEvent('click', evt));
      response = true;
    } catch (ex) {
      // default value.
    }

    return response;
  };

  /**
   * @private
   */
  const toggleSelectboxByText = (el, values, selected) => {
    let response = false;
    let selections = Array.isArray(values) ? values : [values];

    try {
      el.dispatchEvent(new Event('focus', evt));
      let options = Array.from(el.options || []);
      let selects = options.filter((option) => selections.includes(option.text));

      for (let i = 0, j = selects.length; i < j; i += 1) {
        selects[i].selected = selected;
      }

      el.dispatchEvent(new Event('change', evt));
      el.dispatchEvent(new Event('blur', evt));

      options = null;
      selects = null;
      response = true;
    } catch (ex) {
      // default value.
    }

    selections = null;
    return response;
  };

  // After toggleSelectboxByText definition.
  /**
   * Deselect given values from dropdown list.
   *
   * @alias module:form-mutator.deselectByText
   * @param {Object} element - The element to deselect from.
   * @param {string[]} values - The values to deselect.
   * @return {boolean} Truthy if deselect triggered, otherwise falsy.
   *
   * @example
   * const el = document.querySelector('[name="month"]');
   * const response = formMutator.deselectByText(el, ['January']);
   */
  const deselectByText = (el, values) => toggleSelectboxByText(el, values, false);

  /**
   * Select given values from dropdown list.
   *
   * @alias module:form-mutator.selectByText
   * @param {Object} element - The element to select from.
   * @param {string[]} values - The values to select.
   * @return {boolean} Truthy if select triggered, otherwise falsy.
   *
   * @example
   * const el = document.querySelector('[name="month"]');
   * const response = formMutator.selectByText(el, ['January']);
   */
  const selectByText = (el, values) => toggleSelectboxByText(el, values, true);

  /**
   * Toggle the checkbox or radio button field.
   *
   * @alias module:form-mutator.toggleCheckbox
   * @param {Object} element - The element to toggle from.
   * @param {boolean} value - Check if true, otherwise uncheck.
   * @return {boolean} Truthy if toggle triggered, otherwise falsy.
   *
   * @example
   * const el = document.querySelector('[type="checkbox"]');
   * const response1 = formMutator.toggleCheckbox(el, true);  // checked
   * const response2 = formMutator.toggleCheckbox(el, false); // unchecked
   */
  const toggleCheckbox = (el, value) => {
    let response = false;

    try {
      el.dispatchEvent(new Event('focus', evt));
      el.checked = value;
      el.dispatchEvent(new Event('change', evt));
      el.dispatchEvent(new Event('blur', evt));
      response = true;
    } catch (ex) {
      // default value.
    }

    return response;
  };

  /**
   * Type given value to password or text field.
   *
   * @alias module:form-mutator.typeValue
   * @param {Object} element - The element to type on.
   * @param {mixed} value - The value to be typed in.
   * @return {boolean} Truthy if type in triggered, otherwise falsy.
   *
   * @example
   * const el = document.querySelector('[type="text"]');
   * const response = formMutator.typeValue(el, 'value');
   */
  const typeValue = (el, value) => {
    let response = false;

    try {
      el.dispatchEvent(new Event('focus', evt));
      el.dispatchEvent(new Event('reset', evt));
      el.value = value;
      el.dispatchEvent(new Event('keydown', evt));
      el.dispatchEvent(new Event('keypress', evt));
      el.dispatchEvent(new Event('keyup', evt));
      el.dispatchEvent(new Event('input', evt));
      el.dispatchEvent(new Event('change', evt));
      el.dispatchEvent(new Event('blur', evt));
      response = true;
    } catch (ex) {
      // default value.
    }

    return response;
  };

  // After callee method definitions.
  const setValue = (selector, value) => {
    let el = global.document ? global.document.querySelector(selector) : null;
    let response = false;

    if (el) {
      switch (el.type) {
        case 'checkbox':
        case 'radio':
          response = toggleCheckbox(el, value);
          break;
        case 'select-one':
        case 'select-multiple':
          response = selectByText(el, value);
          break;
        case 'submit':
          response = click(el);
          break;
        case 'password':
        case 'text':
          response = typeValue(el, value);
          break;
        default:
          // Non-existence type.
          response = true;
      }
    } else {
      // Non-existence field.
      response = true;
    }

    el = null;
    return response;
  };

  exports.click = click;
  exports.deselectByText = deselectByText;
  exports.fillOut = (data = {}) => Object.keys(data)
    .every((key) => setValue(key, data[key]));
  exports.selectByText = selectByText;
  exports.setValue = setValue;
  exports.toggleCheckbox = toggleCheckbox;
  exports.typeValue = typeValue;
})(/* istanbul ignore next */typeof window !== 'undefined' ? window : global || this);
