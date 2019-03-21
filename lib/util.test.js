"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("./index.js");

var _util = require("./util");

// Public package exports
// Private package import
describe('#normalizeTypeDescriptors', function () {
  it('handles string types', function () {
    var types = ['REQUEST', 'SUCCESS', 'FAILURE'];
    var descriptors = (0, _util.normalizeTypeDescriptors)(types);
    expect(descriptors).toMatchSnapshot();
  });
  it('handles object types', function () {
    var types = [{
      type: 'REQUEST',
      payload: 'requestPayload',
      meta: 'requestMeta'
    }, {
      type: 'SUCCESS',
      payload: 'successPayload',
      meta: 'successMeta'
    }, {
      type: 'FAILURE',
      payload: 'failurePayload',
      meta: 'failureMeta'
    }];
    var descriptors = (0, _util.normalizeTypeDescriptors)(types);
    expect(descriptors).toMatchSnapshot();
  });
});
describe('#actionWith', function () {
  it('handles string payload and meta descriptor properties',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var fsa;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: 'somePayload',
              meta: 'someMeta',
              error: true
            });

          case 2:
            fsa = _context.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('handles function payload and meta descriptor properties',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var fsa;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: function payload() {
                return 'somePayloadFromFn';
              },
              meta: function meta() {
                return 'someMetaFromFn';
              }
            });

          case 2:
            fsa = _context2.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('passes function payload and meta descriptor properties arguments',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var _expect, _expect2;

    var payload, meta, passedArgs, fsa;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            payload = jest.fn();
            payload.mockReturnValue('somePayloadFromMock');
            meta = jest.fn();
            meta.mockReturnValue('someMetaFromMock');
            passedArgs = ['action', 'state', 'res'];
            _context3.next = 7;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: payload,
              meta: meta
            }, passedArgs);

          case 7:
            fsa = _context3.sent;

            (_expect = expect(payload)).toHaveBeenCalledWith.apply(_expect, passedArgs);

            (_expect2 = expect(meta)).toHaveBeenCalledWith.apply(_expect2, passedArgs);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('handles an error in the payload function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4() {
    var fsa;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: function payload() {
                throw new Error('test error in payload function');
              }
            });

          case 2:
            fsa = _context4.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('handles an error in the meta function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    var fsa;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              meta: function meta() {
                throw new Error('test error in meta function');
              }
            });

          case 2:
            fsa = _context5.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('handles a synchronous payload function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6() {
    var fsa;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: function payload() {
                return 'somePayload';
              }
            });

          case 2:
            fsa = _context6.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('handles an asynchronous payload function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7() {
    var fsa;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              payload: new Promise(function (resolve) {
                return setTimeout(function () {
                  return resolve('somePayloadAsync');
                }, 250);
              })
            });

          case 2:
            fsa = _context7.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('handles a synchronous meta function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8() {
    var fsa;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              meta: function meta() {
                return 'someMeta';
              }
            });

          case 2:
            fsa = _context8.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('handles an asynchronous meta function',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9() {
    var fsa;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _util.actionWith)({
              type: 'REQUEST',
              meta: new Promise(function (resolve) {
                return setTimeout(function () {
                  return resolve('someMetaAsync');
                }, 250);
              })
            });

          case 2:
            fsa = _context9.sent;
            expect(fsa).toMatchSnapshot();

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
});
describe('#getJSON', function () {
  it("returns the JSON body of a response with a JSONy 'Content-Type' header",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee10() {
    var res, result;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            res = {
              headers: {
                get: function get(name) {
                  return name === 'Content-Type' ? 'application/json' : undefined;
                }
              },
              json: function json() {
                return Promise.resolve({
                  message: 'ok'
                });
              }
            };
            _context10.next = 3;
            return (0, _index.getJSON)(res);

          case 3:
            result = _context10.sent;
            expect(result).toMatchSnapshot();

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it("returns a resolved promise for a response with a not-JSONy 'Content-Type' header",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee11() {
    var res, result;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            res = {
              headers: {
                get: function get(name) {
                  return name === 'Content-Type' ? 'not it' : undefined;
                }
              }
            };
            _context11.next = 3;
            return (0, _index.getJSON)(res);

          case 3:
            result = _context11.sent;
            expect(result).toBeUndefined();

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
});