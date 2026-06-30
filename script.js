document.addEventListener('DOMContentLoaded', () => {
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.paddingBottom = "20px";
            } else {
                answer.style.maxHeight = null;
                setTimeout(() => {
                    answer.style.paddingBottom = "0px";
                }, 300); // match transition
            }
        });
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        
        let currentIndex = 0;

        const updateCarousel = (index) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0; // loop back to start
            }
            updateCarousel(currentIndex);
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1; // loop to end
            }
            updateCarousel(currentIndex);
        });

        // Handle resize to keep carousel aligned
        window.addEventListener('resize', () => {
            updateCarousel(currentIndex);
        });
    }

    // Scroll Reveal Animation Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});
