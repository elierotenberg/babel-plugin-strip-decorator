import should from 'should/as-function';
import * as babel from 'babel-core';
const { describe, it } = global;

import stripDecorator from '../';

describe('stripDecorator', () => {
  function makeTransformer(plugins) {
    return (code) => babel.transform(code, {
      optional: [
        'es7.decorators',
      ],
      plugins,
    }).code;
  }
  const defaultTransformer = makeTransformer([]);
  function stripDecoratorTransformer(...decoratorNames) {
    return makeTransformer([{ transformer: stripDecorator(...decoratorNames), position: 'before' }]);
  }
  function genCode(...decoratorNames) {
    return `
      class A {
        ${decoratorNames.map((decoratorName) => `@${decoratorName}`).join(' ')}
        test() {
          return this;
        }
      }
      function decoratorA() { // no-op decorator
        return (target, key, desc) => desc;
      }
    `;
  }
  const codeWithoutDecorator = genCode();
  const codeWithDecoratorA = genCode('decoratorA');
  const codeWithDecoratorB = genCode('decoratorB()');
  const codeWithBothDecorators = genCode('decoratorA', 'decoratorB()');
  it('should do nothing when no decorator is present', () =>
    should(stripDecoratorTransformer('decoratorA')(codeWithoutDecorator))
    .be.exactly(defaultTransformer(codeWithoutDecorator))
  );
  it('shouldn\'t strip decorator without the given name', () =>
    should(stripDecoratorTransformer('decoratorA')(codeWithDecoratorB))
    .be.exactly(defaultTransformer(codeWithDecoratorB))
  );
  it('should strip decorator with the given name', () =>
    should(stripDecoratorTransformer('decoratorA')(codeWithDecoratorA))
    .be.exactly(defaultTransformer(codeWithoutDecorator))
  );
  it('should strip only decorator with the given name', () => {
    should(stripDecoratorTransformer('decoratorA')(codeWithBothDecorators))
    .be.exactly(defaultTransformer(codeWithDecoratorB));
    should(stripDecoratorTransformer('decoratorB')(codeWithBothDecorators))
    .be.exactly(defaultTransformer(codeWithDecoratorA));
  });
  it('should strip multiple decorators', () => {
    should(stripDecoratorTransformer('decoratorA', 'decoratorB')(codeWithBothDecorators))
    .be.exactly(defaultTransformer(codeWithoutDecorator));
  });
});
