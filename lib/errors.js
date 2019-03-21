"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiError = exports.RequestError = exports.InternalError = exports.InvalidRSAA = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

/**
 * Error class for an RSAA that does not conform to the RSAA definition
 *
 * @class InvalidRSAA
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
var InvalidRSAA =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2.default)(InvalidRSAA, _Error);

  function InvalidRSAA(validationErrors) {
    var _this;

    (0, _classCallCheck2.default)(this, InvalidRSAA);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InvalidRSAA).call(this));
    _this.name = 'InvalidRSAA';
    _this.message = 'Invalid RSAA';
    _this.validationErrors = validationErrors;
    return _this;
  }

  return InvalidRSAA;
}((0, _wrapNativeSuper2.default)(Error));
/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */


exports.InvalidRSAA = InvalidRSAA;

var InternalError =
/*#__PURE__*/
function (_Error2) {
  (0, _inherits2.default)(InternalError, _Error2);

  function InternalError(message) {
    var _this2;

    (0, _classCallCheck2.default)(this, InternalError);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InternalError).call(this));
    _this2.name = 'InternalError';
    _this2.message = message;
    return _this2;
  }

  return InternalError;
}((0, _wrapNativeSuper2.default)(Error));
/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */


exports.InternalError = InternalError;

var RequestError =
/*#__PURE__*/
function (_Error3) {
  (0, _inherits2.default)(RequestError, _Error3);

  function RequestError(message) {
    var _this3;

    (0, _classCallCheck2.default)(this, RequestError);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RequestError).call(this));
    _this3.name = 'RequestError';
    _this3.message = message;
    return _this3;
  }

  return RequestError;
}((0, _wrapNativeSuper2.default)(Error));
/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access public
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */


exports.RequestError = RequestError;

var ApiError =
/*#__PURE__*/
function (_Error4) {
  (0, _inherits2.default)(ApiError, _Error4);

  function ApiError(status, statusText, response) {
    var _this4;

    (0, _classCallCheck2.default)(this, ApiError);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ApiError).call(this));
    _this4.name = 'ApiError';
    _this4.status = status;
    _this4.statusText = statusText;
    _this4.response = response;
    _this4.message = "".concat(status, " - ").concat(statusText);
    return _this4;
  }

  return ApiError;
}((0, _wrapNativeSuper2.default)(Error));

exports.ApiError = ApiError;