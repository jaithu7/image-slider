document.addEventListener('DOMContentLoaded', function() {
    // Car image data with captions
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
            caption: 'Porsche 911 - Iconic German engineering'
        },
        {
            src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
            caption: 'Audi R8 - Performance meets luxury'
        },
        {
            src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
            caption: 'Mercedes-Benz S-Class - The ultimate in comfort'
        },
        {
            src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
            caption: 'BMW M5 - The ultimate driving machine'
        },
        {
            src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
            caption: 'Ferrari 488 - Italian passion on wheels'
        },
        {
            src: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc',
            caption: 'Lamborghini Aventador - Extreme performance'
        },
        // New car images added below
        {
            src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023',
            caption: 'Lamborghini Huracán - Aggressive precision'
        },
        {
            src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b',
            caption: 'McLaren 720S - Aerodynamic masterpiece'
        },
        {
            src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333',
            caption: 'Aston Martin DB11 - British elegance'
        },
        {
            src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98',
            caption: 'Tesla Model S - Electric innovation'
        },
        {
            src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
            caption: 'Jaguar F-Type - Modern classic'
        },
        {
            src: 'https://images.unsplash.com/photo-1563720223185-11003d516935',
            caption: 'Chevrolet Corvette - American muscle'
        }
    ];

    // DOM elements
    const slidesContainer = document.querySelector('.slides');
    const captionContainer = document.querySelector('.caption');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const autoSlideBtn = document.querySelector('.auto-slide');
    const pauseBtn = document.querySelector('.pause-slide');
    
    let currentIndex = 0;
    let autoSlideInterval;
    let isAutoSliding = false;

    // Initialize the slider
    function initSlider() {
        // Create slides
        images.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <img src="${image.src}" alt="Luxury car ${index + 1}">
                <div class="slide-overlay"></div>
                <div class="slide-caption">${image.caption}</div>
            `;
            slidesContainer.appendChild(slide);
            
            // Create thumbnail
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.innerHTML = `<img src="${image.src}" alt="Thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', () => goToSlide(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Set initial caption
        captionContainer.textContent = images[0].caption;
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    // Update slider display
    function updateSlider() {
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        
        // Update caption
        captionContainer.textContent = images[currentIndex].caption;
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll thumbnails into view
        const activeThumb = thumbnails[currentIndex];
        activeThumb.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // Start auto sliding
    function startAutoSlide() {
        if (isAutoSliding) return;
        
        isAutoSliding = true;
        autoSlideBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Pause auto sliding
    function pauseAutoSlide() {
        if (!isAutoSliding) return;
        
        isAutoSliding = false;
        autoSlideBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    autoSlideBtn.addEventListener('click', startAutoSlide);
    pauseBtn.addEventListener('click', pauseAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === ' ') {
            if (isAutoSliding) pauseAutoSlide();
            else startAutoSlide();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Initialize the slider
    initSlider();
    
    // Start auto slide after 3 seconds
    setTimeout(startAutoSlide, 3000);
});