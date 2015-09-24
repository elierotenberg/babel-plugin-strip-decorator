export default function stripDecorator(decoratorName) {
  return function transformer({ Plugin, types }) {
    function isDecoratorWithName(decorator) {
      return types.isDecorator(decorator) &&
        types.isCallExpression(decorator.expression) &&
        types.isIdentifier(decorator.expression.callee, { name: decoratorName });
    }
    return new Plugin('strip-decorator', {
      visitor: {
        MethodDefinition(node) {
          const { decorators } = node;
          if(!decorators) {
            return node;
          }
          node.decorators = decorators.filter((decorator) => !isDecoratorWithName(decorator));
          if(node.decorators.length === 0) {
            delete node.decorators;
          }
          return node;
        },
      },
    });
  };
}
