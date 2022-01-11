'use strict';

function popup(){
    var url = "../ID.html";
    var name = "주민등록번호 유효성 검사 프로그램";
    var option = "width = 500, height = 500, top = 100, left = 520, location = no";
    var newWin = window.open(url, name, option);
    if(newWin == null){
        alert("팝업이 차단되었습니다. 팝업 차단 해제 후 다시 시도해주세요.")
    }
}

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


