interface Function {
    (...args: any): any;
}

export const pipeAsync = (...functions: any[]) => (input: any) =>
    functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));

export const composeAsync = (...functions: any[]) => (input: any) =>
    functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: Parameters<F>) => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
