let countries = Array.from(document.querySelectorAll('svg path'));
let wrong = 0;
let correct = 0;
const dict = window.Dict;
const countryToClick = document.getElementById('country');

randomCountry();
for (let country of document.querySelectorAll('svg path')) {
    country.addEventListener('click', () => {
        if (countries.indexOf(country) !== -1) {
            guess(country.getAttribute('name'));
        }
    })
}
function randomCountry() {
    window.correctCountry = countries[Math.floor(Math.random() * countries.length)];
    countryToClick.innerText = `${'click'} ${correctCountry.getAttribute('name')}`;
}
function finish() {
    let total = correct + wrong
    let percent = Math.round((correct / total) * 100);
    let color;
    if (percent >= 100) {
        color = 'greenyellow';
    } else if (percent >= 90) {
        color = 'green';
    } else if (percent <= 55) {
        color = 'red';
    } else {
        color = 'black';
    }
    document.body.innerHTML += `<div class="popup">
    <p style='margin: 3px; color: ${color};'>${correct}/${total}     ${percent}%</p>
    <button onclick='location.reload();' style='margin: 3px;'>Play again</button>
</div>`
}

function guess(guess) {
    if (guess === correctCountry.getAttribute('name')) {
        correct ++;
        var color = 'green';
    } else {
        wrong ++;
        var color = 'red'
        correctCountry.setAttribute('class', 'blinking');
    }
    correctCountry.setAttribute('style', `fill: ${color};`);
    let i = countries.indexOf(correctCountry);
    if (i !== -1) {
        countries.splice(i, 1);
    }
    if (countries.length === 0) {
        finish();
    } else {
        randomCountry();
    }
}