const original_console_log = console.log;

console.log = function(...args) {
    const transformed_arguments = args.map(arg => (arg === "") ? "hruk" : arg);
    original_console_log.apply(console, transformed_arguments);
};

