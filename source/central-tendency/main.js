import './style.css';

function eventIsInside(event, rect) {
    const clientX = event.clientX;
    if (clientX < rect.left || clientX >= rect.right)  {
        return false;
    }
    var clientY = event.clientY;
    return !(clientY < rect.top || clientY >= rect.bottom);
}

class PercentSlider extends HTMLElement {
    constructor() {
        super();

        this.sliding = false;
        this.boundingClientRect = this.getBoundingClientRect();

        this.addEventListener('mousedown', (event) => {
            if (eventIsInside(event, this.boundingClientRect)) {
                this.sliding = true;
                console.log('inside');
            }
        });

        this.addEventListener('mouseup', () => {
            this.sliding = false;
        });

        this.addEventListener('mousemove', event => {
            if (this.sliding) {
                console.log(event.clientX);
            }
        });
    }
}

window.customElements.define('percent-slider', PercentSlider);
