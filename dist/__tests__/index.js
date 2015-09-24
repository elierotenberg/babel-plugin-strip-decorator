'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _shouldAsFunction = require('should/as-function');

var _shouldAsFunction2 = _interopRequireDefault(_shouldAsFunction);

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var describe = global.describe;
var it = global.it;

describe('stripDecorator', function () {
  function makeTransformer(plugins) {
    return function (code) {
      return babel.transform(code, {
        optional: ['es7.decorators'],
        plugins: plugins
      }).code;
    };
  }
  var defaultTransformer = makeTransformer([]);
  var stripDecoratorTransformer = function stripDecoratorTransformer(decorator) {
    return makeTransformer([{ transformer: (0, _2['default'])(decorator), position: 'before' }]);
  };
  var codeWithoutDecorator = '\n    class A {\n      test() {\n        return this;\n      }\n    }\n    function decoratorA() { // no-op decorator\n      return (target, key, desc) => desc;\n    }\n  ';
  var codeWithDecoratorA = '\n    class A {\n      @decoratorA()\n      test() {\n        return this;\n      }\n    }\n    function decoratorA() { // no-op decorator\n      return (target, key, desc) => desc;\n    }\n  ';
  var codeWithDecoratorB = codeWithDecoratorA.replace('decoratorA', 'decoratorB');
  it('should do nothing when no decorator is present', function () {
    return (0, _shouldAsFunction2['default'])(stripDecoratorTransformer('decoratorA')(codeWithoutDecorator)).be.exactly(defaultTransformer(codeWithoutDecorator));
  });
  it('shouldn\'t strip decorator without the given name', function () {
    return (0, _shouldAsFunction2['default'])(stripDecoratorTransformer('decoratorA')(codeWithDecoratorB)).be.exactly(defaultTransformer(codeWithDecoratorB));
  });
  it('should strip decorator with the given name', function () {
    return (0, _shouldAsFunction2['default'])(stripDecoratorTransformer('decoratorA')(codeWithDecoratorA)).be.exactly(defaultTransformer(codeWithoutDecorator));
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fdGVzdHNfXy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2dDQUFtQixvQkFBb0I7Ozs7eUJBQ2hCLFlBQVk7O0lBQXZCLEtBQUs7O2dCQUdVLEtBQUs7Ozs7SUFGeEIsUUFBUSxHQUFTLE1BQU0sQ0FBdkIsUUFBUTtJQUFFLEVBQUUsR0FBSyxNQUFNLENBQWIsRUFBRTs7QUFJcEIsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFlBQU07QUFDL0IsV0FBUyxlQUFlLENBQUMsT0FBTyxFQUFFO0FBQ2hDLFdBQU8sVUFBQyxJQUFJO2FBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDckMsZ0JBQVEsRUFBRSxDQUNSLGdCQUFnQixDQUNqQjtBQUNELGVBQU8sRUFBUCxPQUFPO09BQ1IsQ0FBQyxDQUFDLElBQUk7S0FBQSxDQUFDO0dBQ1Q7QUFDRCxNQUFNLGtCQUFrQixHQUFHLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMvQyxNQUFNLHlCQUF5QixHQUFHLFNBQTVCLHlCQUF5QixDQUFJLFNBQVM7V0FDMUMsZUFBZSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsbUJBQWUsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7R0FBQSxDQUFDO0FBQ3BGLE1BQU0sb0JBQW9CLGdMQVN6QixDQUFDO0FBQ0YsTUFBTSxrQkFBa0IscU1BVXZCLENBQUM7QUFDRixNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDbEYsSUFBRSxDQUFDLGdEQUFnRCxFQUFFO1dBQ25ELG1DQUFPLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FDcEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0dBQUEsQ0FDdEQsQ0FBQztBQUNGLElBQUUsQ0FBQyxtREFBbUQsRUFBRTtXQUN0RCxtQ0FBTyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQ2xFLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztHQUFBLENBQ3BELENBQUM7QUFDRixJQUFFLENBQUMsNENBQTRDLEVBQUU7V0FDL0MsbUNBQU8seUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUNsRSxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7R0FBQSxDQUN0RCxDQUFDO0NBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6Il9fdGVzdHNfXy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG91bGQgZnJvbSAnc2hvdWxkL2FzLWZ1bmN0aW9uJztcclxuaW1wb3J0ICogYXMgYmFiZWwgZnJvbSAnYmFiZWwtY29yZSc7XHJcbmNvbnN0IHsgZGVzY3JpYmUsIGl0IH0gPSBnbG9iYWw7XHJcblxyXG5pbXBvcnQgc3RyaXBEZWNvcmF0b3IgZnJvbSAnLi4vJztcclxuXHJcbmRlc2NyaWJlKCdzdHJpcERlY29yYXRvcicsICgpID0+IHtcclxuICBmdW5jdGlvbiBtYWtlVHJhbnNmb3JtZXIocGx1Z2lucykge1xyXG4gICAgcmV0dXJuIChjb2RlKSA9PiBiYWJlbC50cmFuc2Zvcm0oY29kZSwge1xyXG4gICAgICBvcHRpb25hbDogW1xyXG4gICAgICAgICdlczcuZGVjb3JhdG9ycycsXHJcbiAgICAgIF0sXHJcbiAgICAgIHBsdWdpbnMsXHJcbiAgICB9KS5jb2RlO1xyXG4gIH1cclxuICBjb25zdCBkZWZhdWx0VHJhbnNmb3JtZXIgPSBtYWtlVHJhbnNmb3JtZXIoW10pO1xyXG4gIGNvbnN0IHN0cmlwRGVjb3JhdG9yVHJhbnNmb3JtZXIgPSAoZGVjb3JhdG9yKSA9PlxyXG4gICAgbWFrZVRyYW5zZm9ybWVyKFt7IHRyYW5zZm9ybWVyOiBzdHJpcERlY29yYXRvcihkZWNvcmF0b3IpLCBwb3NpdGlvbjogJ2JlZm9yZScgfV0pO1xyXG4gIGNvbnN0IGNvZGVXaXRob3V0RGVjb3JhdG9yID0gYFxyXG4gICAgY2xhc3MgQSB7XHJcbiAgICAgIHRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlY29yYXRvckEoKSB7IC8vIG5vLW9wIGRlY29yYXRvclxyXG4gICAgICByZXR1cm4gKHRhcmdldCwga2V5LCBkZXNjKSA9PiBkZXNjO1xyXG4gICAgfVxyXG4gIGA7XHJcbiAgY29uc3QgY29kZVdpdGhEZWNvcmF0b3JBID0gYFxyXG4gICAgY2xhc3MgQSB7XHJcbiAgICAgIEBkZWNvcmF0b3JBKClcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGVjb3JhdG9yQSgpIHsgLy8gbm8tb3AgZGVjb3JhdG9yXHJcbiAgICAgIHJldHVybiAodGFyZ2V0LCBrZXksIGRlc2MpID0+IGRlc2M7XHJcbiAgICB9XHJcbiAgYDtcclxuICBjb25zdCBjb2RlV2l0aERlY29yYXRvckIgPSBjb2RlV2l0aERlY29yYXRvckEucmVwbGFjZSgnZGVjb3JhdG9yQScsICdkZWNvcmF0b3JCJyk7XHJcbiAgaXQoJ3Nob3VsZCBkbyBub3RoaW5nIHdoZW4gbm8gZGVjb3JhdG9yIGlzIHByZXNlbnQnLCAoKSA9PlxyXG4gICAgc2hvdWxkKHN0cmlwRGVjb3JhdG9yVHJhbnNmb3JtZXIoJ2RlY29yYXRvckEnKShjb2RlV2l0aG91dERlY29yYXRvcikpXHJcbiAgICAuYmUuZXhhY3RseShkZWZhdWx0VHJhbnNmb3JtZXIoY29kZVdpdGhvdXREZWNvcmF0b3IpKVxyXG4gICk7XHJcbiAgaXQoJ3Nob3VsZG5cXCd0IHN0cmlwIGRlY29yYXRvciB3aXRob3V0IHRoZSBnaXZlbiBuYW1lJywgKCkgPT5cclxuICAgIHNob3VsZChzdHJpcERlY29yYXRvclRyYW5zZm9ybWVyKCdkZWNvcmF0b3JBJykoY29kZVdpdGhEZWNvcmF0b3JCKSlcclxuICAgIC5iZS5leGFjdGx5KGRlZmF1bHRUcmFuc2Zvcm1lcihjb2RlV2l0aERlY29yYXRvckIpKVxyXG4gICk7XHJcbiAgaXQoJ3Nob3VsZCBzdHJpcCBkZWNvcmF0b3Igd2l0aCB0aGUgZ2l2ZW4gbmFtZScsICgpID0+XHJcbiAgICBzaG91bGQoc3RyaXBEZWNvcmF0b3JUcmFuc2Zvcm1lcignZGVjb3JhdG9yQScpKGNvZGVXaXRoRGVjb3JhdG9yQSkpXHJcbiAgICAuYmUuZXhhY3RseShkZWZhdWx0VHJhbnNmb3JtZXIoY29kZVdpdGhvdXREZWNvcmF0b3IpKVxyXG4gICk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=