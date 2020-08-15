const dishBtn = document.querySelectorAll('.menu-dish-category p');
const menuListWrap = document.querySelector('.menu-item-list-wrap');
const dishModal = document.querySelector('#menu-item .menu-modal-wrap');
const closeMadal = document.querySelector('#menu-item .menu-modal-wrap i');
const headFive = document.querySelectorAll('.modal-bottom-detail h5');
const mealDetail = document.querySelector('.modal-bottom-detail p');
const iconMenu = document.querySelector('#nav-icon-btn');
const spanIcon = document.querySelectorAll('.nav-icon-txt-menu span');
const iconBtn = document.querySelectorAll('#nav-icon-btn i');
const lists = document.querySelectorAll('.nav-bar .upper-nav-list li');
const listsUl = document.querySelector('.nav-bar .upper-nav-list');
const logoTxt = document.querySelectorAll('.logo-txt span');
const logoLine = document.querySelector('.logo-txt i');
const listWide = document.querySelector('.nav-list-wide');
let toggle = false;


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

window.onload = ()=>{
	let ul = document.createElement('ul');
	ul.classList.add('row');
	menuObject.map(item =>{
		if(item.id === 'soup'){
			let dishTag = `<li id="${item.index}" class="col-lg-3 col-md-4 col-sm-12">
								<img src="${item.src}">
							    <div>
									<h4>${item.title} <span>$${item.price}</span></h4>
						 			<p>${item.shortDesctiption}</p>
						 		</div>
						 	</li>`;
	        ul.innerHTML += dishTag;
		}
		menuListWrap.appendChild(ul);
	})
	expandDishModal('soup');
}

dishBtn.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
    	menuListWrap.firstElementChild.remove();
	    let dishName = btn.className;
		let ul = document.createElement('ul');
		ul.classList.add('row');
		menuObject.map(item =>{
			if(item.id === dishName){
				let dishTag = `<li id="${item.index}" class="col-lg-3 col-md-4 col-sm-12">
									<img src="${item.src}">
								    <div>
										<h4>${item.title} <span>$${item.price}</span></h4>
							 			<p>${item.shortDesctiption}</p>
							 		</div>
							 	</li>`;
		        ul.innerHTML += dishTag;
			}
			menuListWrap.appendChild(ul);
		})
		expandDishModal(dishName);
    })
})

function expandDishModal(dishName){
const dishList = document.querySelectorAll('#menu-item .menu-item-list-wrap li');
	dishList.forEach(e =>{
		e.addEventListener('click', (event)=>{
			modalVisible(event, dishName);
		})
	})
	closeMadal.addEventListener('click', ()=>{
		modalHide();
	})
}

function modalVisible(event, dishName) {
	menuObject.map((item)=>{
		if(item.id === dishName && item.index == event.target.id){
		   	dishModal.firstElementChild.nextElementSibling.src = item.src;
		   	dishModal.lastElementChild.firstElementChild.textContent = item.title;
		   	dishModal.lastElementChild.firstElementChild.nextElementSibling.textContent = item.description;
			menuListWrap.style.opacity = '0';
			dishModal.style.opacity = '1';
			dishModal.style.pointerEvents = 'visible'
			dishModal.firstElementChild.nextElementSibling.classList.add('fadeIn');
			let nutTarget = dishModal.lastElementChild.lastElementChild.lastElementChild.firstElementChild;
			headFive.forEach((h5)=>{
			    h5.addEventListener('click', ()=>{
			    	if(h5.className === 'nutrition'){
			    		nutrition(item.nutrition, nutTarget);
			    	}else if(h5.className === 'ingredient'){
			    		ingredient(item.ingredient, nutTarget);
			    	}
			    })
			})
		}
	})

}

function nutrition(itemTxt, nutTarget) {
	nutTarget.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.style.transform = 'rotate(0deg)';
	nutTarget.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.style.transform = 'rotate(-180deg)';
	nutTarget.textContent = itemTxt;
}

function ingredient(itemTxt, nutTarget) {
	nutTarget.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.style.transform = 'rotate(0deg)';
	nutTarget.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.style.transform = 'rotate(-180deg)';
	nutTarget.textContent = itemTxt;
}

function modalHide() {
	menuListWrap.style.opacity = '1';
	dishModal.style.opacity = '0';
	dishModal.style.pointerEvents = 'none';
	dishModal.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.classList.remove('fadeInUp');
	dishModal.firstElementChild.nextElementSibling.classList.remove('fadeIn');
}



let menuObject = [
	  {
		id: 'soup',
		index: 1,
		src: 'images/dish-soup-one.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 240, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, 69%, Potassium 90mg: 2%, Total Carbohydrate 79g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
		id: 'soup',
		index: 2,
		src: 'images/dish-soup-eleven.jpg',
		title: 'Aguadito Peru Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'chicken, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 3,
		src: 'images/dish-soup-three.jpg',
		title: 'Ajiaco Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 4,
		src: 'images/dish-soup-four.jpg',
		title: 'Italian Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 430, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 5,
		src: 'images/dish-soup-five.jpg',
		title: 'Analı kızlı Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 6,
		src: 'images/dish-soup-six.jpg',
		title: 'Avgolemono Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 7,
		src: 'images/dish-soup-seven.jpg',
		title: 'Avocado Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 8,
		src: 'images/dish-soup-eight.jpg',
		title: 'Bakso Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 9,
		src: 'images/dish-soup-nine.jpg',
		title: 'Beef noodle Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 10,
		src: 'images/dish-soup-ten.jpg',
		title: 'European Beer Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'soup',
		index: 11,
		src: 'images/dish-soup-eleven.jpg',
		title: 'Bread Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
		id: 'soup',
		index: 12,
		src: 'images/dish-soup-twelve.jpg',
		title: 'Cabbage Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
		id: 'pasta',
		index: 1,
		src: 'images/dish-pasta-one.jpg',
		title: 'Pappardelle Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
		id: 'pasta',
		index: 2,
		src: 'images/dish-pasta-two.jpg',
		title: 'Farfalle Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 3,
		src: 'images/dish-pasta-three.jpg',
		title: 'Chicken Shells Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 4,
		src: 'images/dish-pasta-four.jpg',
		title: 'Campanelle Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 5,
		src: 'images/dish-pasta-five.jpg',
		title: 'Bucatini Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 6,
		src: 'images/dish-pasta-six.jpg',
		title: 'Angel Hair Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 7,
		src: 'images/dish-pasta-seven.jpg',
		title: 'Acini di Pepe Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 8,
		src: 'images/dish-pasta-eight.jpg',
		title: 'Gnocchi Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 9,
		src: 'images/dish-pasta-nine.jpg',
		title: 'Orecchiette Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 10,
		src: 'images/dish-pasta-ten.jpg',
		title: 'Orzo Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'pasta',
		index: 11,
		src: 'images/dish-pasta-eleven.jpg',
		title: 'Chicken Penne',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
		id: 'pasta',
		index: 12,
		src: 'images/dish-pasta-twelve.jpg',
		title: 'Chicken Pasta',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
		id: 'salad',		
		index: 1,
		src: 'images/dish-salad-one.jpg',
		title: 'Caesar Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
		id: 'salad',		
		index: 2,
		src: 'images/dish-salad-two.jpg',
		title: 'Waldorf Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 3,
		src: 'images/dish-salad-three.jpg',
		title: 'Cobb Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 4,
		src: 'images/dish-salad-four.jpg',
		title: 'Fiambre Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 5,
		src: 'images/dish-salad-five.jpg',
		title: 'Israeli Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 6,
		src: 'images/dish-salad-six.jpg',
		title: 'Panzanella Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 7,
		src: 'images/dish-salad-seven.jpg',
		title: 'Larb Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 8,
		src: 'images/dish-salad-eight.jpg',
		title: 'Salade niçoise Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
		id: 'salad',		
		index: 9,
		src: 'images/dish-salad-nine.jpg',
		title: 'Tabbouleh Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'salad',
		index: 10,
		src: 'images/dish-salad-ten.jpg',
		title: 'Caprese Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'salad',
		index: 11,
		src: 'images/dish-salad-eleven.jpg',
		title: 'Avocado Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'salad',
		index: 12,
		src: 'images/dish-salad-twelve.jpg',
		title: 'Chicken Salad',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
	   	id: 'pizza',
		index: 1,
		src: 'images/dish-pizza-one.jpg',
		title: 'Neapolitan Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
	  	id: 'pizza',
		index: 2,
		src: 'images/dish-pizza-two.jpg',
		title: 'Sicilian Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 3,
		src: 'images/dish-pizza-three.jpg',
		title: 'Greek Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 4,
		src: 'images/dish-pizza-four.jpg',
		title: 'Fresh Basil Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 5,
		src: 'images/dish-pizza-five.jpg',
		title: 'Spinach Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 6,
		src: 'images/dish-pizza-six.jpg',
		title: 'Black Olives Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 7,
		src: 'images/dish-pizza-seven.jpg',
		title: 'Mushrooms Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 8,
		src: 'images/dish-pizza-eight.jpg',
		title: 'Tomato Pie Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 9,
		src: 'images/dish-pizza-nine.jpg',
		title: 'Pepperoni Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 10,
		src: 'images/dish-pizza-ten.jpg',
		title: 'Onions Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'pizza',
		index: 11,
		src: 'images/dish-pizza-eleven.jpg',
		title: 'Bacon Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'pizza',
		index: 12,
		src: 'images/dish-pizza-twelve.jpg',
		title: 'Extra Cheese Pizza',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	   	id: 'steak',
		index: 1,
		src: 'images/dish-steak-one.jpg',
		title: 'Flank Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
	  	id: 'steak',
		index: 2,
		src: 'images/dish-steak-two.jpg',
		title: 'Sirloin Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 3,
		src: 'images/dish-steak-three.jpg',
		title: 'Ribeye Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 4,
		src: 'images/dish-steak-four.jpg',
		title: 'Topside Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 5,
		src: 'images/dish-steak-five.jpg',
		title: 'T-Bone Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 6,
		src: 'images/dish-steak-six.jpg',
		title: 'Tenderloin Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 7,
		src: 'images/dish-steak-seven.jpg',
		title: 'Tomahawk Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 8,
		src: 'images/dish-steak-eight.jpg',
		title: 'Barbecue Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 9,		
		src: 'images/dish-steak-nine.jpg',
		title: 'Grilled Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 10,
		src: 'images/dish-steak-ten.jpg',
		title: 'Red Chilli Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'steak',
		index: 11,
		src: 'images/dish-steak-eleven.jpg',
		title: 'Lamb Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'steak',
		index: 12,
		src: 'images/dish-steak-twelve.jpg',
		title: 'Tomato Steak',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
	   	id: 'sushi',
		index: 1,
		src: 'images/dish-sushi-one.jpg',
		title: 'Makizushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
	  	id: 'sushi',
		index: 2,
		src: 'images/dish-sushi-two.jpg',
		title: 'Gunkan Maki Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 3,
		src: 'images/dish-sushi-three.jpg',
		title: 'Temaki Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 4,
		src: 'images/dish-sushi-four.jpg',
		title: 'Narezushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 5,
		src: 'images/dish-sushi-five.jpg',
		title: 'Nigiri Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 6,
		src: 'images/dish-sushi-six.jpg',
		title: 'Oshizushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 7,
		src: 'images/dish-sushi-seven.jpg',
		title: 'Sasazushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 8,
		src: 'images/dish-sushi-eight.jpg',
		title: 'Kakinoha Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 9,
		src: 'images/dish-sushi-nine.jpg',
		title: 'Temari Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 10,
		src: 'images/dish-sushi-ten.jpg',
		title: 'Chirashizushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'sushi',
		index: 11,
		src: 'images/dish-sushi-eleven.jpg',
		title: 'Inari Zushi Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'sushi',
		index: 12,
		src: 'images/dish-sushi-twelve.jpg',
		title: 'Uramaki Sushi',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
	   	id: 'broast',
		index: 1,
		src: 'images/dish-broast-one.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
	  	id: 'broast',
		index: 2,
		src: 'images/dish-broast-two.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 3,
		src: 'images/dish-broast-three.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 4,
		src: 'images/dish-broast-four.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 5,
		src: 'images/dish-broast-five.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 6,
		src: 'images/dish-broast-six.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 7,
		src: 'images/dish-broast-seven.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 8,
		src: 'images/dish-broast-eight.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 9,
		src: 'images/dish-broast-nine.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 10,
		src: 'images/dish-broast-ten.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'broast',
		index: 11,
		src: 'images/dish-broast-eleven.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'broast',
		index: 12,
		src: 'images/dish-broast-twelve.jpg',
		title: 'Chicken Soup',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	   {
	   	id: 'barbecue',
		index: 1,
		src: 'images/dish-steak-one.jpg',
		title: 'Texas barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g'

	  },
	  {
	  	id: 'barbecue',
		index: 2,
		src: 'images/dish-steak-two.jpg',
		title: 'Memphis barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 3,
		src: 'images/dish-steak-three.jpg',
		title: 'Kansas barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 4,
		src: 'images/dish-steak-four.jpg',
		title: 'Carolina barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 5,
		src: 'images/dish-steak-five.jpg',
		title: 'South Carolina BBQ',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 6,
		src: 'images/dish-steak-six.jpg',
		title: 'Georgia barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 7,
		src: 'images/dish-steak-seven.jpg',
		title: 'Kentucky barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 8,
		src: 'images/dish-steak-eight.jpg',
		title: 'Chicken barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 9,
		src: 'images/dish-steak-nine.jpg',
		title: 'White Sauce BBQ',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 10,
		src: 'images/dish-steak-ten.jpg',
		title: 'Mustard Sauce BBQ',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
	  {
	  	id: 'barbecue',
		index: 11,
		src: 'images/dish-steak-eleven.jpg',
		title: 'Lexington Dip BBQ',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  },
      {
      	id: 'barbecue',
		index: 12,
		src: 'images/dish-steak-twelve.jpg',
		title: 'Tennessee barbecue',
		price: '18.78',
		shortDesctiption: 'Potato / Bread / Cheese',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orciLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor egestas orci',
		ingredient: 'low-sodium chicken broth, 2 medium carrots, sliced into 1/4-inch-thick rounds, 2 celery stalks, sliced into 1/4-inch-thick slices, 1 medium onion, chopped, 1 bay leaf, 1/2 cup white rice, 2 tablespoons chopped parsley, Kosher salt',
		nutrition: 'Calories: 130, Calories from Fat: 0% Daily Value, Total Fat 3.5g: 4%, Saturated Fat 1g: 5%, Trans Fat 0g, Polyunsaturated Fat 0g, Monounsaturated Fat 0g, Cholesterol 25mg: 8%, Sodium 1580mg: 69%, Potassium 90mg: 2%, Total Carbohydrate 19g: 7%, Dietary Fiber 1g: 4%, Sugars 1g, Protein 6g',

	  }
   ]