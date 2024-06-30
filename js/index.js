let landingElement=document.querySelector('.landing-section');

let imagesArray=['01.jpg','02.jpg','03.jpg','04.jpg'];
let background;

//get history from local storage
if(localStorage.getItem('color') !==null){
    let color=localStorage.getItem('color');
    document.querySelector(':root').style.setProperty("--main-color",color);
         //set the color btn active ant other passive
         let childeList=document.querySelectorAll('.color li');
         for(let i=0;i<childeList.length;i++){
             //remove active from all
             childeList[i].classList.remove('active')
             if(childeList[i].getAttribute('data-color')===color){
                //set active class in color that get from local storage
                childeList[i].classList.add('active');
             }
         }
}



// active class (yes or no)
let buttonList=document.querySelectorAll('.random-btn span');
for (let index = 0; index < buttonList.length; index++) {
    buttonList[index].classList.remove('active');
}
// chck local storage
if(localStorage.getItem('optionSelected')!==null){
    let localBackgound=localStorage.getItem('optionSelected');
    // console.log(localBackgound);
    if(localBackgound==='true'){
        changeBackground(true);
        document.querySelector(".yes").classList.add('active');
    }
    else{
        clearInterval(background);
        document.querySelector(".no").classList.add('active');
    }
}


//////////////////////////////////////////////////////////

// toggle settings button
$("#btn-settings").click(function(){
    var $settings = $('.settings');
    if ($settings.css("left") === "-250px") {
        $settings.animate({"left": "0px"}, 1000,function(){
            $('i').addClass('fa-spin');
        });
        
    } else {
        $settings.animate({"left": "-250px"}, 1000,function(){

            $('.fa-gear').removeClass('fa-spin');
        });
    }
});

// change color from settings
colorList=Array.from(document.querySelectorAll(".color li"));

for(let i=0;i<colorList.length;i++){
    colorList[i].addEventListener('click', function (eventInfo) {
        let colorName=eventInfo.target.getAttribute('data-color');
        document.querySelector(':root').style.setProperty("--main-color",colorName);
        // set color in local storage
        localStorage.setItem('color',colorName);
        //set the color btn active ant other passive
        let childeList=eventInfo.target.parentElement.children;
        deleteOradd(childeList,eventInfo);
    })
}

// change background from settings
let backgroundList=Array.from(document.querySelectorAll(".random-btn span"));

for(let i=0;i<backgroundList.length;i++){
    backgroundList[i].addEventListener('click', function (eventInfo) {

        //turn on or turn off change background random .
        let data=eventInfo.target.getAttribute('data-background');
        
        // check your select and open or close setinterval
        if(data=='yes'){
            changeBackground(true);
            localStorage.setItem('optionSelected',true)
        }
        else{
            clearInterval(background);
            localStorage.setItem('optionSelected',false)

        }
        

        let childeList=eventInfo.target.parentElement.children;
        deleteOradd(childeList,eventInfo);
    });
}


/*========================change background of landimg page ===================== */
//function change background
function changeBackground(x){
    
    if(x===true){

        background=setInterval(()=>{
            let randomNum=Math.floor(Math.random()*4);
            landingElement.style.backgroundImage=`url("images/${imagesArray[randomNum]}")`;
            // console.log('on');
        },1000);
    }

}

// reset settings options
document.querySelector('.reset-btn').addEventListener('click',()=>{
    // to reset this option from localStrorage
    localStorage.removeItem('optionSelected');
    localStorage.removeItem('color');

    //reload window
    window.location.reload();
})
////////////////////////////////////////////////////////////////////////////////////////////
// to know that youe reached to skills section using javascript

let ourSkills=document.querySelector('.skills');
window.onscroll=function(){

    // skills offset top
    let skillsOffset=ourSkills.offsetTop;
    //skills outer height (height of section include padding and margin)
    let skillOuter=ourSkills.offsetHeight;
    // window height
    let windowHeight=this.innerHeight;
    //window Scroll top
    let windowScroll=window.pageYOffset;

    if(windowScroll>skillsOffset+skillOuter-windowHeight-100){

        let skillProgress=document.querySelectorAll('.skill-progress span');
        for (let index = 0; index < skillProgress.length; index++) {
            let progressWidth=skillProgress[index].getAttribute('data-progress');
            // console.log(progressWidth);
            skillProgress[index].style.width=progressWidth;
        }

    }

}
/************************************************************************************* */
// to know that youe reached to skills section using jquery
// let skillsOffset=$('.skills').offset().top;

// $(window).scroll(function(){
//     let windowScroll=$(window).scrollTop();
//     console.log(windowScroll);
//     console.log(skillsOffset);
//     if(windowScroll>skillsOffset - 300){
//         let skillProgress=document.querySelectorAll('.skill-progress span');
//                 for (let index = 0; index < skillProgress.length; index++) {
//                     let progressWidth=skillProgress[index].getAttribute('data-progress');
//                     console.log(progressWidth);
//                     skillProgress[index].style.width=progressWidth;
//                 }     
//     }
// });
///////////////////////////////////////////////////////////////////////////////////////////

// creat popup callery
let galleryList=Array.from(document.querySelectorAll('.gallery .images img'));
let popupImg
let leftbtn;
let rightbtn;
let currentIndex;
for(let i=0;i<galleryList.length;i++){
    galleryList[i].addEventListener('click',(e)=>{
        //creat overlay on body when click
        let overlay=document.createElement('div');
        overlay.className='overlayImg';
        document.body.appendChild(overlay);

        //creat popbox;
        let popupBox=document.createElement('div');
        //add class
        popupBox.className='popup-box'; 
        popupImg=document.createElement('img');
        // assign src in img to the new element img
        let urlImg=e.target.getAttribute('src');
        popupImg.setAttribute('src',urlImg);
        popupBox.appendChild(popupImg);
        overlay.appendChild(popupBox);
        // add name of photo if found
        if(e.target.getAttribute('alt')!=null){
            // console.log("notnull");
            let imgName=document.createElement('h4');
            imgName.innerHTML=e.target.getAttribute('alt');
            // console.log(imgName.innerHTML); // test
            imgName.className='nameImg';
            popupBox.appendChild(imgName);
        }

        // creat close button
        let closeBtn=document.createElement('span');
        //creat text of close button (X)
        let textButton=document.createTextNode('X');
        //add text to close button
        closeBtn.appendChild(textButton);
        closeBtn.className='closeButton';
        popupBox.appendChild(closeBtn);
        // creat left and right button
        leftbtn=document.createElement('i');
        leftbtn.className='fa-solid fa-arrow-left leftButton'
        popupBox.appendChild(leftbtn);
        //
        rightbtn=document.createElement('i');
        rightbtn.className='fa-solid fa-arrow-right rightButton'
        popupBox.appendChild(rightbtn);

        //current index
        currentIndex=i;
        
    });
   
}

// click to close lighthouse .
document.addEventListener('click',(eventInfo)=>{
    //closw button
    if(eventInfo.target.className=='closeButton'){
        // button => popbox => overlay (child to parnent to grand parent)
        eventInfo.target.parentElement.parentElement.style.display='none';
    }
   //right button
    else if(eventInfo.target.className=='fa-solid fa-arrow-right rightButton'){
        slidUpDown(1);
    }
    //left button
    else if(eventInfo.target.className=='fa-solid fa-arrow-left leftButton'){
       slidUpDown(-1);
    }
});

//function to increase or decrease index
function slidUpDown(step){
    currentIndex=currentIndex+step;
    if(currentIndex==galleryList.length){
        currentIndex=0;
    }
    else if(currentIndex<0){
        currentIndex=galleryList.length-1;
    }
    var imgSrc=galleryList[currentIndex].getAttribute('src');
    popupImg.setAttribute('src',imgSrc);
}
/*========================(bullet or nav) click and scroll using jquery or js ===================== */
//selected bullets   // using Jquery and js
let bulletList=document.querySelectorAll('.navigation .bullet');
let linksNav=document.querySelectorAll('ul li a')

// for(let i=0;i<bulletList.length;i++){
//     bulletList[i].addEventListener('click',function(eventInfo){
//         let dataBullet=eventInfo.target.getAttribute('data');
//         let sectionOffset=document.querySelector(`#${dataBullet}`).offsetTop;
//         console.log(sectionOffset);
//         $("html,body").animate({scrollTop:sectionOffset},1000);
//     })
// }

// using pure js no jquey
function scrollToSection(linksList){
    for(let i=0;i<linksList.length;i++){
        linksList[i].addEventListener('click',function(eventInfo){
            eventInfo.preventDefault();
            document.querySelector(`#${eventInfo.target.getAttribute('data')}`).scrollIntoView({
                behavior:'smooth'
            })
        });
    }
}
scrollToSection(bulletList);
scrollToSection(linksNav);
//////////////////////////////////////////////////////////////////////////////////////////////
// btn inable or disaple
let btnBulletList=document.querySelectorAll('.bullets-option span');
for(let i=0;i<btnBulletList.length;i++){
    btnBulletList[i].addEventListener('click',(e)=>{
        let bulletType=e.target.getAttribute('data-bullet');
        if(bulletType==='yes'){
            document.querySelector('.navigation').style.display='block';
            e.target.classList.add('active');
            e.target.nextElementSibling.classList.remove('active');        }
        else{
            document.querySelector('.navigation').style.display='none';
            e.target.classList.add('active');
            e.target.previousElementSibling.classList.remove('active');
        }
        // deleteOradd(btnBulletList,e)
    })
}


// function using in multiple section in code to delet active class and add in selected element.

function deleteOradd(eventList,eventInfo){
    for(let i=0;i<eventList.length;i++){
        //remove active from all
        eventList[i].classList.remove('active');
    }
    // add active in selected button
    eventInfo.target.classList.add('active');
}

//toggle menue
let btnToggle=document.querySelector('.toggle-menue');
let tLinks=document.querySelector('.header ul');
btnToggle.addEventListener('click',()=>{

    btnToggle.classList.toggle('menue-active')
    tLinks.classList.toggle('open');
})

// click anywhere to close toggle menue
document.addEventListener('click',function(eventInfo){
    if(eventInfo.target!=btnToggle&&eventInfo.target!=tLinks){

        if(tLinks.classList.contains('open')){
            btnToggle.classList.toggle('menue-active')
            tLinks.classList.toggle('open');
        }
    }
});

//stop propagation of links
tLinks.addEventListener('click',function(eventInfo){
    eventInfo.stopPropagation();
})

let friends=['belal','wael','badawy']
console.log(friends.splice(1,2,'noos'));
console.log(friends);
friends.fill('iam',0);
console.log(friends);