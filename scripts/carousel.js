function initializeCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('.prev-btn');
        const nextButton = carousel.querySelector('.next-btn');
        const indicators = carousel.querySelectorAll('.indicator');
        // Get the interval from the data attribute, default to 3000ms
        const intervalTime = parseInt(carousel.dataset.autoplayInterval) || 5000; 

        let slideIndex = 0;
        let autoPlayInterval;

        const moveToSlide = (targetIndex) => {
            // Calculate wrapping index
            if (targetIndex >= slides.length) {
                targetIndex = 0;
            } else if (targetIndex < 0) {
                targetIndex = slides.length - 1;
            }
            
            slideIndex = targetIndex;
            
            // Calculate the distance to move the track
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + slideWidth * slideIndex + 'px)';

            // Update indicators
            indicators.forEach(indicator => indicator.classList.remove('active'));
            if (indicators.length > 0) {
                indicators[slideIndex].classList.add('active');
            }
        };

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                moveToSlide(slideIndex + 1);
            }, intervalTime);
        };
        
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Navigation buttons
        prevButton.addEventListener('click', () => {
            moveToSlide(slideIndex - 1);
            resetAutoPlay();
        });

        nextButton.addEventListener('click', () => {
            moveToSlide(slideIndex + 1);
            resetAutoPlay();
        });

        // Indicator navigation
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.dataset.index);
                moveToSlide(targetIndex);
                resetAutoPlay();
            });
        });

        // Handle resizing
        window.addEventListener('resize', () => {
            moveToSlide(slideIndex); // Recalculate and set the current position
        });
        
        // Start auto-play
        startAutoPlay();
    }

    // Find ALL elements with the class 'custom-carousel' and initialize the script for each one.
    const allCarousels = document.querySelectorAll('.custom-carousel');
    allCarousels.forEach(initializeCarousel);