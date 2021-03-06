import Siema from 'siema';

class Carousel {

    /*
        Carousel library
        https://github.com/pawelgrzybek/siema

        Browser support: IE 10+
    */

    constructor() {

        // Set carousel elements
        this.carouselClass = '.carousel';
        this.prev = document.querySelector('.carousel__navigation-prev');
        this.next = document.querySelector('.carousel__navigation-next');
        this.pagerContainer = document.querySelector('.carousel__pager');

        // Set carousel element classes
        this.pagerContainerInit = 'carousel__pager--init';
        this.pagerButton = 'carousel__pager-button';
        this.pagerButtonActive = 'carousel__pager-button--active';

        // Set carousel config vars
        this.duration = 500;
        this.easing = 'cubic-bezier(0.65, 0.05, 0.35, 1)';
        
        this.bindEvents();
    }

    runCarousel(updatePager) {
        updatePager = this.updatePager();

        // Set carousel config
        this.carousel = new Siema({
            selector: this.carouselClass,
            duration: this.duration,
            easing: this.easing,

            // Callbacks
            onChange: function() {
                this.updatePager();
            }
        });
    }

    addControls() {

        // Button navigation
        this.prev.addEventListener('click', () => this.carousel.prev());
        this.next.addEventListener('click', () => this.carousel.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {

            // Left arrow
            if (e.keyCode === 37) {
                this.carousel.prev();
            }

            // Right arrow
            else if (e.keyCode === 39) {
                this.carousel.next();
            }
        });
    }

    addPager() {

        // Pass pager config
        let pager = this.pagerContainer;
        let pagerButton = this.pagerButton;

        Siema.prototype.addPager = function() {
            for (let i = 0; i < this.innerElements.length; i++) {
                let button = document.createElement('button');
                button.className = pagerButton;
                button.textContent = i;
                button.addEventListener('click', () => this.goTo(i));
                pager.appendChild(button);
            }
        }

        this.carousel.addPager();
    }

    updatePager() {

        // Pass pager config
        let pager = this.pagerContainer;
        let pagerInit = this.pagerContainerInit;
        let pagerButtonActive = this.pagerButtonActive;

        // Update pager
        Siema.prototype.updatePager = function() {
            pager.classList.remove(pagerInit);
            for (let i = 0; i < this.innerElements.length; i++) {
                const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
                pager.childNodes[i].classList[addOrRemove](pagerButtonActive);
            }
        }
    }

    bindEvents() {
        this.runCarousel();
        this.addControls();
        this.addPager();
    }
}

new Carousel();
