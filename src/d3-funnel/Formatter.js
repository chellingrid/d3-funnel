class Formatter {
    /**
     * Register the format function.
     *
     * @param {string|function} format
     *
     * @return {function}
     */
    getFormatter(format) {
        if (typeof format === 'function') {
            return format;
        }
        return (label, value, conversion, formattedValue) => (
            this.stringFormatter(label, value, conversion, formattedValue, format)
        );
    }

    /**
     * Format the given value according to the data point or the format.
     *
     * @param {string}   label
     * @param {number}   value
     * @param {number}   conversion
     * @param {*}        formattedValue
     * @param {function} formatter
     *
     * @return string
     */
    format({
        label, value, conversion, formattedValue = null,
    }, formatter) {
        return formatter(label, value, conversion, formattedValue);
    }

    /**
     * Format the string according to a simple expression.
     *
     * {l}: label
     * {v}: raw value
     * {f}: formatted value
     * {c}: conversion
     *
     * @param {string} label
     * @param {number} value
     * @param {*}      formattedValue
     * @param {string} expression
     *
     * @return {string}
     */
    stringFormatter(label, value, conversion, formattedValue, expression) {
        let formatted = formattedValue;
        let c = null;

        // Attempt to use supplied formatted value
        // Otherwise, use the default
        if (formattedValue === null) {
            formatted = this.getDefaultFormattedValue(value);
        }
        if (!Number.isNaN(conversion)) {
            c = `${this.getDefaultFormattedValue(conversion).toString()} %`;
        }

        return expression
            .split('{l}')
            .join(label)
            .split('{v}')
            .join(value)
            .split('{f}')
            .join(formatted)
            .split('{c}')
            .join(c);
    }

    /**
     * @param {number} value
     *
     * @return {string}
     */
    getDefaultFormattedValue(value) {
        return value.toLocaleString();
    }
}

export default Formatter;
