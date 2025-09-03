/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
			
			// Initialize typing animation
			initTypingAnimation();
			
			// Initialize scroll animations
			initScrollAnimations();
			
			// Initialize interactive elements
			initInteractiveElements();
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide menu first
						$menu._hide();

					// Then scroll to section after menu closes
						window.setTimeout(function() {
							if (href.startsWith('#') && $(href).length) {
								smoothScrollTo(href);
							} else if (!href.startsWith('#')) {
								window.location.href = href;
							}
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

	// Smooth scrolling for anchor links
		$('a[href^="#"]').on('click', function(event) {
			var target = $(this).attr('href');
			if (target.length > 1 && $(target).length) {
				event.preventDefault();
				smoothScrollTo(target);
			}
		});

	// Custom Functions
		function smoothScrollTo(target) {
			var $target = $(target);
			if ($target.length) {
				// Calculate the position
				var targetOffset = $target.offset().top - 80;
				
				// Use modern smooth scroll if available, otherwise fallback to jQuery animate
				if ('scrollBehavior' in document.documentElement.style) {
					window.scrollTo({
						top: targetOffset,
						behavior: 'smooth'
					});
				} else {
					$('html, body').animate({
						scrollTop: targetOffset
					}, 800, 'swing');
				}
			}
		}

		function initTypingAnimation() {
			var $typingText = $('.typing-text');
			if ($typingText.length) {
				var text = $typingText.text();
				$typingText.text('');
				var i = 0;
				var typeTimer = setInterval(function() {
					if (i < text.length) {
						$typingText.text(text.substring(0, i + 1));
						i++;
					} else {
						clearInterval(typeTimer);
					}
				}, 100);
			}
		}

		function initScrollAnimations() {
			// Animate elements on scroll
			var observerOptions = {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			};

			var observer = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			}, observerOptions);

			// Observe sections and cards
			$('.skill-category, .project-item, .wrapper').each(function() {
				observer.observe(this);
			});
		}

		function initInteractiveElements() {
			// Project cards hover effects
			$('.project-item').hover(
				function() {
					$(this).addClass('pulse-animation');
				},
				function() {
					$(this).removeClass('pulse-animation');
				}
			);

			// Skill tags interactive effects
			$('.skill-tag').on('click', function() {
				$(this).addClass('pulse-animation');
				setTimeout(() => {
					$(this).removeClass('pulse-animation');
				}, 2000);
			});

			// Form enhancement
			$('.contact-form input, .contact-form textarea').on('focus', function() {
				$(this).parent().addClass('focused');
			}).on('blur', function() {
				if ($(this).val() === '') {
					$(this).parent().removeClass('focused');
				}
			});

			// Add floating particles effect
			createFloatingParticles();
		}

		function createFloatingParticles() {
			var $banner = $('#banner');
			if ($banner.length) {
				for (var i = 0; i < 20; i++) {
					var $particle = $('<div class="particle"></div>');
					$particle.css({
						position: 'absolute',
						width: Math.random() * 4 + 2 + 'px',
						height: Math.random() * 4 + 2 + 'px',
						background: 'rgba(0,255,136,0.3)',
						borderRadius: '50%',
						left: Math.random() * 100 + '%',
						top: Math.random() * 100 + '%',
						pointerEvents: 'none',
						animation: 'float ' + (Math.random() * 10 + 10) + 's ease-in-out infinite',
						animationDelay: Math.random() * 5 + 's'
					});
					$banner.append($particle);
				}
			}
		}

	// Add CSS animations
		var style = document.createElement('style');
		style.textContent = `
			@keyframes float {
				0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
				50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
			}
			@keyframes grid-move {
				0% { transform: translate(0, 0); }
				100% { transform: translate(10px, 10px); }
			}
			.animate-in {
				animation: slideInUp 0.8s ease-out;
			}
			@keyframes slideInUp {
				from {
					transform: translateY(30px);
					opacity: 0;
				}
				to {
					transform: translateY(0);
					opacity: 1;
				}
			}
			.focused label {
				color: #00ff88 !important;
				transform: scale(0.9);
			}
		`;
		document.head.appendChild(style);

})(jQuery);