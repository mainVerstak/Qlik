"use strict"
//==================================================================================================================================================
//Бэграунд картинок - "Начало"
//==================================================================================================================================================
function ibg(){
	let ibg=document.querySelectorAll("._ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();
//==================================================================================================================================================
//Бэграунд картинок - "Конец"
//==================================================================================================================================================



//====================================================================================================================================================================================================================================


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

//====================================================================================================================================================================================================================================


// ==============================================================================

let vedeoWrappers = document.querySelectorAll('._vedeo-wrapper');

if (vedeoWrappers) {
	for (var i = 0; i < vedeoWrappers.length; i++) {
		let vedeoLoad = true;
		let vedeoWrapper = vedeoWrappers[i];

		vedeoWrapper.addEventListener("click", function (e) {
			let vedeo = vedeoWrapper.querySelector('._video');
			
			if (vedeo && vedeoWrapper && vedeoLoad) {
				vedeo.src = vedeo.dataset.video;
				vedeo.parentElement.load();
				vedeoLoad = false;
				vedeoWrapper.classList.add("_active");
			}
		});
	}
}


var swiper = new Swiper(".video", {
	effect: "fade",
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

//==================================================================================


document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("._form");

	for (let i = 0; i < forms.length; i++) {
		let form = forms[i];

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			let error = formValidate(form);

			if (error === 0) {
				form.submit();
			}
		});

		let formFeqInputs = form.querySelectorAll("._req");

		for (let i = 0; i < formFeqInputs.length; i++) {
			let formFeqInput = formFeqInputs[i];

			formFeqInput.parentElement.addEventListener( 'click', (e) => {
				for (let i = 0; i < formFeqInputs.length; i++) {
					let formFeqInput = formFeqInputs[i];
					if (formFeqInput.classList.contains('_error')) {
						formRemoveError(formFeqInput);
					}
				}
			})
		}

		function formValidate(form) {
			let error = 0;
			let formFeq = form.querySelectorAll("._req");

			for (var i = 0; i < formFeq.length; i++) {
				let input = formFeq[i];
				formRemoveError(input);

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input);
					error++;
				} else if (input.getAttribute("type") === "tel" && input.value != '') {
					if (!nomerTest(input.value)) {
						formAddError(input);
						error++
					}
				} else if (input.value === '') {
					formAddError(input);
					error++;
				}
			}

			return error;
		}

		function formAddError(input) {
			input.parentElement.classList.add("_error");
			input.classList.add("_error");
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove("_error");
			input.classList.remove("_error");
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
		function nomerTest(nomer) {
			if (true) {
				if (nomer[0] === "8" && nomer.length == 17) {
					return true;
				} else if (nomer[0] === "+" && nomerTestSimvol(nomer) === "7" && nomer.length > 17) {
					return true;
				}
			}
		}
		function nomerTestSimvol(nomer) {
			for (let i = 1; i < nomer.length; i++) {
				let simvol = nomer[i];

				if (+simvol > 0) {
					return simvol;
				}
			}
		}
	}
});




//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const loadMapBlock = document.querySelector('._load-map');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset) {
			lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
			ibg();
		}
	});
}

window.addEventListener("scroll", lazuScroll);
function lazuScroll() {
	if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
		lazyScrollCheck();
		ibg();
	}
}

function lazyScrollCheck() {
	let imgIndex = lazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete lazyImagesPositions[imgIndex];
	}
}
//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================