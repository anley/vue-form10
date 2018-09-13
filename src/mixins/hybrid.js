import difference from "lodash/difference";
import { getDefaultFromSchema } from "@/util";

export default {
    beforeMount() {
        if (!this.model || typeof this.model !== 'object' || Object.keys(this.model).length === 0) {
            this.model = getDefaultFromSchema(this.schema);
        }

        let properties = this.$options.form10.format.properties || {};
        if (typeof properties === 'function') {
            properties = properties(this.schema);
        }
        Object.keys(properties).forEach((key) => {
            if (!Object.hasOwnProperty.call(this.model, key) && properties[key].default !== undefined) {
                this.$set(this.model, key, properties[key].default);
            }
        });

        this.keys.forEach((key) => {
            if (!Object.hasOwnProperty.call(this.model, key)) {
                this.$set(this.model, key, null);
                delete this.model.key;
            }
        });
    },
    computed: {
        keys() {
            let properties = this.$options.form10.format.properties || {};
            if (typeof properties === 'function') {
                properties = properties(this.schema);
            }
            return difference(Object.keys(this.schema.properties || {}), Object.keys(properties));
        }
    },
};
