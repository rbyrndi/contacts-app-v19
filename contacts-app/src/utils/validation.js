export function validateProps(schema, props, componentName) {
    const validationResult = schema.validate(props, { abortEarly: false });

    if (validationResult.error) {
        const { details } = validationResult.error;
        details.forEach((detail) => console.warn(`[${componentName}] Validation error: ${detail.message}`));
    }

    return validationResult.value;
}