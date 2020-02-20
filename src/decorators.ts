// Class decorator

export function sealed(param: string) {
    return function(target: Function): void {
        console.log(`sealing the constructor ${param}`);
        console.log(target);

        Object.seal(target);
        Object.seal(target.prototype);
    };
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
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
    return function(target: Object, methodName: string, descriptor: PropertyDescriptor) {
        console.log(`writable decorator is called with ${isWritable}`);
        console.log(target, methodName, descriptor);

        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number = 0) {
    return function(target: Object, methodName: string, descriptor: PropertyDescriptor) {
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
