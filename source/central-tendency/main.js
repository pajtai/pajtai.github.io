import './style.css';

function eventIsInside(event, rect) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    return (
        (clientX >= rect.left && clientX <= rect.right)  &&
        (clientY >= rect.top && clientY <= rect.bottom)
    );
}

function bound(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

class PercentSlider extends HTMLElement {
    constructor() {
        super();

        this.sliding = false;
        this.boundingClientRect = this.getBoundingClientRect();
        this.width = this.boundingClientRect.width;
        this.leftSide = this.boundingClientRect.x;
        this.x = this.leftSide + 0.5 * this.width;
        this.y = this.boundingClientRect.y + 0.5 * this.boundingClientRect.height;

        this.knob = document.createElement('div');
        this.knob.classList.add('percent-slider_knob');
        this.appendChild(this.knob);
        this.knobWidth = this.knob.getBoundingClientRect().width;
        this.knob.style.top = `-${this.knobWidth/2.5}px`;
        this.positionKnob(0.5);

        document.addEventListener('mousedown', (event) => {
            if (eventIsInside(event, this.boundingClientRect)) {
                this.sliding = true;
                console.log('sliding');
            }
        });

        document.addEventListener('mouseup', () => {
            this.sliding = false;
            console.log('not sliding');
        });

        document.addEventListener('mousemove', event => {
            if (this.sliding) {
                const clientX = event.clientX;
                const percent = bound((clientX - this.leftSide)/this.width, 0, 1);
                this.positionKnob(percent);
                const sliderEvent = new Event('percent-slider');
                sliderEvent.percent = percent;
                this.dispatchEvent(sliderEvent);
            }
        });
    }

    positionKnob(percent) {
        this.knob.style.left = `${percent * this.width}px`;
    }
}

window.customElements.define('percent-slider', PercentSlider);
