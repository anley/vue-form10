export const emptyValue = {};

export function getSchemaFromPath(schema, path) {
    console.log(schema, path);
}
export function getDefaultFromSchema(schema, root) {
    if (!schema) {
        return schema;
    }
    if (schema.default) {
        return schema.default;
    }

    if (schema.type === "object") {
        const ret = {};
        if (!schema.properties) {
            return {};
        }
        Object.keys(schema.properties).forEach(key => {
            const value = getDefaultFromSchema(schema.properties[key]);
            if (value !== emptyValue) {
                ret[key] = value;
            }
        });
        if (Object.keys(ret).length) {
            return ret;
        }
        return {};
    }
    if (root) {
        return undefined;
    }
    return emptyValue;
}

export function stdFormObj(name, schema, options) {
    // from json-schema-form-core
    options = options || {};

    // The Object.assign used to be a angular.copy. Should work though.
    const f = options.global && options.global.formDefaults ? Object.assign({}, options.global.formDefaults) : {};

    if (!schema) {
        return f;
    }

    if (options.global && options.global.supressPropertyTitles === true) {
        f.title = schema.title;
    } else {
        f.title = schema.title || name;
    }
    f.schema = schema;
    return f;
}
export const pluginEmptyValues = {
    object: {},
    array: [],
    boolean: false,
    number: 0,
    string: "",
    integer: 0
};
