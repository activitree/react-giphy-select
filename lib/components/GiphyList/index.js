"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCustomScrollbars = require("react-custom-scrollbars-2");

var _reactMasonryComponent = _interopRequireDefault(require("@activitree/react-masonry-component"));

var _styles = _interopRequireDefault(require("./styles.css"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GiphyList = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(GiphyList, _Component);

  var _super = _createSuper(GiphyList);

  function GiphyList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GiphyList);
    _this = _super.call(this, props);
    _this._theme = _objectSpread({
      list: _styles.default.list,
      listEmpty: _styles.default.listEmpty,
      listScrollbar: _styles.default.listScrollbar,
      listScrollbarThumb: _styles.default.listScrollbarThumb,
      listMasonry: _styles.default.listMasonry,
      listItem: _styles.default.listItem,
      listEntry: _styles.default.listEntry,
      listEntryImage: _styles.default.listEntryImage
    }, _this.props.theme);
    _this._onScroll = _this._onScroll.bind((0, _assertThisInitialized2.default)(_this));
    _this._onWheel = _this._onWheel.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(GiphyList, [{
    key: "_onScroll",
    value: function _onScroll(values) {
      if (values.top === 1) {
        this.props.loadNextPage();
      }
    }
  }, {
    key: "_onWheel",
    value: function _onWheel(e) {
      // Disable page scroll, but enable gifs scroll
      var _this$_scrollbars$get = this._scrollbars.getValues(),
          clientHeight = _this$_scrollbars$get.clientHeight,
          scrollHeight = _this$_scrollbars$get.scrollHeight,
          scrollTop = _this$_scrollbars$get.scrollTop;

      if (e.deltaY > 0) {
        if (scrollTop < scrollHeight - clientHeight - e.deltaY) {
          e.stopPropagation();
        } else {
          this._scrollbars.scrollToBottom();
        }
      } else {
        if (scrollTop > -e.deltaY) {
          // eslint-disable-line no-lonely-if
          e.stopPropagation();
        } else {
          this._scrollbars.scrollTop();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          items = _this$props.items,
          onEntrySelect = _this$props.onEntrySelect;
      var theme = this._theme;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: items.length ? theme.list : theme.listEmpty,
        onWheel: this._onWheel
      }, /*#__PURE__*/_react.default.createElement(_reactCustomScrollbars.Scrollbars, {
        onScrollFrame: this._onScroll,
        renderTrackVertical: function renderTrackVertical() {
          return /*#__PURE__*/_react.default.createElement("div", {
            className: theme.listScrollbar
          });
        },
        renderThumbVertical: function renderThumbVertical(props) {
          return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, props, {
            className: theme.listScrollbarThumb
          }));
        },
        hideTracksWhenNotNeeded: true,
        ref: function ref(element) {
          _this2._scrollbars = element;
        }
      }, /*#__PURE__*/_react.default.createElement(_reactMasonryComponent.default, {
        className: theme.listMasonry,
        role: "listbox"
      }, items.map(function (entry, index) {
        if (entry.images && entry.images.fixed_width_small && entry.images.fixed_width_small.url) {
          return /*#__PURE__*/_react.default.createElement("div", {
            key: "".concat(index).concat(entry.id),
            className: theme.listItem
          }, _this2.props.renderEntry(entry, onEntrySelect, {
            theme: theme
          }));
        }
      }))));
    }
  }]);
  return GiphyList;
}(_react.Component);

exports.default = GiphyList;
GiphyList.defaultProps = {
  theme: {},
  renderEntry: function renderEntry(entry, onSelect, options) {
    return /*#__PURE__*/_react.default.createElement("button", {
      className: options.theme.listEntry,
      style: {
        width: "".concat(entry.images.fixed_width_small.width, "px"),
        height: "".concat(entry.images.fixed_width_small.height, "px"),
        backgroundImage: "url(".concat(entry.images.fixed_width_small_still.url, ")")
      },
      onClick: function onClick() {
        return onSelect(entry);
      },
      role: "option",
      "aria-selected": true
    }, /*#__PURE__*/_react.default.createElement("img", {
      className: options.theme.listEntryImage,
      src: entry.images.fixed_width_small.url,
      width: entry.images.fixed_width_small.width,
      height: entry.images.fixed_width_small.height // alt={entry.slug}

    }));
  },
  onEntrySelect: function onEntrySelect() {}
};
GiphyList.propTypes = {
  theme: _propTypes.default.shape({
    list: _propTypes.default.string,
    listScrollbar: _propTypes.default.string,
    listScrollbarThumb: _propTypes.default.string,
    listMasonry: _propTypes.default.string,
    listItem: _propTypes.default.string,
    listEntry: _propTypes.default.string,
    listEntryImage: _propTypes.default.string
  }),
  items: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  renderEntry: _propTypes.default.func,
  onEntrySelect: _propTypes.default.func,
  loadNextPage: _propTypes.default.func.isRequired
};
//# sourceMappingURL=index.js.map