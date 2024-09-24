export function formatTimeNs(time_ns) {
    const time_us = time_ns / 1000;
    const time_ms = time_us / 1000;

    if (time_ms > 1) {
        return `${time_ms.toFixed(2)}ms`;
    }

    if (time_us > 1) {
        return `${time_us.toFixed(2)}us`;
    }

    return `${time_ns}ns`;
}
