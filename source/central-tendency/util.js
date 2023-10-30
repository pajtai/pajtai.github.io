export function eventIsInside(event, rect, verticalError) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    return (
        (clientX >= rect.left && clientX <= rect.right)  &&
        (clientY >= rect.top - verticalError && clientY <= rect.bottom + verticalError)
    );
}

export function bound(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

