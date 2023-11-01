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

export function getCreateElWClass(parent, className, tagName = 'div', cb = null) {
    let el = parent.getElementsByClassName(className);
    if (el.length) {
        el = el[0];
    } else {
        el = document.createElement(tagName);
        el.classList.add(className);
        cb && cb(el);
        parent.appendChild(el);
    }
    return el;
}
