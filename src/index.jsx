export default function stripDecorator(...decoratorNames) {
  return function transformer({ Plugin, types }) {
    function getDecoratorName(decorator) {
      if(!types.isDecorator(decorator)) {
        return void 0;
      }
      if(types.isIdentifier(decorator.expression)) {
        return decorator.expression.name;
      }
      if(types.isCallExpression(decorator.expression)) {
        return types.isIdentifier(decorator.expression.callee) && decorator.expression.callee.name;
      }
    }
    return new Plugin('strip-decorator', {
      visitor: {
        MethodDefinition(node) {
          const { decorators } = node;
          if(!decorators) {
            return node;
          }
          node.decorators = decorators.filter((decorator) => !decoratorNames.includes(getDecoratorName(decorator)));
          if(node.decorators.length === 0) {
            delete node.decorators;
          }
          return node;
        },
      },
    });
  };
}
