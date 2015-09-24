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
  const stripDecoratorTransformer = (decorator) =>
    makeTransformer([{ transformer: stripDecorator(decorator), position: 'before' }]);
  const codeWithoutDecorator = `
    class A {
      test() {
        return this;
      }
    }
    function decoratorA() { // no-op decorator
      return (target, key, desc) => desc;
    }
  `;
  const codeWithDecoratorA = `
    class A {
      @decoratorA()
      test() {
        return this;
      }
    }
    function decoratorA() { // no-op decorator
      return (target, key, desc) => desc;
    }
  `;
  const codeWithDecoratorB = codeWithDecoratorA.replace('decoratorA', 'decoratorB');
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
});
