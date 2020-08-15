const iconMenu = document.querySelector('#nav-icon-btn');
const spanIcon = document.querySelectorAll('.nav-icon-txt-menu span');
const iconBtn = document.querySelectorAll('#nav-icon-btn i');
const lists = document.querySelectorAll('.nav-bar .upper-nav-list li');
const listsUl = document.querySelector('.nav-bar .upper-nav-list');
const logoTxt = document.querySelectorAll('.logo-txt span');
const logoLine = document.querySelector('.logo-txt i');
const listWide = document.querySelector('.nav-list-wide');
const SliderWidth = document.querySelector('#showcase').offsetWidth;
const menuContainer = document.querySelector('#menu .container');
const imgSlide = document.querySelectorAll('.showcase-slider');
const menuUl = document.querySelector('#menu ul');
const categoryBtn = document.querySelectorAll('.menu-category-btn p');
const clientImg = document.querySelectorAll('.img-wrapper img');
const clientTxt = document.querySelector('#testimonials ul');
const menuTxt = document.querySelectorAll('#home-menu .home-menu-category h4');
const menuImg = document.querySelector('#home-menu img');
const menuHomeContainer = document.querySelector('#home-menu .container');
let toggle = false;
let count = 0;


// Navbar //
window.addEventListener('scroll', ()=>{
	if(window.scrollY <= 45){
		logoTxt.forEach((e)=>{
          e.style.left = '0px';
          logoLine.style.height = '55%';
		})
	}else{
		logoTxt.forEach((e)=>{
          e.style.left = '-55px';
          logoLine.style.height = '0%'; 
          logoLine.style.transitionDelay = '0.6s';
		})
	}
})
if(window.innerWidth <= 750){
	smallScreenSetUp();

}else{
	WideScreenSetUp();
}

function smallScreenSetUp(){
    listsUl.style.display = 'none';
    iconMenu.addEventListener('click', ()=>{
    	if(toggle === false){
	    	toggle = true;
	    	listWide.style.display = 'block';
	    	setTimeout(()=>{
	           listWide.style.opacity = '1';
	    	}, 450)
	    	spanIcon.forEach((span)=>{
	           span.classList.remove('active-hide'); 
	           span.classList.add('active-visible');
			})
			iconBtn.forEach((btn)=>{
	           btn.classList.remove('active-hide');
	           btn.classList.add('active-visible');
			})
	    }else{
	    	setTimeout(()=>{
	          listWide.style.opacity = '0';
	    	}, 450)
	    	toggle = false;
	    	listWide.style.display = 'none';
	    	spanIcon.forEach((span)=>{
	           span.classList.remove('active-visible');    
	           span.classList.add('active-hide');   
			})
			iconBtn.forEach((btn)=>{
	           btn.classList.remove('active-visible');  
	           btn.classList.add('active-hide');
			})
	    }
    })
}

function WideScreenSetUp(){
	iconMenu.addEventListener('click', ()=>{
	    if(toggle === false){
	        toggle = true;
	        lists.forEach((list)=>{
	           list.classList.add('active-visible'); 
	           list.classList.remove('active-hide');
			})
	        spanIcon.forEach((span)=>{
	           span.classList.remove('active-hide'); 
	           span.classList.add('active-visible');
			})
			iconBtn.forEach((btn)=>{
	           btn.classList.remove('active-hide');
	           btn.classList.add('active-visible');
			})
		}else{
			lists.forEach((list)=>{
	           list.classList.remove('active-visible'); 
	           list.classList.add('active-hide');
			})
	        spanIcon.forEach((span)=>{
	           span.classList.remove('active-visible');    
	           span.classList.add('active-hide');   
			})
			iconBtn.forEach((btn)=>{
	           btn.classList.remove('active-visible');  
	           btn.classList.add('active-hide');
			})
			toggle = false;
		}
	})
}



// Showcase //
setInterval(()=>{
	count++;
	imgSlide.forEach((img)=>{
		if(count === 3){
			count = 0;
		    img.style.left = '0';
		    img.firstElementChild.lastElementChild.classList.add('fadeInUp');
		}else{
			img.style.left = '-'+ SliderWidth * count + 'px';
		    img.firstElementChild.lastElementChild.classList.add('fadeInUp');
		    setTimeout(()=>{
		       img.firstElementChild.lastElementChild.classList.remove('fadeInUp');
		    }, 2000)
		}
	})
}, 5000);


// Menu //
menuTxt.forEach((e)=>{
	e.addEventListener('click', (btn)=>{
		if(btn.target.className === 'breakfast'){
			console
			menuImg.src = 'images/bread-delicious-egg.jpg';
            menuHomeContainer.classList.add('menuActive');
		}else if(btn.target.className === 'lunch'){
			menuImg.src = 'images/biriyani-chicken-cooked-1624487.jpg';
            menuHomeContainer.classList.add('menuActive');
		}else if(btn.target.className === 'dinner'){
			menuImg.src = 'images/beef-blur-chicken.jpg';
            menuHomeContainer.classList.add('menuActive');
		};
		setTimeout(()=>{
            menuHomeContainer.classList.remove('menuActive');
		}, 420)
	})
})


// Instagram Feed //
let feed = new Instafeed({
    get: 'user',
    resolution: 'standard_resolution',
    userId: '13959386828',
    accessToken: '13959386828.1677ed0.32fea37a52ae49e382924325ddbc1ca5',
    sortBy: 'most-recent',
    limit: 12,
    template: '<li class="col-lg-2 col-md-4 col-sm-6 col-6"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></li>'
});
feed.run();