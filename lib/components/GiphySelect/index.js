"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

require("isomorphic-fetch");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GiphyList = _interopRequireDefault(require("../GiphyList"));

var _styles = _interopRequireDefault(require("./styles.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GiphySelect = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(GiphySelect, _Component);

  var _super = _createSuper(GiphySelect);

  function GiphySelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GiphySelect);
    _this = _super.call(this, props);
    _this.state = {
      items: []
    };
    _this.loadNextPage = _this.loadNextPage.bind((0, _assertThisInitialized2.default)(_this));
    _this._onQueryChange = _this._onQueryChange.bind((0, _assertThisInitialized2.default)(_this));
    _this._fetchItems = _this._fetchItems.bind((0, _assertThisInitialized2.default)(_this));
    _this._updateItems = _this._updateItems.bind((0, _assertThisInitialized2.default)(_this));
    _this._theme = _objectSpread({
      select: _styles.default.select,
      selectInput: _styles.default.selectInput,
      attribution: _styles.default.attribution
    }, _this.props.theme);
    _this._query = '';
    _this._requestTimer = null;
    _this._offset = 0;
    _this._totalCount = 0;
    _this._activeFetch = false;
    return _this;
  }

  (0, _createClass2.default)(GiphySelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._fetchItems();
    } // shouldComponentUpdate = () => !this._activeFetch

  }, {
    key: "loadNextPage",
    value: function loadNextPage() {
      if (this._offset < this._totalCount) {
        this._fetchItems();
      }
    }
  }, {
    key: "_onQueryChange",
    value: function _onQueryChange(e) {
      var _this2 = this;

      var query = e.target.value.trim();

      if (this._requestTimer) {
        clearTimeout(this._requestTimer);
        this._requestTimer = null;
      }

      this._requestTimer = setTimeout(function () {
        if (query !== _this2._query) {
          _this2._query = query;
          _this2._offset = 0;
          _this2._activeFetch = true;

          _this2.setState({
            items: []
          });

          _this2._fetchItems();
        }
      }, this.props.requestDelay);
    }
  }, {
    key: "_fetchItems",
    value: function _fetchItems() {
      var _this$props = this.props,
          requestKey = _this$props.requestKey,
          requestLang = _this$props.requestLang,
          requestRating = _this$props.requestRating;
      var endpoint = '';

      if (this._query) {
        endpoint = "search?q=".concat(encodeURIComponent(this._query), "&");
      } else {
        endpoint = 'trending?';
      }

      var offset = this._offset;
      fetch("https://api.giphy.com/v1/gifs/".concat(endpoint, "offset=").concat(offset, "&lang=").concat(requestLang, "&rating=").concat(requestRating, "&api_key=").concat(requestKey)).then(function (response) {
        return response.json();
      }).then(this._updateItems).catch(console.error); // eslint-disable-line no-console
    }
  }, {
    key: "_updateItems",
    value: function _updateItems(response) {
      this._activeFetch = false;
      this.setState(function (prevState) {
        return {
          items: [].concat((0, _toConsumableArray2.default)(prevState.items), (0, _toConsumableArray2.default)(response.data))
        };
      });
      this._offset = response.pagination.offset + response.pagination.count;
      this._totalCount = response.pagination.total_count;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          placeholder = _this$props2.placeholder,
          renderEntry = _this$props2.renderEntry,
          onEntrySelect = _this$props2.onEntrySelect;
      var theme = this._theme;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: theme.select
      }, /*#__PURE__*/_react.default.createElement("input", {
        className: theme.selectInput,
        placeholder: placeholder,
        onChange: this._onQueryChange
      }), /*#__PURE__*/_react.default.createElement(_GiphyList.default, {
        theme: theme,
        items: this.state.items,
        renderEntry: renderEntry,
        onEntrySelect: onEntrySelect,
        loadNextPage: this.loadNextPage
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: theme.attribution
      }, "Powered by Giphy"));
    }
  }]);
  return GiphySelect;
}(_react.Component);

exports.default = GiphySelect;
GiphySelect.defaultProps = {
  theme: {},
  placeholder: 'Search GIFs',
  requestDelay: 500,
  requestKey: 'dc6zaTOxFJmzC',
  requestLang: '',
  requestRating: 'pg',
  renderEntry: _GiphyList.default.defaultProps.renderEntry,
  onEntrySelect: _GiphyList.default.defaultProps.onEntrySelect
};
GiphySelect.propTypes = {
  theme: _propTypes.default.shape({
    select: _propTypes.default.string,
    selectInput: _propTypes.default.string,
    attribution: _propTypes.default.string
  }),
  placeholder: _propTypes.default.string,
  requestDelay: _propTypes.default.number,
  requestKey: _propTypes.default.string,
  requestLang: _propTypes.default.string,
  requestRating: _propTypes.default.string,
  renderEntry: _propTypes.default.func,
  onEntrySelect: _propTypes.default.func
};
//# sourceMappingURL=index.js.map