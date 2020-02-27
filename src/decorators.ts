// Class decorator

export function sealed(param: string) {
  return function(target: Function): void {
    console.log(`sealing the constructor ${param}`);
    console.log(target);

    Object.seal(target);
    Object.seal(target.prototype);
  };
}

export function logger<TFunction extends Function>(
  target: TFunction
): TFunction {
  const newConstructor: Function = function() {
    console.log('Creating new instance');
    console.log(target);

    this.age = 30;
  };

  newConstructor.prototype = Object.create(target.prototype);
  newConstructor.prototype.printLibrarian = function() {
    console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
  };

  return newConstructor as TFunction;
}

// Method decorator

export function writable(isWritable: boolean) {
  return function(
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`writable decorator is called with ${isWritable}`);
    console.log(target, methodName, descriptor);

    descriptor.writable = isWritable;
    return descriptor;
  };
}

export function timeout(ms: number = 0) {
  return function(
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`timeout ${ms}`);

    const originMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      setTimeout(() => {
        originMethod.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}

export function logParameter(
  target: Object,
  methodName: string,
  index: number
) {
  console.log(target);
  console.log(methodName);
  console.log(index);

  const key = `${methodName}_decor_param_index`;

  if (Array.isArray(target[key])) {
    target[key].push(index);
  } else {
    target[key] = [index];
  }
}

export function logMethod(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const key = `${methodName}_decor_method_indexes`;
    const indexes = target[key];

    if (Array.isArray(indexes)) {
      args.forEach((arg, index) => {
        if (indexes.includes(index)) {
          console.log(
            `Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`
          );
        }
      });
    }

    const result = originMethod.apply(this, args);

    return result;
  };

  return descriptor;
}

function makeProperty<T>(
  prototype: any,
  propertyName: string,
  getTransformer: (value: any) => T,
  setTransformer: (value: any) => T
) {
  const values = new Map<any, T>();

  Object.defineProperty(prototype, propertyName, {
    set(firstValue: any) {
      Object.defineProperty(this, propertyName, {
        get() {
          if (getTransformer) {
            return getTransformer(values.get(this));
          } else {
            values.get(this);
          }
        },
        set(value: any) {
          if (setTransformer) {
            values.set(this, setTransformer(value));
          } else {
            values.set(this, value);
          }
        },
        enumerable: true
      });
      this[propertyName] = firstValue;
    },
    enumerable: true,
    configurable: true
  });
}

export function format(pref: string = 'Mr./Mrs.') {
  return function(target: Object, propertyName: string) {
    makeProperty(
      target,
      propertyName,
      value => `${pref} ${value}`,
      value => value
    );
  };
}

export function positiveInteger(
  target: object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
    const originSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        originSet.call(this, value);
    };

    return descriptor;
}
