export class ChartOne extends HTMLElement {
    /*
           a
    -------------- + d
    1 + b(x - c)^2

    where:
    a - max value
    b - steepness
    c - x coordinate of peak
    d - min value
     */

    constructor() {
        super();
        this.numbers = this.createNumbers(0.5);
        const slider = document.getElementById('chart-one-slider');
        slider.addEventListener('percent-slider', event => {
            this.renderNumbers(this.createNumbers(event.percent));
        });

        this.renderNumbers(this.numbers);
    }

    renderNumbers(numbers) {
        let contents = this.firstChild;
        if (this.firstChild) {
            this.removeChild(contents);
        }
        contents = document.createElement('div');
        contents.classList.add('chart-one_contents');
        numbers.forEach((number, bin) => {
            for (let i = 1; i <= number; ++i) {
                let count = document.createElement('pre');
                count.innerHTML = `&nbsp;${bin}&nbsp;`;
                contents.appendChild(count);
            }
        });
        this.appendChild(contents);
    }
    createNumbers(percent) {
        const min = 1;
        const max = 11;

        // x = number of bags of candy
        // y = number of kids who got that many bags of candy
        const a = 4;
        const b = 1;
        const c = (min + max) * percent; // should depend on percent
        const d = 1;

        let numbers = [];
        let bin = min;
        while (bin <= max) {
            numbers[bin] = Math.floor(a/(1 + b * Math.pow(bin - c,2)) + d);
            ++bin;
        }
        return numbers;
    }
}
