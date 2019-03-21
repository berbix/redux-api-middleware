"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMiddleware = createMiddleware;
exports.apiMiddleware = apiMiddleware;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _RSAA = _interopRequireDefault(require("./RSAA"));

var _validation = require("./validation");

var _errors = require("./errors");

var _util = require("./util");

/**
 * Default options for redux-api-middleware
 * These can be customized by passing options into `createMiddleware`
 * @type {Object}
 */
var defaults = {
  ok: function ok(res) {
    return res.ok;
  },
  fetch: fetch
};
/**
 * A middleware creator used to create a ReduxApiMiddleware
 * with custom defaults
 *
 * @type {function}
 * @returns {ReduxMiddleware}
 * @access public
 */

function createMiddleware() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middlewareOptions = Object.assign({}, defaults, options);
  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        // Do not process actions without an [RSAA] property
        if (!(0, _validation.isRSAA)(action)) {
          return next(action);
        }

        return (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee() {
          var validationErrors, _callAPI, _requestType, callAPI, endpoint, body, headers, _callAPI$options, options, _callAPI$fetch, doFetch, _callAPI$ok, ok, method, credentials, bailout, types, _normalizeTypeDescrip, _normalizeTypeDescrip2, requestType, successType, failureType, res, isOk;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Try to dispatch an error request FSA for invalid RSAAs
                  validationErrors = (0, _validation.validateRSAA)(action);

                  if (!validationErrors.length) {
                    _context.next = 5;
                    break;
                  }

                  _callAPI = action[_RSAA.default];

                  if (_callAPI.types && Array.isArray(_callAPI.types)) {
                    _requestType = _callAPI.types[0];

                    if (_requestType && _requestType.type) {
                      _requestType = _requestType.type;
                    }

                    next({
                      type: _requestType,
                      payload: new _errors.InvalidRSAA(validationErrors),
                      error: true
                    });
                  }

                  return _context.abrupt("return");

                case 5:
                  // Parse the validated RSAA action
                  callAPI = action[_RSAA.default];
                  endpoint = callAPI.endpoint, body = callAPI.body, headers = callAPI.headers, _callAPI$options = callAPI.options, options = _callAPI$options === void 0 ? {} : _callAPI$options, _callAPI$fetch = callAPI.fetch, doFetch = _callAPI$fetch === void 0 ? middlewareOptions.fetch : _callAPI$fetch, _callAPI$ok = callAPI.ok, ok = _callAPI$ok === void 0 ? middlewareOptions.ok : _callAPI$ok;
                  method = callAPI.method, credentials = callAPI.credentials, bailout = callAPI.bailout, types = callAPI.types;
                  _normalizeTypeDescrip = (0, _util.normalizeTypeDescriptors)(types), _normalizeTypeDescrip2 = (0, _slicedToArray2.default)(_normalizeTypeDescrip, 3), requestType = _normalizeTypeDescrip2[0], successType = _normalizeTypeDescrip2[1], failureType = _normalizeTypeDescrip2[2]; // Should we bail out?

                  _context.prev = 9;

                  if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
                    _context.next = 12;
                    break;
                  }

                  return _context.abrupt("return");

                case 12:
                  _context.next = 21;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](9);
                  _context.t1 = next;
                  _context.next = 19;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError('[RSAA].bailout function failed'),
                    error: true
                  }), [action, getState()]);

                case 19:
                  _context.t2 = _context.sent;
                  return _context.abrupt("return", (0, _context.t1)(_context.t2));

                case 21:
                  if (!(typeof endpoint === 'function')) {
                    _context.next = 33;
                    break;
                  }

                  _context.prev = 22;
                  endpoint = endpoint(getState());
                  _context.next = 33;
                  break;

                case 26:
                  _context.prev = 26;
                  _context.t3 = _context["catch"](22);
                  _context.t4 = next;
                  _context.next = 31;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError('[RSAA].endpoint function failed'),
                    error: true
                  }), [action, getState()]);

                case 31:
                  _context.t5 = _context.sent;
                  return _context.abrupt("return", (0, _context.t4)(_context.t5));

                case 33:
                  if (!(typeof body === 'function')) {
                    _context.next = 45;
                    break;
                  }

                  _context.prev = 34;
                  body = body(getState());
                  _context.next = 45;
                  break;

                case 38:
                  _context.prev = 38;
                  _context.t6 = _context["catch"](34);
                  _context.t7 = next;
                  _context.next = 43;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError('[RSAA].body function failed'),
                    error: true
                  }), [action, getState()]);

                case 43:
                  _context.t8 = _context.sent;
                  return _context.abrupt("return", (0, _context.t7)(_context.t8));

                case 45:
                  if (!(typeof headers === 'function')) {
                    _context.next = 57;
                    break;
                  }

                  _context.prev = 46;
                  headers = headers(getState());
                  _context.next = 57;
                  break;

                case 50:
                  _context.prev = 50;
                  _context.t9 = _context["catch"](46);
                  _context.t10 = next;
                  _context.next = 55;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError('[RSAA].headers function failed'),
                    error: true
                  }), [action, getState()]);

                case 55:
                  _context.t11 = _context.sent;
                  return _context.abrupt("return", (0, _context.t10)(_context.t11));

                case 57:
                  if (!(typeof options === 'function')) {
                    _context.next = 69;
                    break;
                  }

                  _context.prev = 58;
                  options = options(getState());
                  _context.next = 69;
                  break;

                case 62:
                  _context.prev = 62;
                  _context.t12 = _context["catch"](58);
                  _context.t13 = next;
                  _context.next = 67;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError('[RSAA].options function failed'),
                    error: true
                  }), [action, getState()]);

                case 67:
                  _context.t14 = _context.sent;
                  return _context.abrupt("return", (0, _context.t13)(_context.t14));

                case 69:
                  if (!(typeof requestType.payload === 'function' || typeof requestType.meta === 'function')) {
                    _context.next = 77;
                    break;
                  }

                  _context.t15 = next;
                  _context.next = 73;
                  return (0, _util.actionWith)(requestType, [action, getState()]);

                case 73:
                  _context.t16 = _context.sent;
                  (0, _context.t15)(_context.t16);
                  _context.next = 78;
                  break;

                case 77:
                  next(requestType);

                case 78:
                  _context.prev = 78;
                  _context.next = 81;
                  return doFetch(endpoint, (0, _objectSpread2.default)({}, options, {
                    method: method,
                    body: body || undefined,
                    credentials: credentials,
                    headers: headers || {}
                  }));

                case 81:
                  res = _context.sent;
                  _context.next = 91;
                  break;

                case 84:
                  _context.prev = 84;
                  _context.t17 = _context["catch"](78);
                  _context.t18 = next;
                  _context.next = 89;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.RequestError(_context.t17.message),
                    error: true
                  }), [action, getState()]);

                case 89:
                  _context.t19 = _context.sent;
                  return _context.abrupt("return", (0, _context.t18)(_context.t19));

                case 91:
                  _context.prev = 91;
                  isOk = ok(res);
                  _context.next = 102;
                  break;

                case 95:
                  _context.prev = 95;
                  _context.t20 = _context["catch"](91);
                  _context.t21 = next;
                  _context.next = 100;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    payload: new _errors.InternalError('[RSAA].ok function failed'),
                    error: true
                  }), [action, getState(), res]);

                case 100:
                  _context.t22 = _context.sent;
                  return _context.abrupt("return", (0, _context.t21)(_context.t22));

                case 102:
                  if (!isOk) {
                    _context.next = 110;
                    break;
                  }

                  _context.t23 = next;
                  _context.next = 106;
                  return (0, _util.actionWith)(successType, [action, getState(), res]);

                case 106:
                  _context.t24 = _context.sent;
                  return _context.abrupt("return", (0, _context.t23)(_context.t24));

                case 110:
                  _context.t25 = next;
                  _context.next = 113;
                  return (0, _util.actionWith)((0, _objectSpread2.default)({}, failureType, {
                    error: true
                  }), [action, getState(), res]);

                case 113:
                  _context.t26 = _context.sent;
                  return _context.abrupt("return", (0, _context.t25)(_context.t26));

                case 115:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[9, 14], [22, 26], [34, 38], [46, 50], [58, 62], [78, 84], [91, 95]]);
        }))();
      };
    };
  };
}
/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */


function apiMiddleware(_ref3) {
  var getState = _ref3.getState;
  return createMiddleware()({
    getState: getState
  });
}