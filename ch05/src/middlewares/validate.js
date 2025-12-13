import pkg from 'joi';
const { compile } = pkg;

function take(object, keys) {
    return Object.assign({}, ...keys
        .filter(key => Object.prototype.hasOwnProperty.call(object, key))
        .map(key => ({ [key]: object[key] })));
}

function validate(schema) {
    return (req, res, next) => {

        // Extract relevant parts of the schema based on request type
        const selectedSchema = take(schema, ['params', 'query', 'body']);

        // Build the object to validate based on request properties
        const objectToValidate = take(req, Object.keys(selectedSchema));

        // Perform Joi validation with improved error handling
        const { error, value } = compile(selectedSchema)
            .prefs({ errors: { label: 'key' }, abortEarly: false })
            .validate(objectToValidate);

        // Construct 400 error if there is any validation error
        if (error) {
            const errorMsg = error.details.map(d => d.message).join(', ');
            return res.status(400).json({ success: false, message: errorMsg });
        }

        // Attach validated data to the request object
        Object.assign(req, value);
        next();
    };
}

export default validate;
