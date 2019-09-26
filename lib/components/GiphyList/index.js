'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _reactMasonryComponent = require('react-masonry-component');

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'list': 'react-giphy-select__src-components-GiphyList-styles__list___Tdg5X',
  'listEmpty': 'react-giphy-select__src-components-GiphyList-styles__listEmpty___1SDRT react-giphy-select__src-components-GiphyList-styles__list___Tdg5X',
  'listScrollbar': 'react-giphy-select__src-components-GiphyList-styles__listScrollbar___1dS3n',
  'listScrollbarThumb': 'react-giphy-select__src-components-GiphyList-styles__listScrollbarThumb___1L0ZG',
  'listMasonry': 'react-giphy-select__src-components-GiphyList-styles__listMasonry___3rIoZ',
  'listItem': 'react-giphy-select__src-components-GiphyList-styles__listItem___2RULM',
  'listEntry': 'react-giphy-select__src-components-GiphyList-styles__listEntry___D_T4j',
  'listEntryImage': 'react-giphy-select__src-components-GiphyList-styles__listEntryImage___1oyhk'
};

var GiphyList = function (_Component) {
  _inherits(GiphyList, _Component);

  function GiphyList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GiphyList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GiphyList.__proto__ || Object.getPrototypeOf(GiphyList)).call.apply(_ref, [this].concat(args))), _this), _this._onScroll = function (values) {
      if (values.top === 1) {
        _this.props.loadNextPage();
      }
    }, _this._onWheel = function (e) {
      // Disable page scroll, but enable gifs scroll
      var _this$_scrollbars$get = _this._scrollbars.getValues(),
          clientHeight = _this$_scrollbars$get.clientHeight,
          scrollHeight = _this$_scrollbars$get.scrollHeight,
          scrollTop = _this$_scrollbars$get.scrollTop;

      if (e.deltaY > 0) {
        if (scrollTop < scrollHeight - clientHeight - e.deltaY) {
          e.stopPropagation();
        } else {
          _this._scrollbars.scrollToBottom();
        }
      } else {
        if (scrollTop > -e.deltaY) {
          // eslint-disable-line no-lonely-if
          e.stopPropagation();
        } else {
          _this._scrollbars.scrollTop();
        }
      }
    }, _this._theme = _extends({
      list: styles.list,
      listEmpty: styles.listEmpty,
      listScrollbar: styles.listScrollbar,
      listScrollbarThumb: styles.listScrollbarThumb,
      listMasonry: styles.listMasonry,
      listItem: styles.listItem,
      listEntry: styles.listEntry,
      listEntryImage: styles.listEntryImage
    }, _this.props.theme), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GiphyList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          onEntrySelect = _props.onEntrySelect;

      var theme = this._theme;

      return _react2.default.createElement(
        'div',
        { className: items.length ? theme.list : theme.listEmpty, onWheel: this._onWheel },
        _react2.default.createElement(
          _reactCustomScrollbars.Scrollbars,
          { onScrollFrame: this._onScroll, renderTrackVertical: function renderTrackVertical() {
              return _react2.default.createElement('div', { className: theme.listScrollbar });
            },
            renderThumbVertical: function renderThumbVertical(props) {
              return _react2.default.createElement('div', _extends({}, props, { className: theme.listScrollbarThumb }));
            },
            hideTracksWhenNotNeeded: true,
            ref: function ref(element) {
              _this2._scrollbars = element;
            }
          },
          _react2.default.createElement(
            _reactMasonryComponent2.default,
            { className: theme.listMasonry, role: 'listbox' },
            items.map(function (entry, index) {
              return _react2.default.createElement(
                'div',
                { key: '' + index + entry.id, className: theme.listItem },
                _this2.props.renderEntry(entry, onEntrySelect, { theme: theme })
              );
            })
          )
        )
      );
    }
  }]);

  return GiphyList;
}(_react.Component);

GiphyList.propTypes = {
  theme: _propTypes2.default.shape({
    list: _propTypes2.default.string,
    listScrollbar: _propTypes2.default.string,
    listScrollbarThumb: _propTypes2.default.string,
    listMasonry: _propTypes2.default.string,
    listItem: _propTypes2.default.string,
    listEntry: _propTypes2.default.string,
    listEntryImage: _propTypes2.default.string
  }),
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  renderEntry: _propTypes2.default.func,
  onEntrySelect: _propTypes2.default.func,
  loadNextPage: _propTypes2.default.func.isRequired
};
GiphyList.defaultProps = {
  theme: {},
  renderEntry: function renderEntry(entry, onSelect, options) {
    return _react2.default.createElement(
      'button',
      {
        className: options.theme.listEntry,
        style: {
          width: entry.images.fixed_width_small.width + 'px',
          height: entry.images.fixed_width_small.height + 'px',
          backgroundImage: 'url(' + entry.images.fixed_width_small_still.url + ')'
        },
        onClick: function onClick() {
          return onSelect(entry);
        },
        role: 'option',
        'aria-selected': true
      },
      _react2.default.createElement('img', {
        className: options.theme.listEntryImage,
        src: entry.images.fixed_width_small.url,
        width: entry.images.fixed_width_small.width,
        height: entry.images.fixed_width_small.height,
        alt: entry.slug
      })
    );
  },
  onEntrySelect: function onEntrySelect() {}
};
exports.default = GiphyList;