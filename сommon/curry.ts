export function curry(f) {
    return function currify() {
        const args = Array.prototype.slice.call(arguments);
        return args.length >= f.length ?
            f.apply(null, args) :
            currify.bind(null, ...args)
    }
}