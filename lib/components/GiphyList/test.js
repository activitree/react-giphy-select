"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

var _giphyData = _interopRequireDefault(require("./helpers/giphyData.json"));

describe('<GiphyList />', function () {
  test('render component', function () {
    var spy = jest.spyOn(_index.default.prototype, 'render');
    var wrapper = shallow( /*#__PURE__*/React.createElement(_index.default, {
      items: [],
      loadNextPage: function loadNextPage() {}
    }));
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  test('snapshot match', function () {
    var wrapper = render( /*#__PURE__*/React.createElement(_index.default, {
      items: _giphyData.default,
      loadNextPage: function loadNextPage() {}
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('set custom theme', function () {
    var customTheme = {
      list: 'customList',
      listScrollbar: 'customListScrollbar',
      listScrollbarThumb: 'customListScrollbarThumb',
      listMasonry: 'customListMasonry',
      listItem: 'customListItem',
      listEntry: 'customListEntry',
      listEntryImage: 'customListEntryImage'
    };
    var wrapper = render( /*#__PURE__*/React.createElement(_index.default, {
      items: _giphyData.default,
      loadNextPage: function loadNextPage() {},
      theme: customTheme
    }));
    expect(Object.keys(customTheme).every(function (key) {
      return wrapper.find(".".concat(customTheme[key])).length;
    })).toBe(true);
  });
  test('set custom "renderEntry" method', function () {
    var customRenderEntry = jest.fn();
    var wrapper = render( /*#__PURE__*/React.createElement(_index.default, {
      items: _giphyData.default,
      loadNextPage: function loadNextPage() {},
      renderEntry: customRenderEntry
    }));
    expect(customRenderEntry).toHaveBeenCalled();
  });
  test('set "onEntrySelect" method', function () {
    var onEntrySelect = jest.fn();
    var wrapper = mount( /*#__PURE__*/React.createElement(_index.default, {
      items: _giphyData.default,
      loadNextPage: function loadNextPage() {},
      onEntrySelect: onEntrySelect
    }));
    wrapper.find('button').simulate('click');
    expect(onEntrySelect).toHaveBeenCalled();
  });
});
//# sourceMappingURL=test.js.map