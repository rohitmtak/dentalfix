// hero carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-carousel_items');
    if (carousel) { // Add check to prevent error
        const items = document.querySelectorAll('.hero-carousel_item');
        const itemWidth = items[0]?.clientWidth || 0;
        const totalItems = items.length;
      
        let currentPosition = 0;
      
        function animate() {
            currentPosition += 0.5;
            if (currentPosition >= itemWidth * totalItems) {
                currentPosition = 0;
            }
            carousel.style.transform = `translateX(-${currentPosition}px)`;
            requestAnimationFrame(animate);
        }
      
        if (items.length > 0) {
            animate();
        }
    }
});
  


/* ========== WHY CARDS SCROLL ANIMATION ========== */
// document.addEventListener('DOMContentLoaded', () => {
//     const stackZone = document.querySelector('.stack-zone');
//     const cards = document.querySelectorAll('.why-card');
    
//     if (!cards.length || !stackZone || window.innerWidth < 768) return;

//     const totalHeight = cards.length * window.innerHeight;
//     stackZone.style.height = `${totalHeight}px`;

 
//     cards.forEach((card, index) => {
        
//         const offsetTop = 20 + index * 20;
//         card.style.paddingTop = `${offsetTop}px`;

     
//         if (index === cards.length - 1) return;

    
//         const toScale = 1 - (cards.length - 1 - index) * 0.1;
//         const nextCard = cards[index + 1];
//         const cardInner = card.querySelector('.why-card-inner');

//         if (!cardInner) return;

     
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (!entry.isIntersecting) return;

//                     const nextCardRect = nextCard.getBoundingClientRect();
//                     const progress = Math.max(0, Math.min(1, 
//                         (window.innerHeight - nextCardRect.top) / 
//                         (window.innerHeight - card.clientHeight)
//                     ));

              
//                     cardInner.style.transform = `scale(${
//                         1 - (progress * (1 - toScale))
//                     })`;
                    
                    
//                     cardInner.style.filter = `brightness(${
//                         1 - (progress * 0.4)
//                     })`;
//                 });
//             },
//             {
//                 threshold: 0,
//                 rootMargin: `${-offsetTop}px 0px ${-(window.innerHeight - card.clientHeight)}px 0px`
//             }
//         );

//         observer.observe(nextCard);
//     });

//     let resizeTimeout;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             if (window.innerWidth < 768) {
//                 cards.forEach(card => {
//                     const cardInner = card.querySelector('.why-card-inner');
//                     if (cardInner) {
//                         card.style.paddingTop = '';
//                         cardInner.style.transform = '';
//                         cardInner.style.filter = '';
//                     }
//                 });
//                 stackZone.style.height = '';
//             } else {
//                 stackZone.style.height = `${cards.length * window.innerHeight}px`;
//                 cards.forEach((card, index) => {
//                     const offsetTop = 20 + index * 20;
//                     card.style.paddingTop = `${offsetTop}px`;
//                 });
//             }
//         }, 250);
//     });
// });
  



/* ========== PENCODE EXAMPLE ========== */

const { ScrollObserver, valueAtPercentage } = aat

const cardsContainer = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
cardsContainer.style.setProperty('--cards-count', cards.length)
cardsContainer.style.setProperty(
  '--card-height',
  `${cards[0].clientHeight}px`
)
Array.from(cards).forEach((card, index) => {
  const offsetTop = 20 + index * 20
  card.style.paddingTop = `${offsetTop}px`
  if (index === cards.length - 1) {
    return
  }
  const toScale = 1 - (cards.length - 1 - index) * 0.1
  const nextCard = cards[index + 1]
  const cardInner = card.querySelector('.card__inner')
  ScrollObserver.Element(nextCard, {
    offsetTop,
    offsetBottom: window.innerHeight - card.clientHeight
  }).onScroll(({ percentageY }) => {
    cardInner.style.scale = valueAtPercentage({
      from: 1,
      to: toScale,
      percentage: percentageY
    })
    cardInner.style.filter = `brightness(${valueAtPercentage({
      from: 1,
      to: 0.6,
      percentage: percentageY
    })})`
  })
})






// services
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.services-track');
    const prev = document.querySelector('.services-nav.prev');
    const next = document.querySelector('.services-nav.next');
  
    // Only add event listeners if elements exist
    if (track && prev && next) {
        const scrollAmount = 320;      // adjust to card width + gap
    
        prev.addEventListener('click', () =>
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    
        next.addEventListener('click', () =>
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    }
});

// news carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.news-grid');
    
    // Only proceed if the news grid exists
    if (track) {
        const cards = track.querySelectorAll('.news-article');
        
        // Clone the first few cards and append them to create seamless loop
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        // Calculate scroll amount based on card width + gap
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // matches CSS gap
        const scrollAmount = cardWidth + gap;
        let autoScroll;
        let isScrolling = false;

        function startAutoScroll() {
            if (autoScroll) return; // Prevent multiple intervals

            autoScroll = setInterval(() => {
                if (isScrolling) return; // Don't start new scroll while animating
                
                isScrolling = true;
                const maxScroll = track.scrollWidth - track.clientWidth;
                
                if (track.scrollLeft >= maxScroll - (scrollAmount / 2)) {
                    // When near the end, quickly reset to start without animation
                    track.scrollTo({ left: 0, behavior: 'instant' });
                    // Then immediately scroll one card with animation
                    setTimeout(() => {
                        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }, 50);
                } else {
                    // Normal scroll
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }

                // Reset isScrolling flag after animation completes
                setTimeout(() => {
                    isScrolling = false;
                }, 500); // Match this with your transition duration
            }, 3000);
        }

        function stopAutoScroll() {
            if (autoScroll) {
                clearInterval(autoScroll);
                autoScroll = null;
            }
        }

        // Handle scroll animation end
        track.addEventListener('scroll', () => {
            if (!isScrolling) return;
            clearTimeout(track.scrollTimeout);
            track.scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        });

        // Pause auto-scroll when user interacts with the carousel
        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);
        track.addEventListener('touchstart', stopAutoScroll);
        track.addEventListener('touchend', startAutoScroll);

        // Start auto-scrolling
        startAutoScroll();
    }
});

/* ========== SERENITY CARDS ANIMATION ========== */
document.addEventListener('DOMContentLoaded', () => {
    const stackContainer = document.querySelector('.serenity-stack');
    const cards = document.querySelectorAll('.serenity-card');
    
    if (!cards.length || !stackContainer || window.innerWidth < 800) return;

    // Set container height
    stackContainer.style.setProperty('--cards-count', cards.length);
    stackContainer.style.setProperty(
        '--card-height',
        `${cards[0].clientHeight}px`
    );

    // Initialize cards
    cards.forEach((card, index) => {
        // Set initial padding for proper spacing
        const offsetTop = 20 + index * 20;
        card.style.paddingTop = `${offsetTop}px`;

        if (index === cards.length - 1) return;

        const toScale = 1 - (cards.length - 1 - index) * 0.1;
        const nextCard = cards[index + 1];

        // Use ScrollObserver for smooth animations
        ScrollObserver.Element(nextCard, {
            offsetTop,
            offsetBottom: window.innerHeight - card.clientHeight
        }).onScroll(({ percentageY }) => {
            // Apply smooth scale transform
            card.style.transform = `translateY(-50%) scale(${
                valueAtPercentage({
                    from: 1,
                    to: toScale,
                    percentage: percentageY
                })
            })`;

            // Apply smooth brightness filter
            card.style.filter = `brightness(${
                valueAtPercentage({
                    from: 1,
                    to: 0.6,
                    percentage: percentageY
                })
            })`;

            // Fade out icons smoothly
            const cardIcon = card.querySelector('.card-icon');
            if (cardIcon) {
                cardIcon.style.opacity = valueAtPercentage({
                    from: 1,
                    to: 0.6,
                    percentage: percentageY
                });
            }
        });
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 800) {
                // Reset all styles for mobile
                stackContainer.style.removeProperty('--cards-count');
                stackContainer.style.removeProperty('--card-height');
                cards.forEach(card => {
                    card.style.transform = '';
                    card.style.filter = '';
                    card.style.paddingTop = '';
                    const cardIcon = card.querySelector('.card-icon');
                    if (cardIcon) {
                        cardIcon.style.opacity = '';
                    }
                });
            } else {
                // Restore styles for desktop
                stackContainer.style.setProperty('--cards-count', cards.length);
                stackContainer.style.setProperty(
                    '--card-height',
                    `${cards[0].clientHeight}px`
                );
                cards.forEach((card, index) => {
                    const offsetTop = 20 + index * 20;
                    card.style.paddingTop = `${offsetTop}px`;
                });
            }
        }, 250);
    });
});