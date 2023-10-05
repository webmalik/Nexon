import $ from "jquery";
import gsap from "gsap";
import LocomotiveScroll from 'locomotive-scroll';

export function locomotive() {
	const scroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true,
		tablet: { smooth: true },
		smartphone: { smooth: true }
	});
}

export function header_animations() {

}

export function mouse() {
	const mouse = document.querySelector('.mouse');
	function moveMouse(e) {
		if (e.clientX < 8 || e.clientY < 8 || e.clientY > (window.innerHeight - 8) || e.clientX > (window.innerWidth - 8)) {
			mouse.style.opacity = 0;
		} else {
			mouse.style.opacity = 1;
			mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
		}
	};

	if (window.innerWidth >= 768) {
		document.addEventListener('mousemove', moveMouse);
	}
}

export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function burgerMenu() {
	$('.header__burger').on("click", function (event) {
		$('.header__burger, .header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}
