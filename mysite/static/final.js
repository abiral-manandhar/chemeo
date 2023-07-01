let hearts = 3
let hints = 0
let score = {
    s: 0
}
let counter = 0
let tries = 0
let btnH = document.querySelector('.ht-btn')
let active = document.querySelector('.active')
let nextBtn = document.querySelector('.nextBtn')
let carousel = document.querySelectorAll(".carousel-item")
let elcount = 1
let preScore = 0
let prompt = ""
let rem = 0
let z = 0
let obj = document.getElementById("value");
lives = document.querySelectorAll('.hearts')
bulbs = document.querySelectorAll('.bulbs')
let triesCount;
cross = document.querySelector(".cross")

lives = [...lives]
bulbs = [...bulbs]

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


carousel = [...carousel]

nextBtn.addEventListener('click', (e)=>{
        counter = 0;
        active = document.querySelector('.active')
        let i = carousel.indexOf(active)
        active = carousel[i+1]

})




btnH.addEventListener('click', (e)=>{
      if(hints!=4){
    bulbs[0].children[hints].classList.add("hidden")

    hints++;

    active.children[counter].children[1].classList.remove('invise')
    active.children[counter].children[0].src= eyeopen
    counter++
}

})


all = document.querySelectorAll(".at_details")
all = [...all]
all.map((i) => {
    indexOfFirstAngleBracket = i.innerHTML.indexOf('<')
    let extractedString = i.innerHTML.substring(0, indexOfFirstAngleBracket);
    i.innerHTML = extractedString.charAt(0).toUpperCase() + extractedString.slice(1)
})

let answer;
cell = document.querySelectorAll(".cell")
cell = [...cell]

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCookie('csrf')
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


cell.map((i)=>{
    i.addEventListener('click', (e)=>{
       answer =  e.target.children[0].children[1].innerHTML
       postData("http://127.0.0.1:8000/api", { id: active.id, answer: answer }).then((data) => {
            if(data && elcount == 120){
                                postData("http://127.0.0.1:8000/save", { score: score.s, username: prompt })

            }


            if(!data){

            wrong = document.querySelector('.wrong')
            wrong.classList.remove("invise")
            setTimeout(()=>{
                wrong.classList.add("invise")
            }, 2000)

             if(tries == 3 && hearts == 0){
                tries = 0
                triesCount.innerHTML = 0
                postData("http://127.0.0.1:8000/save", { username: prompt, score: score.s }).then((data)=>{
                      location.reload()

                })
//
             }
             else if(tries == 3 && hearts != 0){
                    triesCount = document.querySelector('.tries')
                                            triesCount.innerHTML = 4

                                lives[0].children[rem].classList.add("hidden")
                                 for(z=0; z<=3;z++){
               bulbs[0].children[z].classList.remove("hidden")}
                rem+=1

                hearts = hearts - 1
                hints = 0
                tries = 0

                nextBtn.click()

             }
             else{
                tries+=1

                  triesCount = document.querySelector('.tries')

           triesCount.innerHTML = triesCount.innerHTML - 1
               }
            }
            else{
                prevScore = score.s
                tries += 1

                score.s = score.s + 1000 - (120*hints) - (tries-1)*100
   right = document.querySelector('.right')
            right.classList.remove("invise")
            setTimeout(()=>{
                right.classList.add("invise")
            }, 2000)

         triesCount = document.querySelector('.tries')

           triesCount.innerHTML = 4
                elcount +=1
                for(z=0; z<=3;z++){
               bulbs[0].children[z].classList.remove("hidden")}


                hints = 0
                tries = 0
                nextBtn.click()
                animateValue(obj, prevScore, score.s, 1000);


            }

        });


        $('#exampleModal').modal('hide');

    })

})

do{
prompt = window.prompt("Type Player Name (Required, 30 letters max)")


}while(prompt == null || prompt == "" || prompt.length > 30);

if(prompt == null || prompt == ""){
    prompt = 'User'
}
else{
    layer = document.querySelector(".loading_page")
    layer.classList.add("trans")
}

cross.addEventListener('click', (e)=>{
            $('#exampleModal').modal('hide');

})