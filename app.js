const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//            ja  feb mar apr may jun jul aug sep oct nov dec
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const container = document.querySelector('#parent');
const totalContribEle = document.querySelector('#total-contribs');

const CONTRIBUTION_LEVELS = { HIGH: "HIGH", MED: 'MED', LOW: "LOW", NONE: "NONE" }
let totalContribs = 0;

function GenerateCalender() {
    for (let i = 0; i < days.length; i++) {
        const month = document.createElement('div');
        month.classList.add('month');
        const monthName = document.createElement('h4');
        monthName.innerHTML = months[i];
        month.appendChild(monthName);
        
        const weeks = document.createElement('div');
        weeks.classList.add('weeks');
        month.appendChild(weeks);

        let week = document.createElement('div');
        week.classList.add('week');
        weeks.appendChild(week);

        const cur = days[i];

        for (let j = 0; j < cur; j++) {
            if (j != 0 && j % 7 === 0) {
                week = document.createElement('div');
                week.classList.add('week');
                weeks.appendChild(week);
            }

            const day = document.createElement('div');
            day.classList.add('item');

            const random = Math.random();
            
            if (random > 0.5 && random < 0.8 ) {
                day.classList.add('item-med');
                day.setAttribute("level", CONTRIBUTION_LEVELS.MED);
                totalContribs += 5;
            }
            else if (random > 0.35 && random < 0.5 ) {
                day.classList.add('item-low');
                day.setAttribute("level", CONTRIBUTION_LEVELS.LOW);
                totalContribs += 2;
            }
            else if (random > 0.8) {
                day.classList.add('item-high');
                day.setAttribute("level", CONTRIBUTION_LEVELS.HIGH);
                totalContribs += 8;
            }
            else{
                day.setAttribute("level", CONTRIBUTION_LEVELS.NONE);
            }

            day.setAttribute("data", `${months[i]} ${j + 1}`);
            day.onmouseover = e => OnHover(e);
            
            week.appendChild(day);
        }
        container.appendChild(month);
    }
    totalContribEle.innerHTML += " " + totalContribs;
}

GenerateCalender()

let x;
let y;



const details = document.querySelector('.details');
function OnHover(e) {
    const data = e.target.getAttribute("data");
    const contribLevel = e.target.getAttribute("level");
    details.innerHTML = data + "<br>" + contribLevel;

    details.style.display = 'block';
    details.style.top = `${y - 85}px`
    details.style.left = `${x - 50}px`
}

document.onmouseover = function(e) {
    if (!e.target.classList.contains('item')) {
        details.style.display = 'none';
    }
    x = e.pageX;
    y = e.pageY;
}