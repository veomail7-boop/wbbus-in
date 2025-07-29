// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSearch();
    initializeMobileMenu();
    initializeSmoothScrolling();
});

// Search Form Functionality
function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchValue = searchInput.value.trim();
            const destinationInput = document.querySelector('.destination');
            const destinationValue = destinationInput ? destinationInput.value.trim() : '';

            // Clear previous error messages
            hideError();

            // Validate search input
            if (!searchValue) {
                showError('Please enter a search term.');
                return;
            }

            if (searchValue.length < 2) {
                showError('Search term must be at least 2 characters long.');
                return;
            }

            // Simulate search functionality
            performSearch(searchValue, destinationValue);
        });

        // Real-time validation
        searchInput.addEventListener('input', function() {
            if (this.value.trim()) {
                hideError();
            }
        });
    }
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
}

// Hide error message
function hideError() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
    }
}

// Perform search (placeholder functionality)
function performSearch(searchTerm, destination) {
    try {
        // Show loading state
        const submitBtn = document.querySelector('.search-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Searching...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // For demo purposes, show an alert
            // In a real application, this would redirect to search results
            alert(`Searching for: "${searchTerm}"${destination ? ` to "${destination}"` : ''}\n\nThis is a demo. In a real application, this would show search results.`);
            
            // Optional: Filter bus cards on the current page
            filterBusCards(searchTerm);
        }, 1000);

    } catch (error) {
        console.error('Search error:', error);
        showError('An error occurred while searching. Please try again.');
        
        // Reset button state
        const submitBtn = document.querySelector('.search-btn');
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
    }
}

// Filter bus cards based on search term
function filterBusCards(searchTerm) {
    const busCards = document.querySelectorAll('.bus-card');
    const searchLower = searchTerm.toLowerCase();
    let visibleCount = 0;

    busCards.forEach(card => {
        const busName = card.querySelector('.bus-name').textContent.toLowerCase();
        const busRoute = card.querySelector('.bus-route').textContent.toLowerCase();
        
        if (busName.includes(searchLower) || busRoute.includes(searchLower)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show message if no results found
    const busGrid = document.querySelector('.bus-grid');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #666;
                font-size: 1.1rem;
            `;
            busGrid.appendChild(noResultsMsg);
        }
        noResultsMsg.textContent = `No buses found matching "${searchTerm}". Try a different search term.`;
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Internal Links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Bus Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const busCards = document.querySelectorAll('.bus-card');
    
    busCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            const busName = this.querySelector('.bus-name').textContent;
            const busRoute = this.querySelector('.bus-route').textContent;
            
            // Track click for analytics (placeholder)
            console.log(`Bus card clicked: ${busName} - ${busRoute}`);
        });

        // Add keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Form Enhancement
function enhanceFormExperience() {
    const inputs = document.querySelectorAll('.search-input, .search-select');
    
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Initialize form enhancements
document.addEventListener('DOMContentLoaded', enhanceFormExperience);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', initializeImageLoading);

// Clear search functionality
function addClearSearchButton() {
    const searchInput = document.getElementById('search-input');
    const destinationInput = document.querySelector('.destination');
    
    if (searchInput) {
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.textContent = 'Clear';
        clearBtn.className = 'clear-search-btn';
        clearBtn.style.cssText = `
            margin-left: 10px;
            padding: 12px 20px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        `;
        
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            if (destinationInput) destinationInput.value = '';
            hideError();
            
            // Show all bus cards
            const busCards = document.querySelectorAll('.bus-card');
            busCards.forEach(card => {
                card.style.display = 'block';
            });
            
            // Remove no results message
            const noResultsMsg = document.querySelector('.no-results-message');
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
        
        searchInput.parentElement.appendChild(clearBtn);
    }
}

// Initialize clear search button
document.addEventListener('DOMContentLoaded', addClearSearchButton);
