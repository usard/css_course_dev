import data from '../data.json' assert {type: 'json'};
const btnTag  = document.querySelector('button');
console.log(btnTag);

console.log('data :', data.images.length);
let time = 4000;
let interval=null;
let currentImageIndex = 0;
// function showImage (val) {
//     // // clearInterval(interval)
//     // currentImageIndex =  val;
//     // interval = setInterval(()=> {changeImage(imgs,count)}, time)
 
// };
function changeImage(imgs,len) {
    console.log('change image invoked :', currentImageIndex,len, new Date().getTime()/1000);
    imgs.forEach((image)=>   {
        image.classList.remove('visible')
    });
    const dots = document.querySelectorAll('span');
    dots.forEach((dot)=> {dot.classList.remove('active')});
    console.log('dots :', dots.length)
    imgs[currentImageIndex].classList.add('visible');
    dots[currentImageIndex].classList.add('active');
    if (currentImageIndex >= len-1){
        currentImageIndex = 0;
    }
    else {
        currentImageIndex = currentImageIndex + 1;
    }
}


const sliderTag = document.getElementById('slider');
fetch('../data.json').then(response => response.json()).then(data => {
    console.log('fetch invoked')
    const navDotsTag = document.getElementById('navigation-dots');
    
    const mobiles = data.mobiles;
    for(let [index,obj] of mobiles.entries()) {
        console.log("image url :", obj.image_url);
        const imgTag = document.createElement('img');
        imgTag.innerHTML ='';
        const url = obj.image_url;
        imgTag.classList.add('image')
        imgTag.src = url;
        sliderTag.appendChild(imgTag);

        const dotTag = document.createElement('span');
        dotTag.classList.add('dot');
        // dotTag.addEventListener('click',()=> {
        //     clearInterval(interval);
        //     currentImageIndex = index;
        //     showImage(index)
        // })
        navDotsTag.appendChild(dotTag);
    }
    

    btnTag.addEventListener("click",()=> {
      renderMobiles(data.images);
    })


    })
    .then(()=> {
        let imgs = document.querySelectorAll('img');
        let count = imgs.length;
        setInterval(()=> {changeImage(imgs,count)}, time)
    });
    
    function renderMobiles (images) {
        // console.log('click works')
        
        const imgContainer = document.getElementsByClassName('image-container')[0];
        for (let image of images) {
            console.log('conatiner :',imgContainer);
            // console.log('image :', image.link);
            
            const articleTag = document.createElement('article');
            const imgTag = document.createElement('img');
            const nameTag = document.createElement('p');
            imgTag.src = image.link;
            imgTag.style['width'] = "150px";
            imgTag.style['height'] = "70px";
            imgTag.style['object-fit'] = 'contain';

            nameTag.innerHTML = image.name;
            nameTag.style['font-size'] = '10px';
            articleTag.appendChild(imgTag);
            articleTag.appendChild(nameTag);
            imgContainer.appendChild(articleTag);

            
        }
        
    }
    
   







