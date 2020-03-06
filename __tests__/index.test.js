/* index.test.js - tests for form mutator utility.
 * Copyright (c) 2018 - 2020 Richard Huang <rickypc@users.noreply.github.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

global.Event = jest.fn();
global.MouseEvent = jest.fn();

const formMutator = require('../index.js');

const evtInit = {
  bubbles: true,
  cancelable: true,
};

describe('Form mutator module test', () => {
  describe('click', () => {
    it('should return truthy', () => {
      const el = { dispatchEvent: jest.fn() };
      const actual = formMutator.click(el);

      expect(actual).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(1);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.MouseEvent));
      expect(global.MouseEvent).toHaveBeenCalledTimes(1);
      expect(global.MouseEvent).toHaveBeenNthCalledWith(1, 'click', evtInit);
    });

    it('should return falsy', () => {
      const actual = formMutator.click();

      expect(actual).toBeFalsy();
      expect(global.MouseEvent).not.toHaveBeenCalled();
    });
  });

  describe('deselectByText', () => {
    it('should return truthy', () => {
      const el = {
        dispatchEvent: jest.fn(),
        options: [
          { text: 'value' },
          { text: 'value2' },
        ],
      };
      const actual = formMutator.deselectByText(el, ['value']);

      expect(actual).toBeTruthy();
      expect(el.options[0].selected).toBeFalsy();
      expect(el.options[1].selected).toBeFalsy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should use given non-array value and return truthy', () => {
      const el = {
        dispatchEvent: jest.fn(),
        options: [
          { text: 'value' },
          { text: 'value2' },
        ],
      };
      const actual = formMutator.deselectByText(el, 'value');

      expect(actual).toBeTruthy();
      expect(el.options[0].selected).toBeFalsy();
      expect(el.options[1].selected).toBeFalsy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return truthy on el without options', () => {
      const el = {
        dispatchEvent: jest.fn(),
      };
      const actual = formMutator.deselectByText(el, 'value');

      expect(actual).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return falsy', () => {
      const actual = formMutator.deselectByText(null, 'value');

      expect(actual).toBeFalsy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });

  describe('fillOut', () => {
    it('should return truthy', () => {
      const el = {
        dispatchEvent: jest.fn(),
        type: 'checkbox',
      };
      global.document = {
        querySelector: jest.fn(() => el),
      };

      const actual = formMutator.fillOut({ selector: true });

      expect(actual).toBeTruthy();
      expect(global.document.querySelector).toHaveBeenCalledTimes(1);
      expect(global.document.querySelector).toHaveBeenNthCalledWith(1, 'selector');
      expect(el.checked).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return truthy with default value', () => {
      const actual = formMutator.fillOut();

      expect(actual).toBeTruthy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });

  describe('selectByText', () => {
    it('should return truthy', () => {
      const el = {
        dispatchEvent: jest.fn(),
        options: [
          { text: 'value' },
          { text: 'value2' },
        ],
      };
      const actual = formMutator.selectByText(el, ['value']);

      expect(actual).toBeTruthy();
      expect(el.options[0].selected).toBeTruthy();
      expect(el.options[1].selected).toBeFalsy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should use given non-array value and return truthy', () => {
      const el = {
        dispatchEvent: jest.fn(),
        options: [
          { text: 'value' },
          { text: 'value2' },
        ],
      };
      const actual = formMutator.selectByText(el, 'value');

      expect(actual).toBeTruthy();
      expect(el.options[0].selected).toBeTruthy();
      expect(el.options[1].selected).toBeFalsy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return truthy on el without options', () => {
      const el = { dispatchEvent: jest.fn() };
      const actual = formMutator.selectByText(el, 'value');

      expect(actual).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return falsy', () => {
      const actual = formMutator.selectByText(null, 'value');

      expect(actual).toBeFalsy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });

  describe('setValue', () => {
    it('should return truthy on checkbox / radio', () => {
      const el = {
        dispatchEvent: jest.fn(),
        type: 'checkbox',
      };
      global.document = {
        querySelector: jest.fn(() => el),
      };

      const actual = formMutator.setValue('selector', true);
      expect(actual).toBeTruthy();
      expect(global.document.querySelector).toHaveBeenCalledTimes(1);
      expect(global.document.querySelector).toHaveBeenNthCalledWith(1, 'selector');
      expect(el.checked).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return truthy on select-one / select-multiple', () => {
      const el = {
        dispatchEvent: jest.fn(),
        options: [
          { text: 'value' },
          { text: 'value2' },
        ],
        type: 'select-one',
      };
      global.document = {
        querySelector: jest.fn(() => el),
      };

      const actual = formMutator.setValue('selector', 'value');
      expect(actual).toBeTruthy();
      expect(global.document.querySelector).toHaveBeenCalledTimes(1);
      expect(global.document.querySelector).toHaveBeenNthCalledWith(1, 'selector');
      expect(el.options[0].selected).toBeTruthy();
      expect(el.options[1].selected).toBeFalsy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return truthy on submit', () => {
      const el = {
        dispatchEvent: jest.fn(),
        type: 'submit',
      };
      global.document = {
        querySelector: jest.fn(() => el),
      };

      const actual = formMutator.setValue('selector', true);
      expect(actual).toBeTruthy();
      expect(global.document.querySelector).toHaveBeenCalledTimes(1);
      expect(global.document.querySelector).toHaveBeenNthCalledWith(1, 'selector');
      expect(el.dispatchEvent).toHaveBeenCalledTimes(1);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.MouseEvent));
      expect(global.MouseEvent).toHaveBeenCalledTimes(1);
      expect(global.MouseEvent).toHaveBeenNthCalledWith(1, 'click', evtInit);
    });

    it('should return truthy on password / text', () => {
      const el = {
        dispatchEvent: jest.fn(),
        type: 'password',
      };
      global.document = {
        querySelector: jest.fn(() => el),
      };

      const actual = formMutator.setValue('selector', 'value');
      expect(actual).toBeTruthy();
      expect(global.document.querySelector).toHaveBeenCalledTimes(1);
      expect(global.document.querySelector).toHaveBeenNthCalledWith(1, 'selector');
      expect(el.value).toEqual('value');
      expect(el.dispatchEvent).toHaveBeenCalledTimes(8);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(4, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(5, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(6, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(7, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(8, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(8);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'reset', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'keydown', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(4, 'keypress', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(5, 'keyup', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(6, 'input', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(7, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(8, 'blur', evtInit);
    });

    it('should return truthy on non-existence el', () => {
      global.document = null;

      const actual = formMutator.setValue('selector', 'value');
      expect(actual).toBeTruthy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });

  describe('toggleCheckbox', () => {
    it('should return truthy', () => {
      const el = { dispatchEvent: jest.fn() };
      const actual = formMutator.toggleCheckbox(el, true);

      expect(actual).toBeTruthy();
      expect(el.checked).toBeTruthy();
      expect(el.dispatchEvent).toHaveBeenCalledTimes(3);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(3);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'blur', evtInit);
    });

    it('should return falsy', () => {
      const actual = formMutator.toggleCheckbox(null, 'value');

      expect(actual).toBeFalsy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });

  describe('typeValue', () => {
    it('should return truthy', () => {
      const el = { dispatchEvent: jest.fn() };
      const actual = formMutator.typeValue(el, 'value');

      expect(actual).toBeTruthy();
      expect(el.value).toEqual('value');
      expect(el.dispatchEvent).toHaveBeenCalledTimes(8);
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(1, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(2, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(3, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(4, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(5, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(6, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(7, expect.any(global.Event));
      expect(el.dispatchEvent).toHaveBeenNthCalledWith(8, expect.any(global.Event));
      expect(global.Event).toHaveBeenCalledTimes(8);
      expect(global.Event).toHaveBeenNthCalledWith(1, 'focus', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(2, 'reset', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(3, 'keydown', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(4, 'keypress', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(5, 'keyup', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(6, 'input', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(7, 'change', evtInit);
      expect(global.Event).toHaveBeenNthCalledWith(8, 'blur', evtInit);
    });

    it('should return falsy', () => {
      const actual = formMutator.typeValue(null, 'value');

      expect(actual).toBeFalsy();
      expect(global.Event).not.toHaveBeenCalled();
    });
  });
});
