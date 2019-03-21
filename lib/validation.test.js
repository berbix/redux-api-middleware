"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reduxApiMiddleware = require("redux-api-middleware");

var _validation = require("./validation");

// Public package exports
// Private package import
describe('#isValidTypeDescriptor', function () {
  it('must be a plain JavaScript object', function () {
    var descriptor = '';
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeFalsy();
  });
  it('must not have properties other than type, payload and meta', function () {
    var descriptor = {
      type: '',
      invalidKey: ''
    };
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeFalsy();
  });
  it('must have a type property', function () {
    var descriptor = {};
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeFalsy();
  });
  it('must not have a type property that is not a string or a symbol', function () {
    var descriptor = {
      type: {}
    };
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeFalsy();
  });
  it('may have a type property that is a string', function () {
    var descriptor = {
      type: ''
    };
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeTruthy();
  });
  it('may have a type property that is a symbol', function () {
    var descriptor = {
      type: Symbol()
    };
    expect((0, _validation.isValidTypeDescriptor)(descriptor)).toBeTruthy();
  });
});
describe('#isRSAA', function () {
  it('RSAAs must be plain JavaScript objects', function () {
    expect((0, _reduxApiMiddleware.isRSAA)('')).toBeFalsy();
  });
  it('RSAAs must have an [RSAA] property', function () {
    expect((0, _reduxApiMiddleware.isRSAA)({})).toBeFalsy();
  });
  it('returns true for an RSAA', function () {
    expect((0, _reduxApiMiddleware.isRSAA)((0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {}))).toBeTruthy();
  });
});
describe('#validateRSAA / #isValidRSAA', function () {
  it('handles invalid actions', function () {
    expect((0, _reduxApiMiddleware.isValidRSAA)('')).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)('')).toMatchSnapshot();
  });
  it('handles invalid RSAA value (string)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, '');
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid RSAA value (invalid object)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      invalidKey: ''
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles missing RSAA properties', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {});
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].endpoint property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: {},
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].method property (object)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: {},
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].method property (invalid string)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'INVALID_METHOD',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].headers property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      headers: ''
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].credentials property (object)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      credentials: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].credentials property (invalid string)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      credentials: 'InvalidCredentials'
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].bailout property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      bailout: ''
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].types property (object)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].types property (wrong length)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['a', 'b']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].types property (invalid objects)', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: [{}, {}, {}]
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].options property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      options: ''
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].fetch property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      fetch: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles invalid [RSAA].ok property', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      ok: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeFalsy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with endpoint string', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with endpoint function', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: function endpoint() {
        return '';
      },
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with headers object', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      headers: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with headers function', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      headers: function headers() {
        return {};
      }
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with bailout boolean', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      bailout: false
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with bailout function', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      bailout: function bailout() {
        return false;
      }
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with types of symbols', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: [Symbol(), Symbol(), Symbol()]
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with types of type descriptors', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: [{
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
      }]
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with options object', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      options: {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with options function', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      options: function options() {
        return {};
      }
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles valid RSAA with fetch function', function () {
    var action = (0, _defineProperty2.default)({}, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      fetch: function fetch() {}
    });
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles top-level string properties other than RSAA', function () {
    var _action28;

    var action = (_action28 = {}, (0, _defineProperty2.default)(_action28, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }), (0, _defineProperty2.default)(_action28, "anotherKey", 'foo'), _action28);
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
  it('handles top-level symbol properties other than RSAA', function () {
    var _action29;

    var action = (_action29 = {}, (0, _defineProperty2.default)(_action29, _reduxApiMiddleware.RSAA, {
      endpoint: '',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }), (0, _defineProperty2.default)(_action29, Symbol('action30 Symbol'), 'foo'), _action29);
    expect((0, _reduxApiMiddleware.isValidRSAA)(action)).toBeTruthy();
    expect((0, _reduxApiMiddleware.validateRSAA)(action)).toMatchSnapshot();
  });
});