function sendit(){
    const userid = document.getElementById('userid');
    const userpw = document.getElementById('userpw');
    const userpw_re = document.getElementById('userpw_re');
    const name = document.getElementById('name');
    const hp = document.getElementById('hp');
    const email = document.getElementById('email');
    const hobby = document.getElementsByName('hobby');
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');
    const isssn = document.getElementById('isssn');
    const sample6_postcode = document.getElementById('sample6_postcode');
    const sample6_address = document.getElementById('sample6_address');
    const sample6_detailAddress = document.getElementById('sample6_detailAddress');
    const sample6_extraAddress = document.getElementById('sample6_extraAddress');
    

    // 정규식
    const expNameText = /[가-힣]+$/; // + : 뒤로 계속(몇글자일지 모름), $ : 끝, [] : 들어갈 수 있는 문자범위
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/; 
    // ^ : 이것으로 무조건시작, \d : 숫자, {3,4} : 3글자 혹은 4글자, {} : 글자수
    const expEmailText = /^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-\.]+\.[A-Za-z0-9]+$/;
    const expSsn1Text = /^\d{6}$/;
    const expSsn2Text = /^\d{7}$/;


    if(userid.value == ''){
        alert('아이디를 입력하세요');
        userid.focus(); // id 쪽으로 포커스
        return false;
    }
    if(userid.value.length < 4 || userid.value.length > 20){
        alert('아이디는 4자 이상 20자 이하로 입력하세요');
        userid.focus(); // id 쪽으로 포커스
        return false;
    }

    if(userpw.value == ''){
        alert('비밀번호를 입력하세요');
        userpw.focus(); // pw 쪽으로 포커스
        return false;
    }
    if(userpw.value.length < 4 || userpw.value.length > 20){
        alert('비밀번호는 4자 이상 20자 이하로 입력하세요');
        userpw.focus(); // pw 쪽으로 포커스
        userpw.value = '';
        return false;
    }

    if(userpw.value != userpw_re.value){
        alert('비밀번호와 비밀번호 확인의 값이 다릅니다');
        userpw.focus(); // pw 쪽으로 포커스
        userpw.value = '';
        userpw_re.value = '';
        return false;
    }

    if(!expNameText.test(name.value)){
        alert('이름 형식을 확인하세요\n한글만 입력 가능합니다');
        name.focus(); // pw 쪽으로 포커스
        return false;
    }

    if(!expHpText.test(hp.value)){
        alert('휴대폰 번호 형식을 확인하세요 \n하이픈(-)을 포함해야합니다')
        hp.focus(); // pw 쪽으로 포커스
        return false;
    }

    if(!expEmailText.test(email.value)){
        alert('이메일 형식을 확인하세요');
        email.focus();
        return false;
    }
    
    let count = 0;
    for(let i in hobby){
        if(hobby[i].checked){
            count++;
        }
    }
    if(count == 0){
        alert('취미는 적어도 한개 이상 선택하세요');
        return false;
    }
    
    if(!expSsn1Text.test(ssn1.value) || !expSsn2Text.test(ssn2.value)){
        alert('주민번호를 확인하세요');
        ssn1.focus();
        return false;
    }

    if(isssn.value == 'n'){
        alert('주민등록번호 검증 버튼을 눌러주세요')
        return false;
    }

    if(sample6_postcode.value == ''){
        alert('우편 번호를 확인하세요');
        sample6_postcode.focus();
        return false;
    }
    if(sample6_address.value == ''){
        alert('주소를 입력하세요');
        sample6_address.focus();
        return false;
    }
    if(sample6_detailAddress.value == ''){
        alert('상세주소를 입력하세요');
        sample6_detailAddress.focus();
        return false;
    }
    if(sample6_extraAddress.value == ''){
        alert('참고항목를 입력하세요');
        sample6_extraAddress.focus();
        return false;
    }

    return true;
}

function readonly(){
    if(sample6_postcode.value != '' && sample6_address.value != '' && sample6_extraAddress.value != ''){
        document.getElementById('sample6_detailAddress').removeAttribute('readonly');
    }
}

function moveFocus(){
    const ssn1 = document.getElementById('ssn1');
    if(ssn1.value.length >= 6){
        document.getElementById('ssn2').focus();
    }
}

function pass_ssn(){
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');

    let str = ssn1.value + ssn2.value;

    if(ssn1.value == '' || ssn2.value == ''){
        alert('주민등록번호를 입력하세요');
        return false;
    }

    let result = [];
    let key = [2,3,4,5,6,7,8,9,2,3,4,5,0];
    let sum = 0;

    for(let i = 0 ; i < str.length; i++){
        result[i] = Number(str.charAt(i));
        sum += result[i] * key[i];
    }

    let num = sum % 11;
    let result1 = 11 - num;

    if(result1 < 10){
        if(result[12] === result1){
            alert('유효한 주민번호 입니다.');
            isssn.value = 'y';
            if(ssn2.value.substr(0,1) < 3){
                document.getElementsByName('year')[0].value = 19 + ssn1.value.substr(0, 2);
            }else{
                document.getElementsByName('year')[0].value = 20 + ssn1.value.substr(0, 2);
            }
            document.getElementsByName('year')[0].value = ssn1.value.substr(0, 2);
            document.getElementsByName('month')[0].value = ssn1.value.substr(2, 2);
            document.getElementsByName('day')[0].value = ssn1.value.substr(4, 2);
        }else{
            alert('입력하신 주민번호는 유효하지 않은 주민번호입니다. 다시 입력바랍니다.');
            ssn1.focus();
            ssn1.value = '';
            ssn2.value = '';
        }
    } else{
        if(result[12] === (result1 % 10)){
            alert('유효한 주민번호 입니다.');
            isssn.value = 'y';
            if(ssn2.value.substr(0,1) < 3){
                document.getElementsByName('year')[0].value = 19 + ssn1.value.substr(0, 2);
            }else{
                document.getElementsByName('year')[0].value = 20 + ssn1.value.substr(0, 2);
            }
            document.getElementsByName('month')[0].value = ssn1.value.substr(2, 2);
            document.getElementsByName('day')[0].value = ssn1.value.substr(4, 2);

        }else{
            alert('입력하신 주민번호는 유효하지 않은 주민번호입니다. 다시 입력바랍니다.');
            ssn1.focus();
            ssn1.value = '';
            ssn2.value = '';
        }
    }
}

function ssnChange(){
    const isssn = document.getElementById('isssn');
    isssn.value = 'n';
    document.getElementsByName('year')[0].value = '';
    document.getElementsByName('month')[0].value = '';
    document.getElementsByName('day')[0].value = '';
}