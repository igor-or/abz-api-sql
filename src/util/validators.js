exports.numberInRange = (field, options) => value => {
    const { min, max } = options;

    let errors = [];

    if (min !== 'undefined' && value < min) {
        errors.push(`The ${field} must be at least ${min}.`);
    }
    if (max !== 'undefined' && value > max)
        errors.push(`The ${field} may not be greater than ${max}.`);

    if (errors.length > 0) return Promise.reject(...errors);

    return Promise.resolve();
};
