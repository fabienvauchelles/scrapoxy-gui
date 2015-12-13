export default function filter() {
    return (value) => {
        if (!value || !value.hostname) {
            return 'no IP';
        }

        return value.hostname;
    };
}
