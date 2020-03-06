/* index.js - Form mutator utility main entry.
 * Copyright (c) 2018 - 2020 Richard Huang <rickypc@users.noreply.github.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

((global) => {
  /* istanbul ignore next */
  exports = typeof exports !== 'undefined' ? exports : global.formMutator = {};
  const evt = { bubbles: true, cancelable: true };

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
  const deselectByText = (el, values) => toggleSelectboxByText(el, values, false);
  const selectByText = (el, values) => toggleSelectboxByText(el, values, true);

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
