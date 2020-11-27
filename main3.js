const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const mainP = document.getElementById('main-page');/*메인페이지 id추가*/
const Nbtn = document.getElementsByClassName('.next-btn');
const u_name = document.querySelector('input[type=text]');
const wrap = document.getElementById('wrap');
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 1024px)");
const ENDPOINT = 10;
const select = [];
let qIdx = -1;


$( "#main-page" ).slideUp( 0 ).delay(800).fadeIn(800);


function next() {
    const mainP = document.getElementById('main-page');
    mainP.style.display = 'none';
    const welcome = document.getElementById('welcome');
    welcome.style.display = 'block';
    
    var money = '';
    var prm = window.prompt("이번주 예상 사용금액은 얼마정도 인가요?");
    if(prm == money){
        window.alret("이 값을 꼭 기억하세요!");
    }else{
        
    }
}

//var randomNumber = Math.floor(Math.random() * 6);
//       
//var userNumber = window.prompt("0~5 중에 하나를 선택하세요!");
//// step2. 비교하기(맞는지 틀리는지)
//// step3. 결과를 출력하기
//if(userNumber == randomNumber){
//  window.alert("정답입니다.")
//}else if(userNumber > randomNumber){
//  // parseInt : 문자형 데이터의 숫자를 숫자형으로!
//  var result = parseInt(userNumber) - randomNumber
//  window.alert(result + " 더 작아야 합니다.")
//}else{
//  var result = randomNumber - parseInt(userNumber)
//  window.alert(result + " 더 커야 합니다.")
//}




const goTo = (dest) => {
  let elem;
  let elemTop;
  if (dest === 'artist') {
    elem = document.getElementById('intro-box');
  } else {
    elem = document.getElementById('share-box');
  }
  elemTop = window.pageYOffset + elem.getBoundingClientRect().top;
  if (pcMQL.matches) {
    elemTop -= 150;
  } else if (tabletMQL.matches) {
    elemTop -= 115;
  } else {
    elemTop -= 60;
  }
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: elemTop
  });
}
const goArtist = () => goTo('artist');
const goShare = () => goTo('share');

const copy = () => {
  const tmp = document.createElement('textarea');
  document.body.appendChild(tmp);
  tmp.value = url;
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}

const calcScore = () => {
  let point = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point += qnaList[i].a[select[i]].score;
  }
  return point;
}

const sortResult = (point) => {
  let num = 0;
  if (point <= 20) {
    num = 0;
  } else if (point <= 30) {
    num = 1;
  } else if (point <= 40) {
    num = 2;
  } else if (point <= 50) {
    num = 3;
  } else if (point <= 60) {
    num = 4;
  } else {
    num = 5;
  }
  return num;
}

const goResult = () => {
  if (pcMQL.matches) {
    console.log('PC');
    wrap.style.marginTop = '50px';
  } else if (tabletMQL.matches) {
    console.log('tablet');
    wrap.style.marginTop = '15px';
  }

  const result = document.getElementById('result');
  const point = calcScore();
  const grade = sortResult(point);
  const pTitle = document.querySelector('.p');
  /*const res_point = document.querySelector('.point');*/ /*이거 점수 변수인데 필요없으니까 지운다!!*/
  /*const pin = document.querySelector('.pin');*/
  const img_url = 'img3/image-' + grade + '.png';
  const res_img = document.createElement('img');
  const res_img_div = document.querySelector('.art');
  const animal = document.querySelector('.result');
  const desc = document.querySelector('.res');

  pTitle.innerHTML = u_name.value + ' 님의 결과는..';
  res_img.src = img_url;
  res_img.alt = infoList[grade].name;
  res_img.title = infoList[grade].name;
  res_img_div.appendChild(res_img);
  animal.innerHTML = infoList[grade].name;
  desc.innerHTML = infoList[grade].desc;

  setTimeout(() => {
    header.style.display = 'none';/*얘도 수정했음 원래 block이었음*/
    footer.style.display = 'none';/*수정했ㅇ므!!*/
    result.style.display = 'block';
    /*res_point.style.display = 'none';*//*이거 점수 변수인데 없어졌으면 좋겠어서 none으로 내가 써봤음*/
    header.style.animation =
      'fade-in 0.3s forwards';
    footer.style.animation =
      'fade-in 0.3s forwards';
    result.style.animation =
      'going-up 0.5s, ' +
      'fade-in 0.5s forwards';
  }, 600);

}

const end = () => {
  qna.style.animation = '';
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1;
    qna.style.transform = 'translateY(-1px)';
  }, 50);
  setTimeout(() => clearTimeout(interval), 500);
  setTimeout(() => qna.style.display = 'none', 500);
  setTimeout(() => {
    const calc = document.getElementById('calc');
    calc.style.display = 'block';
    calc.style.animation =
      'going-up 0.5s forwards, ' +
      'fade-in 0.5s forwards';
  }, 700);
  setTimeout(() => {
    calc.style.animation = '';
    calc.style.animation =
      'going-left 0.4s forwards, ' +
      'fade-out 0.4s forwards';
    setTimeout(() => {
      calc.style.display = 'none';
      goResult();
    }, 400);
  }, 9000);
}

const addAnswer = (answerTxt, idx) => {
  const answer = document.createElement('button');
  const a = document.querySelector('.answer');
  answer.className += 'a box';
  answer.innerHTML = answerTxt;
  answer.addEventListener('click', () => {
    const parent = answer.parentNode;
    const children = parent.childNodes;
    for (let i in children) {
      children[i].disabled = true;
    }
    parent.classList.add('fade-out-5-4');
    setTimeout(() => {
      select[qIdx] = idx;
      a.innerHTML = '';
      parent.classList.remove('fade-out-5-4');
      goNext();
    }, 800);
  });

  setTimeout(() => answer.style.animation =
    'going-down 0.25s forwards, fade-in 0.25s forwards', 50);
  a.appendChild(answer);
}


const goNext = () => {
  if (qIdx++ === qnaList.length - 1) {
    end();
    return;
  }

  const status = document.querySelector('.status');
  const qNum = qnaList[qIdx];
  const q = document.querySelector('.q');

  status.style.width = (ENDPOINT * (qIdx + 1)) + '%';
  q.innerHTML = qNum.q;
  qna.style.animation =
    'fade-in 0.3s ease-in-out 0.4s forwards, ' +
    'going-down 0.3s ease-in-out 0.4s forwards';

  setTimeout(() => {
    const endIdx = qNum.a.length - 1;
    for (let i in qNum.a) {
      addAnswer(qNum.a[i].answer, i);
    }
    qna.style.opacity = 1;
  }, 700);
}

const begin = () => {
  const welcome = document.getElementById('welcome');
  header.style.animation =
    'going-up 0.4s forwards, ' +
    'fade-out 0.4s forwards';
  footer.style.animation =
    'going-down 0.4s forwards, ' +
    'fade-out 0.4s forwards';
  setTimeout(() => welcome.style.animation =
    'going-up 0.4s ease-in-out forwards, ' +
    'fade-out 0.4s ease-in-out forwards', 500);
  setTimeout(() => {
    header.style.display = 'none';
    footer.style.display = 'none';
    welcome.style.display = 'none';
    qna.style.display = 'block';
    if (pcMQL.matches) {
      console.log('PC');
      wrap.style.marginTop = '50px';
    } else if (tabletMQL.matches) {
      console.log('tablet');
      wrap.style.marginTop = '30px';
    }
    goNext();
  }, 1000);
}

const load = () => {
  const msg = document.querySelector('.check-name');
  const start_btn = document.querySelector('.start');

  u_name.addEventListener('blur', () => {
    try {
      if (u_name.value.length < 1) {
        throw '이름을 입력해주세요!';
      }
      msg.innerHTML = '';
    } catch (err) {
      msg.innerHTML = err;
    }
  });

  start_btn.addEventListener('click', () => {
    try {
      if (u_name.value.length < 1) {
        throw '이름을 입력해주세요!';
      }
      msg.innerHTML = '';
      start_btn.disabled = true;
      begin();
    } catch (err) {
      msg.innerHTML = err;
    }
  });

}

window.onload = load();