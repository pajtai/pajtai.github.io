import {getCreateElWClass} from '../util.js';

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
        this.renderMean(numbers);
        this.renderList(numbers);
    }

    renderChart(numbers) {
        const chart = getCreateElWClass(this, 'chart', 'canvas', el => {
            el.style.backgroundColor = '#FFF';
        });
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

    renderMean(numbers) {
        const meanDiv = getCreateElWClass(this, 'mean');
        let kids = 0;
        const total = numbers.reduce((sum, number, bags) => {
            sum += number * bags;
            kids += number;
            return sum;
        }, 0);

        const mean = (total/kids).toPrecision(2);
        meanDiv.innerHTML = `Mean: ${mean}`;
    }

    renderList(numbers) {
        const numbersList = getCreateElWClass(this, 'numbers-list');
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
        const minBags = 1;
        const maxBags = 11;

        // x = number of bags of candy
        // y = number of kids who got that many bags of candy
        const a = 4;
        const b = 1;
        const c = (minBags + maxBags) * percent; // should depend on percent
        const d = 1;

        let numbers = [];
        let bags = minBags;
        while (bags <= maxBags) {
            // getting # of kids w said bags
            numbers[bags] = Math.floor(a/(1 + b * Math.pow(bags - c,2)) + d);
            ++bags;
        }
        return numbers;
    }
}
