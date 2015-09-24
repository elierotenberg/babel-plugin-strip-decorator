'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = stripDecorator;

function stripDecorator(decoratorName) {
  return function transformer(_ref) {
    var Plugin = _ref.Plugin;
    var types = _ref.types;

    function isDecoratorWithName(decorator) {
      return types.isDecorator(decorator) && types.isCallExpression(decorator.expression) && types.isIdentifier(decorator.expression.callee, { name: decoratorName });
    }
    return new Plugin('strip-decorator', {
      visitor: {
        MethodDefinition: function MethodDefinition(node) {
          var decorators = node.decorators;

          if (!decorators) {
            return node;
          }
          node.decorators = decorators.filter(function (decorator) {
            return !isDecoratorWithName(decorator);
          });
          if (node.decorators.length === 0) {
            delete node.decorators;
          }
          return node;
        }
      }
    });
  };
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFBd0IsY0FBYzs7QUFBdkIsU0FBUyxjQUFjLENBQUMsYUFBYSxFQUFFO0FBQ3BELFNBQU8sU0FBUyxXQUFXLENBQUMsSUFBaUIsRUFBRTtRQUFqQixNQUFNLEdBQVIsSUFBaUIsQ0FBZixNQUFNO1FBQUUsS0FBSyxHQUFmLElBQWlCLENBQVAsS0FBSzs7QUFDekMsYUFBUyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7QUFDdEMsYUFBTyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUNqQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUM1QyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7S0FDNUU7QUFDRCxXQUFPLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO0FBQ25DLGFBQU8sRUFBRTtBQUNQLHdCQUFnQixFQUFBLDBCQUFDLElBQUksRUFBRTtjQUNiLFVBQVUsR0FBSyxJQUFJLENBQW5CLFVBQVU7O0FBQ2xCLGNBQUcsQ0FBQyxVQUFVLEVBQUU7QUFDZCxtQkFBTyxJQUFJLENBQUM7V0FDYjtBQUNELGNBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFNBQVM7bUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7V0FBQSxDQUFDLENBQUM7QUFDcEYsY0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDL0IsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztXQUN4QjtBQUNELGlCQUFPLElBQUksQ0FBQztTQUNiO09BQ0Y7S0FDRixDQUFDLENBQUM7R0FDSixDQUFDO0NBQ0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpcERlY29yYXRvcihkZWNvcmF0b3JOYW1lKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zZm9ybWVyKHsgUGx1Z2luLCB0eXBlcyB9KSB7XHJcbiAgICBmdW5jdGlvbiBpc0RlY29yYXRvcldpdGhOYW1lKGRlY29yYXRvcikge1xyXG4gICAgICByZXR1cm4gdHlwZXMuaXNEZWNvcmF0b3IoZGVjb3JhdG9yKSAmJlxyXG4gICAgICAgIHR5cGVzLmlzQ2FsbEV4cHJlc3Npb24oZGVjb3JhdG9yLmV4cHJlc3Npb24pICYmXHJcbiAgICAgICAgdHlwZXMuaXNJZGVudGlmaWVyKGRlY29yYXRvci5leHByZXNzaW9uLmNhbGxlZSwgeyBuYW1lOiBkZWNvcmF0b3JOYW1lIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQbHVnaW4oJ3N0cmlwLWRlY29yYXRvcicsIHtcclxuICAgICAgdmlzaXRvcjoge1xyXG4gICAgICAgIE1ldGhvZERlZmluaXRpb24obm9kZSkge1xyXG4gICAgICAgICAgY29uc3QgeyBkZWNvcmF0b3JzIH0gPSBub2RlO1xyXG4gICAgICAgICAgaWYoIWRlY29yYXRvcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBub2RlLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzLmZpbHRlcigoZGVjb3JhdG9yKSA9PiAhaXNEZWNvcmF0b3JXaXRoTmFtZShkZWNvcmF0b3IpKTtcclxuICAgICAgICAgIGlmKG5vZGUuZGVjb3JhdG9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZGVsZXRlIG5vZGUuZGVjb3JhdG9ycztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==