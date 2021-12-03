window.days = [0, 10, 0, 50, 200, 50, 10, 400, 40, 450, -85, 25, 320, 0, 80, 180, 350, 24, 99, 9, 300, 88, 400, 0, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];

const params = new URLSearchParams(window.location.search);

var name = '';
if(params.has('name')){
    name = encodeURIComponent(params.get('name'));
}
document.getElementById('name').innerHTML = name;

var today =  new Date().getDate();
var sum = 0;

var lastClick = 0;
if(localStorage.getItem('lastClick')){
    lastClick = parseInt(localStorage.getItem('lastClick'));
}
var opened = params.get('opened');
var today = new Date().getDate();
if(new Date().getMonth() != 11){
    today = 0;
}
var fakeDay = '';
if(params.has('d')){
    var stuff = parseInt(params.get('d'));
    if(stuff){
        today = stuff;
        fakeDay = stuff.toString();
    }
}
for(var i = 0; i < days.length; i++){
    var theDay = document.querySelector(`.day-${i}`);
    var checkbox = document.querySelector(`.day-${i} input[type=checkbox]`);
    var door = document.querySelector(`.day-${i} .door`);
    var titleContainer = document.querySelector(`.day-${i} .title-container`);
    if(checkbox == null || checkbox == undefined){
        console.log(`Couldnt find day ${i}`);
        continue;
    }
    if(i < today){
        sum += days[i];
        checkbox.checked = true;
        checkbox.disabled = true;
        door.remove();
        titleContainer.remove();

    }else if(i == today){
        titleContainer.innerHTML = `<a onclick="registerClick('${today}')" href="index.html?lastclick=${today}&opened=${today}&d=${fakeDay}">${days[i]} V-bucks</h1>`;
        if(lastClick == today.toString() ){
            checkbox.checked = true;
            if(opened == today.toString()){
                checkbox.disabled = true;
                door.remove();
                sum += days[today];
                titleContainer.remove();
            }
        }
    }
    else if(i > today){
        checkbox.remove();
        titleContainer.remove();
        const capture = i;
        theDay.addEventListener('click', function(){
            if(new Date().getDate() == capture || window.hackedDay == capture){
                window.location.href = `index.html?lastclick=${capture}`;
            }
            });
    }    
}

function registerClick(day){
    localStorage.setItem('lastClick', day);
    window.location.href = `index.html?lastclick=${day}&opened=${day}`;
}

var sumHolder = document.querySelector('#vbucks');
sumHolder.innerHTML = sum;
if(sum >= 5000){
    document.getElementById('sofar').innerHTML = '!!!';
}


