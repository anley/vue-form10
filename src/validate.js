import tv4 from "tv4";
import { getSchemaForTv4 } from "./util";

function getSchameFromErrorAndSchema(error, schema) {
    function getObjFromPath(obj, path) {
        if (!path.length) {
            return obj;
        }
        if (path[0] === '') {
            return getObjFromPath(obj, path.slice(1));
        }
        return getObjFromPath(obj.properties[path[0]], path.slice(1));
    }
    return getObjFromPath(schema, error.dataPath.split("/")).properties[error.params.key];
}

function error302Handler(error, schema) {
    const title = getSchameFromErrorAndSchema(error, schema).title;
    return `没有填写字段: ${title}`;
}
export default function validate(value, schema) {
    schema = getSchemaForTv4(schema, value);
    const { valid, errors } = tv4.validateMultiple(value, schema);
    if (!valid) {
        errors.forEach((error) => {
            if (error.code === 302) {
                error.message = error302Handler(error, schema);
            }
        });
    }
    return errors;
}
