document.addEventListener('DOMContentLoaded', function() {
    // Create stars with reduced quantity for better performance
    const starsContainer = document.querySelector('.stars');
    const starCount = window.innerWidth <= 600 ? 50 : 100; // Reduce stars on mobile
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize star properties
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}px`;
        star.style.top = `${posY}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Add fewer shooting stars for better performance
    const shootingStarCount = window.innerWidth <= 600 ? 2 : 4;
    const shootingStarsContainer = document.querySelector('.shooting-stars-container');
    
    for (let i = 0; i < shootingStarCount; i++) {
        setTimeout(() => {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            // Randomize shooting star properties
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight / 2;
            const delay = Math.random() * 10;
            
            shootingStar.style.left = `${posX}px`;
            shootingStar.style.top = `${posY}px`;
            shootingStar.style.animationDelay = `${delay}s`;
            
            shootingStarsContainer.appendChild(shootingStar);
            
            // Remove and recreate shooting stars periodically to avoid memory issues
            setTimeout(() => {
                shootingStar.remove();
                createShootingStar();
            }, 6000);
        }, i * 2000);
    }
    
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight / 2;
        
        shootingStar.style.left = `${posX}px`;
        shootingStar.style.top = `${posY}px`;
        
        shootingStarsContainer.appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
            createShootingStar();
        }, 6000);
    }

    // Form animation and validation
    const form = document.getElementById('space-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const planetInput = document.getElementById('planet');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const blackHoleEffect = document.getElementById('black-hole-effect');
    const successMessage = document.getElementById('success-message');
    const backBtn = document.getElementById('back-btn');
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show error
    function showError(field, message) {
        const inputGroup = field.closest('.input-group');
        const inputField = field.closest('.input-field');
        const errorMessage = inputGroup.querySelector('.error-message');
        
        inputField.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
        
        return false;
    }
    
    // Function to clear error
    function clearError(field) {
        const inputGroup = field.closest('.input-group');
        const inputField = field.closest('.input-field');
        const errorMessage = inputGroup.querySelector('.error-message');
        
        inputField.classList.remove('error');
        errorMessage.classList.remove('active');
    }
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
            clearError(nameInput);
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim())) {
            clearError(emailInput);
        }
    });
    
    planetInput.addEventListener('input', () => {
        if (planetInput.value.trim() !== '') {
            clearError(planetInput);
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            clearError(messageInput);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            isValid = showError(nameInput, 'Nama tidak boleh kosong');
        } else {
            clearError(nameInput);
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            isValid = showError(emailInput, 'Email tidak boleh kosong');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = showError(emailInput, 'Format email tidak valid');
        } else {
            clearError(emailInput);
        }
        
        // Validate planet
        if (planetInput.value.trim() === '') {
            isValid = showError(planetInput, 'Asal planet tidak boleh kosong');
        } else {
            clearError(planetInput);
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            isValid = showError(messageInput, 'Pesan tidak boleh kosong');
        } else {
            clearError(messageInput);
        }
        
        if (isValid) {
            // Show loading indicator
            loadingIndicator.classList.add('active');
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                loadingIndicator.classList.remove('active');
                
                // Animate black hole effect
                blackHoleEffect.style.animation = 'expandBlackHole 2s forwards';
                
                // Hide form elements with animation
                const formElements = form.querySelectorAll('.input-group, .submit-btn');
                formElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.animation = 'disappearToCenter 0.5s forwards';
                    }, index * 100);
                });
                
                // Show success message after animation
                setTimeout(() => {
                    successMessage.classList.add('active');
                }, 1500);
            }, 1500);
        }
    });
    
    // Back button functionality
    backBtn.addEventListener('click', function() {
        successMessage.classList.remove('active');
        
        // Reset form
        form.reset();
        
        // Reset animations
        blackHoleEffect.style.animation = '';
        
        const formElements = form.querySelectorAll('.input-group, .submit-btn');
        formElements.forEach(el => {
            el.style.animation = '';
        });
        
        // Trigger fade-in animations again
        setTimeout(() => {
            document.querySelectorAll('.input-group').forEach((el, i) => {
                el.style.animation = `fadeIn 0.5s forwards ${i * 0.1}s`;
            });
            submitBtn.style.animation = 'fadeIn 0.5s forwards 0.8s';
        }, 100);
    });
});