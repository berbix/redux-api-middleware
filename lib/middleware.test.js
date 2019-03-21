"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reduxApiMiddleware = require("redux-api-middleware");

// Public package exports
var fetchMockSnapshotMatcher = {
  invocationCallOrder: expect.any(Object)
}; // const fetchMockSnapshotMatcher = {};

var doTestMiddleware =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var response, action, body, mockConfig, doGetState, doNext, nextHandler, actionHandler, result, final;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = _ref.response, action = _ref.action;

            if (response) {
              body = response.body, mockConfig = (0, _objectWithoutProperties2.default)(response, ["body"]);
              fetch.mockResponseOnce(body, mockConfig);
            }

            doGetState = jest.fn();
            doGetState.mockImplementation(function () {});
            doNext = jest.fn();
            doNext.mockImplementation(function (it) {
              return it;
            });
            nextHandler = (0, _reduxApiMiddleware.apiMiddleware)({
              getState: doGetState
            });
            actionHandler = nextHandler(doNext);
            result = actionHandler(action);

            if (!result) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return result;

          case 12:
            final = _context.sent;

            if (final) {
              expect(final).toMatchSnapshot({}, 'final result');
            }

          case 14:
            if (doNext.mock.calls.length) {
              expect(doNext).toMatchSnapshot({}, 'next mock');
            }

            if (fetch.mock.calls.length) {
              expect(fetch.mock).toMatchSnapshot({
                invocationCallOrder: expect.any(Object)
              }, 'fetch mock');
            }

            return _context.abrupt("return", {
              doGetState: doGetState,
              nextHandler: nextHandler,
              doNext: doNext,
              actionHandler: actionHandler,
              result: result
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function doTestMiddleware(_x) {
    return _ref2.apply(this, arguments);
  };
}();

describe('#createMiddleware', function () {
  it('returns a redux middleware', function () {
    var doGetState = function doGetState() {};

    var middleware = (0, _reduxApiMiddleware.createMiddleware)();
    var nextHandler = middleware({
      getState: doGetState
    });

    var doNext = function doNext() {};

    var actionHandler = nextHandler(doNext);
    expect((0, _typeof2.default)(middleware)).toEqual('function');
    expect(middleware).toHaveLength(1);
    expect((0, _typeof2.default)(nextHandler)).toEqual('function');
    expect(nextHandler).toHaveLength(1);
    expect((0, _typeof2.default)(actionHandler)).toEqual('function');
    expect(actionHandler).toHaveLength(1);
  });
});
describe('#apiMiddleware', function () {
  it('is a redux middleware', function () {
    var doGetState = function doGetState() {};

    var nextHandler = (0, _reduxApiMiddleware.apiMiddleware)({
      getState: doGetState
    });

    var doNext = function doNext() {};

    var actionHandler = nextHandler(doNext);
    expect((0, _typeof2.default)(_reduxApiMiddleware.apiMiddleware)).toEqual('function');
    expect(_reduxApiMiddleware.apiMiddleware).toHaveLength(1);
    expect((0, _typeof2.default)(nextHandler)).toEqual('function');
    expect(nextHandler).toHaveLength(1);
    expect((0, _typeof2.default)(actionHandler)).toEqual('function');
    expect(actionHandler).toHaveLength(1);
  });
  it('must pass actions without an [RSAA] property to the next handler',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var action, _ref4, doNext;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            action = {};
            _context2.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
            _ref4 = _context2.sent;
            doNext = _ref4.doNext;
            expect(doNext).toHaveBeenCalledWith(action);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("mustn't return a promise on actions without a [RSAA] property",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var action, _ref6, result;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            action = {};
            _context3.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
            _ref6 = _context3.sent;
            result = _ref6.result;
            expect(result.then).toBeUndefined();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('must return a promise on actions without a [RSAA] property',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4() {
    var action, _ref8, result;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {});
            _context4.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
            _ref8 = _context4.sent;
            result = _ref8.result;
            expect((0, _typeof2.default)(result.then)).toEqual('function');

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('must dispatch an error request FSA for an invalid RSAA with a string request type',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    var action;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              types: ['REQUEST']
            });
            _context5.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('must dispatch an error request FSA for an invalid RSAA with a descriptor request type',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6() {
    var action;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              types: [{
                type: 'REQUEST'
              }]
            });
            _context6.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('must do nothing for an invalid RSAA without a request type',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7() {
    var action, _ref12, doNext;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {});
            _context7.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
            _ref12 = _context7.sent;
            doNext = _ref12.doNext;
            expect(doNext).not.toHaveBeenCalled();

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('must dispatch an error request FSA when [RSAA].bailout fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8() {
    var action;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: '',
              method: 'GET',
              bailout: function bailout() {
                throw new Error();
              },
              types: [{
                type: 'REQUEST',
                payload: function payload() {
                  return 'ignoredPayload';
                },
                meta: function meta() {
                  return 'someMeta';
                }
              }, 'SUCCESS', 'FAILURE']
            });
            _context8.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('must dispatch an error request FSA when [RSAA].body fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9() {
    var action;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              body: function body() {
                throw new Error();
              },
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'ignoredPayload',
                meta: 'someMeta'
              }, 'SUCCESS', 'FAILURE']
            });
            _context9.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('must dispatch an error request FSA when [RSAA].endpoint fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10() {
    var action;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: function endpoint() {
                throw new Error();
              },
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'ignoredPayload',
                meta: 'someMeta'
              }, 'SUCCESS', 'FAILURE']
            });
            _context10.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('must dispatch an error request FSA when [RSAA].headers fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11() {
    var action;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: '',
              method: 'GET',
              headers: function headers() {
                throw new Error();
              },
              types: [{
                type: 'REQUEST',
                payload: 'ignoredPayload',
                meta: 'someMeta'
              }, 'SUCCESS', 'FAILURE']
            });
            _context11.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('must dispatch an error request FSA when [RSAA].options fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee12() {
    var action;
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: '',
              method: 'GET',
              options: function options() {
                throw new Error();
              },
              types: [{
                type: 'REQUEST',
                payload: 'ignoredPayload',
                meta: 'someMeta'
              }, 'SUCCESS', 'FAILURE']
            });
            _context12.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('must dispatch an error request FSA when [RSAA].ok fails',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee13() {
    var action;
    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              ok: function ok() {
                throw new Error();
              },
              types: ['REQUEST', 'SUCCESS', 'FAILURE']
            });
            _context13.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('must dispatch a failure FSA with an error on a request error',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee14() {
    var action;
    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            fetch.mockRejectOnce(new Error('Test request error'));
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'ignoredPayload',
                meta: 'someMeta'
              }, 'SUCCESS', 'FAILURE']
            });
            _context14.next = 4;
            return doTestMiddleware({
              action: action
            });

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('must use an [RSAA].bailout boolean when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee15() {
    var action;
    return _regenerator.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              bailout: true
            });
            _context15.next = 3;
            return doTestMiddleware({
              action: action
            });

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it('must use an [RSAA].bailout function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee16() {
    var bailout, action, _ref22, doNext;

    return _regenerator.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            bailout = jest.fn();
            bailout.mockReturnValue(true);
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              bailout: bailout
            });
            _context16.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            _ref22 = _context16.sent;
            doNext = _ref22.doNext;
            expect(bailout).toMatchSnapshot({}, 'bailout()');
            expect(doNext).not.toHaveBeenCalled();

          case 9:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  it('must use an [RSAA].body function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee17() {
    var body, action;
    return _regenerator.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            body = jest.fn();
            body.mockReturnValue('mockBody');
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              body: body
            });
            _context17.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(body).toMatchSnapshot({}, 'body()');

          case 6:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it('must use an [RSAA].endpoint function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee18() {
    var endpoint, action;
    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            endpoint = jest.fn();
            endpoint.mockReturnValue('http://127.0.0.1/api/users/1');
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: endpoint,
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE']
            });
            _context18.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(endpoint).toMatchSnapshot({}, 'endpoint()');

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it('must use an [RSAA].headers function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee19() {
    var headers, action;
    return _regenerator.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            headers = jest.fn();
            headers.mockReturnValue({
              'Test-Header': 'test'
            });
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              headers: headers
            });
            _context19.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(headers).toMatchSnapshot({}, 'headers()');

          case 6:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it('must use an [RSAA].options function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee20() {
    var options, action;
    return _regenerator.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            options = jest.fn();
            options.mockReturnValue({});
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              options: options
            });
            _context20.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(options).toMatchSnapshot({}, 'options()');

          case 6:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it('must use an [RSAA].ok function when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee21() {
    var ok, action;
    return _regenerator.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            ok = jest.fn();
            ok.mockReturnValue(true);
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              ok: ok
            });
            _context21.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(ok).toMatchSnapshot({}, 'ok()');

          case 6:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
  it('must dispatch a failure FSA when [RSAA].ok returns false on a successful request',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee22() {
    var ok, action;
    return _regenerator.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            ok = jest.fn();
            ok.mockReturnValue(false);
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              ok: ok
            });
            _context22.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(ok).toMatchSnapshot({}, 'ok()');

          case 6:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
  it('must use a [RSAA].fetch custom fetch wrapper when present',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee24() {
    var myFetch, action;
    return _regenerator.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            myFetch =
            /*#__PURE__*/
            function () {
              var _ref30 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee23(endpoint, opts) {
                var res, json;
                return _regenerator.default.wrap(function _callee23$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return fetch(endpoint, opts);

                      case 2:
                        res = _context23.sent;
                        _context23.next = 5;
                        return res.json();

                      case 5:
                        json = _context23.sent;
                        return _context23.abrupt("return", new Response(JSON.stringify((0, _objectSpread2.default)({}, json, {
                          foo: 'bar'
                        })), {
                          // Example of custom `res.ok`
                          status: json.error ? 500 : 200,
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }));

                      case 7:
                      case "end":
                        return _context23.stop();
                    }
                  }
                }, _callee23);
              }));

              return function myFetch(_x2, _x3) {
                return _ref30.apply(this, arguments);
              };
            }();

            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              fetch: myFetch
            });
            _context24.next = 4;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  id: 1,
                  name: 'Alan',
                  error: false
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 4:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  })));
  it('must dispatch correct error payload when [RSAA].fetch wrapper returns an error response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee26() {
    var myFetch, action;
    return _regenerator.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            myFetch =
            /*#__PURE__*/
            function () {
              var _ref32 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee25(endpoint, opts) {
                return _regenerator.default.wrap(function _callee25$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        return _context25.abrupt("return", new Response(JSON.stringify({
                          foo: 'bar'
                        }), {
                          status: 500,
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }));

                      case 1:
                      case "end":
                        return _context25.stop();
                    }
                  }
                }, _callee25);
              }));

              return function myFetch(_x4, _x5) {
                return _ref32.apply(this, arguments);
              };
            }();

            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: ['REQUEST', 'SUCCESS', 'FAILURE'],
              fetch: myFetch
            });
            _context26.next = 4;
            return doTestMiddleware({
              action: action
            });

          case 4:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
  it('must use payload property of request type descriptor when it is a function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee27() {
    var payload, action;
    return _regenerator.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            payload = jest.fn();
            payload.mockReturnValue('requestPayload');
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                meta: 'requestMeta',
                payload: payload
              }, 'SUCCESS', 'FAILURE']
            });
            _context27.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(payload).toMatchSnapshot({}, 'payload()');

          case 6:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  })));
  it('must use meta property of request type descriptor when it is a function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee28() {
    var meta, action;
    return _regenerator.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            meta = jest.fn();
            meta.mockReturnValue('requestMeta');
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                meta: meta,
                payload: 'requestPayload'
              }, 'SUCCESS', 'FAILURE']
            });
            _context28.next = 5;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  data: '12345'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 5:
            expect(meta).toMatchSnapshot({}, 'meta()');

          case 6:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  })));
  it('must dispatch a success FSA on a successful API call with a non-empty JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee29() {
    var action;
    return _regenerator.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, {
                type: 'SUCCESS',
                meta: 'successMeta'
              }, 'FAILURE']
            });
            _context29.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  username: 'Alice'
                }),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29);
  })));
  it('must dispatch a success FSA on a successful API call with an empty JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee30() {
    var action;
    return _regenerator.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, {
                type: 'SUCCESS',
                meta: 'successMeta'
              }, 'FAILURE']
            });
            _context30.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({}),
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  })));
  it('must dispatch a success FSA with an error state on a successful API call with an invalid JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee31() {
    var action;
    return _regenerator.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, {
                type: 'SUCCESS',
                meta: 'successMeta',
                payload: function payload() {
                  throw new _reduxApiMiddleware.InternalError('Expected error - simulating invalid JSON');
                }
              }, 'FAILURE']
            });
            _context31.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: '',
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31);
  })));
  it('must dispatch a success FSA on a successful API call with a non-JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee32() {
    var action;
    return _regenerator.default.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, {
                type: 'SUCCESS',
                meta: 'successMeta'
              }, 'FAILURE']
            });
            _context32.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: null,
                status: 200
              }
            });

          case 3:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  })));
  it('must dispatch a failure FSA on an unsuccessful API call with a non-empty JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee33() {
    var action;
    return _regenerator.default.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, 'SUCCESS', {
                type: 'FAILURE',
                meta: 'failureMeta'
              }]
            });
            _context33.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({
                  error: 'Resource not found'
                }),
                status: 404,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  })));
  it('must dispatch a failure FSA on an unsuccessful API call with an empty JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee34() {
    var action;
    return _regenerator.default.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, 'SUCCESS', {
                type: 'FAILURE',
                meta: 'failureMeta'
              }]
            });
            _context34.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: JSON.stringify({}),
                status: 404,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            });

          case 3:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  })));
  it('must dispatch a failure FSA on an unsuccessful API call with a non-JSON response',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee35() {
    var action;
    return _regenerator.default.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
              endpoint: 'http://127.0.0.1/api/users/1',
              method: 'GET',
              types: [{
                type: 'REQUEST',
                payload: 'requestPayload',
                meta: 'requestMeta'
              }, 'SUCCESS', {
                type: 'FAILURE',
                meta: 'failureMeta'
              }]
            });
            _context35.next = 3;
            return doTestMiddleware({
              action: action,
              response: {
                body: '',
                status: 404
              }
            });

          case 3:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35);
  })));
});