export const pipeAsync = (...functions: any[]) => (input: any) =>
    functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));

export const composeAsync = (...functions: any[]) => (input: any) =>
    functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));
