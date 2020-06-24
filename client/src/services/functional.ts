export const pipeAsync = (...functions: any[]) => (input) =>
    functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));

export const composeAsync = (...functions: any[]) => (input) =>
    functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));

export function curry(fn) {
    const arity = fn.length; // check the arity of the given function
    let args = []; // store all arguments here
    function curried() {
        // the curried function
        args = args.concat(Array.prototype.slice.call(arguments));
        if (arity <= args.length) {
            return fn.apply(null, args); // call the function with all the arguments
        }
        return curried; // otherwise return the curried function to be given more arguments
    }

    return curried;
}
