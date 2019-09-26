'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('isomorphic-fetch');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GiphyList = require('../GiphyList');

var _GiphyList2 = _interopRequireDefault(_GiphyList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'select': 'react-giphy-select__src-components-GiphySelect-styles__select___25GhN',
  'selectInput': 'react-giphy-select__src-components-GiphySelect-styles__selectInput___18Wcj',
  'attribution': 'react-giphy-select__src-components-GiphySelect-styles__attribution___1RUSw'
};

var GiphySelect = function (_Component) {
  _inherits(GiphySelect, _Component);

  function GiphySelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GiphySelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GiphySelect.__proto__ || Object.getPrototypeOf(GiphySelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      items: []
    }, _this.shouldComponentUpdate = function () {
      return !_this._activeFetch;
    }, _this.loadNextPage = function () {
      if (_this._offset < _this._totalCount) {
        _this._fetchItems();
      }
    }, _this._onQueryChange = function (e) {
      var query = e.target.value.trim();

      if (_this._requestTimer) {
        clearTimeout(_this._requestTimer);
        _this._requestTimer = null;
      }

      _this._requestTimer = setTimeout(function () {
        if (query !== _this._query) {
          _this._query = query;
          _this._offset = 0;
          _this._activeFetch = true;
          _this.setState({
            items: []
          });
          _this._fetchItems();
        }
      }, _this.props.requestDelay);
    }, _this._onWheel = function (e) {
      return e.preventDefault();
    }, _this._fetchItems = function () {
      var _this$props = _this.props,
          requestKey = _this$props.requestKey,
          requestLang = _this$props.requestLang,
          requestRating = _this$props.requestRating;

      var endpoint = '';
      if (_this._query) {
        endpoint = 'search?q=' + encodeURIComponent(_this._query) + '&';
      } else {
        endpoint = 'trending?';
      }
      var offset = _this._offset;

      fetch(location.protocol + '//api.giphy.com/v1/gifs/' + endpoint + 'offset=' + offset + '&lang=' + requestLang + '&rating=' + requestRating + '&api_key=' + requestKey).then(function (response) {
        return response.json();
      }).then(_this._updateItems).catch(console.error); // eslint-disable-line no-console
    }, _this._updateItems = function (response) {
      _this._activeFetch = false;
      _this.setState(function (prevState) {
        return {
          items: [].concat(_toConsumableArray(prevState.items), _toConsumableArray(response.data))
        };
      });
      _this._offset = response.pagination.offset + response.pagination.count;
      _this._totalCount = response.pagination.total_count;
    }, _this._theme = _extends({
      select: styles.select,
      selectInput: styles.selectInput,
      attribution: styles.attribution
    }, _this.props.theme), _this._query = '', _this._requestTimer = null, _this._offset = 0, _this._totalCount = 0, _this._activeFetch = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GiphySelect, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._fetchItems();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          renderEntry = _props.renderEntry,
          onEntrySelect = _props.onEntrySelect;

      var theme = this._theme;

      return _react2.default.createElement(
        'div',
        { className: theme.select, onWheel: this._onWheel },
        _react2.default.createElement('input', {
          className: theme.selectInput,
          placeholder: placeholder,
          onChange: this._onQueryChange
        }),
        _react2.default.createElement(_GiphyList2.default, {
          theme: theme,
          items: this.state.items,
          renderEntry: renderEntry,
          onEntrySelect: onEntrySelect,
          loadNextPage: this.loadNextPage
        }),
        _react2.default.createElement(
          'div',
          { className: theme.attribution },
          'Powered by Giphy'
        )
      );
    }
  }]);

  return GiphySelect;
}(_react.Component);

GiphySelect.propTypes = {
  theme: _propTypes2.default.shape({
    select: _propTypes2.default.string,
    selectInput: _propTypes2.default.string,
    attribution: _propTypes2.default.string
  }),
  placeholder: _propTypes2.default.string,
  requestDelay: _propTypes2.default.number,
  requestKey: _propTypes2.default.string,
  requestLang: _propTypes2.default.string,
  requestRating: _propTypes2.default.string,
  renderEntry: _propTypes2.default.func,
  onEntrySelect: _propTypes2.default.func
};
GiphySelect.defaultProps = {
  theme: {},
  placeholder: 'Search GIFs',
  requestDelay: 500,
  requestKey: 'dc6zaTOxFJmzC',
  requestLang: '',
  requestRating: 'pg',
  renderEntry: _GiphyList2.default.defaultProps.renderEntry,
  onEntrySelect: _GiphyList2.default.defaultProps.onEntrySelect
};
exports.default = GiphySelect;