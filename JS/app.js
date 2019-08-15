const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const contentResult = document.querySelector('.contentResult');

/**/
const greetings = 
[
  'Hello my friend',
  'Hi, May I help you',
  'Hi, Sơn Nguyễn'
];

const info =
[
  'My name is... Susan',
  "I'm 21 year old"
]

const boss = 
[
  'I know who you are',
  'Yes, because you are my boss'
]

var d = new Date();

const time = 
[
  "it's "+ d.getHours() + ":" + d.getMinutes() +" o'clock"
]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function(){
  console.log("%c Đã mở mic... bạn có thể nói ngay lúc này...! ? %c", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:16px;color:#f00;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #f00;', "font-size:10px;color:#f00;");
};

recognition.onresult = function(event){
  console.log(event);

  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;

  readOutLoud(transcript);
};

btn.addEventListener('click', ()=>{
  recognition.start();
});

function readOutLoud(message){
  const speech = new SpeechSynthesisUtterance();

  let finalText = "I dont know what you said";

  speech.text = finalText;
  
  if(message.includes('hi') || message.includes('hello')){
    finalText = greetings[Math.floor(Math.random() * greetings.length)];
  }else if(message.includes("what's your name") || message.includes("what is your name") ||  message.includes("what your name")){
    finalText = info[0];
  }else if(message.includes("how old are you")){
    finalText = info[1];
  }else if(message.includes("do you know me")){
    finalText = boss[0];
  }else if(message.includes("really")){
    finalText = boss[1];
  }else if(message.includes("what time") || message.includes("what time is it")){
    finalText = time[0];
  }else if(message.includes("open Google") || message.includes("Google")){
    Redirect();
    finalText = "I will open google";
  }
  
  speech.text = finalText;

  contentResult.textContent = finalText;
 
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

function Redirect() {
  window.location="http://google.com";
  setInterval(
    () => window.location="http://google.com",
    2000
  );
}