"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = getJSON;
exports.normalizeTypeDescriptors = normalizeTypeDescriptors;
exports.actionWith = actionWith;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errors = require("./errors");

/**
 * Extract JSON body from a server response
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
function getJSON(_x) {
  return _getJSON.apply(this, arguments);
}
/**
 * Blow up string or symbol types into full-fledged type descriptors,
 *   and add defaults
 *
 * @function normalizeTypeDescriptors
 * @access private
 * @param {array} types - The [RSAA].types from a validated RSAA
 * @returns {array}
 */


function _getJSON() {
  _getJSON = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(res) {
    var contentType, emptyCodes;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contentType = res.headers.get('Content-Type');
            emptyCodes = [204, 205];

            if (!(!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return res.json();

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return Promise.resolve();

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getJSON.apply(this, arguments);
}

function normalizeTypeDescriptors(types) {
  var _types = (0, _slicedToArray2.default)(types, 3),
      requestType = _types[0],
      successType = _types[1],
      failureType = _types[2];

  if (typeof requestType === 'string' || (0, _typeof2.default)(requestType) === 'symbol') {
    requestType = {
      type: requestType
    };
  }

  if (typeof successType === 'string' || (0, _typeof2.default)(successType) === 'symbol') {
    successType = {
      type: successType
    };
  }

  successType = (0, _objectSpread2.default)({
    payload: function payload(action, state, res) {
      return getJSON(res);
    }
  }, successType);

  if (typeof failureType === 'string' || (0, _typeof2.default)(failureType) === 'symbol') {
    failureType = {
      type: failureType
    };
  }

  failureType = (0, _objectSpread2.default)({
    payload: function payload(action, state, res) {
      return getJSON(res).then(function (json) {
        return new _errors.ApiError(res.status, res.statusText, json);
      });
    }
  }, failureType);
  return [requestType, successType, failureType];
}
/**
 * Evaluate a type descriptor to an FSA
 *
 * @function actionWith
 * @access private
 * @param {object} descriptor - A type descriptor
 * @param {array} args - The array of arguments for `payload` and `meta` function properties
 * @returns {object}
 */


function actionWith(_x2) {
  return _actionWith.apply(this, arguments);
}

function _actionWith() {
  _actionWith = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(descriptor) {
    var args,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            args = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
            _context2.prev = 1;

            if (!(typeof descriptor.payload === 'function')) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return descriptor.payload.apply(descriptor, (0, _toConsumableArray2.default)(args));

          case 5:
            _context2.t0 = _context2.sent;
            _context2.next = 9;
            break;

          case 8:
            _context2.t0 = descriptor.payload;

          case 9:
            descriptor.payload = _context2.t0;
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t1 = _context2["catch"](1);
            descriptor.payload = new _errors.InternalError(_context2.t1.message);
            descriptor.error = true;

          case 16:
            _context2.prev = 16;

            if (!(typeof descriptor.meta === 'function')) {
              _context2.next = 23;
              break;
            }

            _context2.next = 20;
            return descriptor.meta.apply(descriptor, (0, _toConsumableArray2.default)(args));

          case 20:
            _context2.t2 = _context2.sent;
            _context2.next = 24;
            break;

          case 23:
            _context2.t2 = descriptor.meta;

          case 24:
            descriptor.meta = _context2.t2;
            _context2.next = 32;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t3 = _context2["catch"](16);
            delete descriptor.meta;
            descriptor.payload = new _errors.InternalError(_context2.t3.message);
            descriptor.error = true;

          case 32:
            return _context2.abrupt("return", descriptor);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12], [16, 27]]);
  }));
  return _actionWith.apply(this, arguments);
}