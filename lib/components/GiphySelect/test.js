"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

describe('<GiphySelect />', function () {
  fetch.mockResponse(JSON.stringify({
    data: [],
    pagination: {
      count: 0,
      offset: 0,
      total: 0
    }
  }));
  test('render component', function () {
    var spy = jest.spyOn(_index.default.prototype, 'render');
    var wrapper = shallow( /*#__PURE__*/React.createElement(_index.default, null));
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  test('snapshot match', function () {
    var wrapper = shallow( /*#__PURE__*/React.createElement(_index.default, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('set custom theme', function () {
    var customTheme = {
      select: 'customSelect',
      selectInput: 'customSelectInput',
      attribution: 'customAttribution'
    };
    var wrapper = shallow( /*#__PURE__*/React.createElement(_index.default, {
      theme: customTheme
    }));
    expect(Object.keys(customTheme).every(function (key) {
      return wrapper.find(".".concat(customTheme[key])).length;
    })).toBe(true);
  });
  test('set placeholder to search field', function () {
    var customPlaceholder = 'test';
    var wrapper = shallow( /*#__PURE__*/React.createElement(_index.default, {
      placeholder: customPlaceholder
    }));
    expect(wrapper.find('input').prop('placeholder')).toBe(customPlaceholder);
  });
});
//# sourceMappingURL=test.js.map