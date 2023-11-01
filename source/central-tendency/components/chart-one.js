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
        const slider = document.getElementById('chart-one-slider');
        slider.addEventListener('percent-slider', event => {
            this.renderNumbers(this.createNumbers(event.percent));
        });

        this.renderNumbers(this.createNumbers(0.5));
    }

    /**
     * chart-one
     *  .numbers-list
     * @param numbers
     */
    renderNumbers(numbers) {
        this.renderChart(numbers);
        this.renderList(numbers);
    }

    renderChart(numbers) {
        let chart = this.getElementsByClassName('chart');
        if (chart.length) {
            chart = chart[0];
        } else {
            chart = document.createElement('canvas');
            chart.classList.add('chart');
            chart.style.backgroundColor = '#FFF';
            this.appendChild(chart);
        }
        let bars = [];
        numbers.forEach((number, bin) => {
            bars[bin] = bars[bin] || [];
            bars[bin] += number;
        });
        const ctx = chart.getContext('2d');
        const canvasWidth = chart.width;
        const canvasHeight = chart.height;
        this.clearChart(ctx, canvasWidth, canvasHeight);

        bars.forEach((kids, bags) => {
            this.drawBar(ctx, canvasWidth, canvasHeight, bags, kids);
        });
    }

    clearChart(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    }

    drawBar(ctx, canvasWidth, canvasHeight, x, height) {
        const barWidth = 20;
        const scale = 25;
        ctx.fillStyle = 'blue';
        ctx.fillRect(barWidth * x + (x - 1) * 2, canvasHeight - scale * height, barWidth, scale * height);
    }

    renderList(numbers) {
        let numbersList = this.getElementsByClassName('numbers-list');
        if (numbersList.length) {
            numbersList = numbersList[0];
        } else {
            numbersList = document.createElement('div');
            numbersList.classList.add('numbers-list');
            this.appendChild(numbersList);
        }
        let numbersListContents = numbersList.firstChild;
        if (numbersList.firstChild) {
            numbersList.removeChild(numbersListContents);
        }
        numbersListContents = document.createElement('div');
        numbersListContents.classList.add('chart-one_contents');
        numbers.forEach((number, bin) => {
            for (let i = 1; i <= number; ++i) {
                let count = document.createElement('pre');
                count.innerHTML = `&nbsp;${bin}&nbsp;`;
                numbersListContents.appendChild(count);
            }
        });
       numbersList.appendChild(numbersListContents);
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
