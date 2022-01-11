'use strict';

let timeId = null;

function printtime(){
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    document.getElementById("time").innerHTML = hh + ":" + mm + ":" + ss
}

const st = window.setInterval(printtime);  // 입장시 시간 출력

function startclock(){
    window.clearInterval(st);  // start 버튼 누를시 setInterval 종료
    timeId = window.setInterval(printtime, 1000);  // 다시 시간 표시
}

function stopclock(){
    window.clearInterval(st);  // setInterval 종료
    window.clearInterval(timeId); // setInterval 종료
}


