"use strict";

var _reduxApiMiddleware = require("redux-api-middleware");

// Public package exports
describe('InvalidRSAA', function () {
  var validationErrors = ['validation error 1', 'validation error 2'];
  var error = new _reduxApiMiddleware.InvalidRSAA(validationErrors);
  it('is an error object', function () {
    expect(error).toBeInstanceOf(Error);
  });
  it('matches snapshot', function () {
    expect(error).toMatchSnapshot();
    expect(Object.entries(error)).toMatchSnapshot('object.entries');
  });
});
describe('InternalError', function () {
  var error = new _reduxApiMiddleware.InternalError('error thrown in payload function');
  it('is an error object', function () {
    expect(error).toBeInstanceOf(Error);
  });
  it('matches snapshot', function () {
    expect(error).toMatchSnapshot();
    expect(Object.entries(error)).toMatchSnapshot('object.entries');
  });
});
describe('RequestError', function () {
  var error = new _reduxApiMiddleware.RequestError('Network request failed');
  it('is an error object', function () {
    expect(error).toBeInstanceOf(Error);
  });
  it('matches snapshot', function () {
    expect(error).toMatchSnapshot();
    expect(Object.entries(error)).toMatchSnapshot('object.entries');
  });
});
describe('ApiError', function () {
  var json = {
    error: 'Resource not found'
  };
  var error = new _reduxApiMiddleware.ApiError(404, 'Not Found', json);
  it('is an error object', function () {
    expect(error).toBeInstanceOf(Error);
  });
  it('matches snapshot', function () {
    expect(error).toMatchSnapshot();
    expect(Object.entries(error)).toMatchSnapshot('object.entries');
  });
});