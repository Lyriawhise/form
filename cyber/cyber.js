document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cyberpunkForm');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Create sparkles container
    const sparklesContainer = document.createElement('div');
    sparklesContainer.style.position = 'absolute';
    sparklesContainer.style.top = '0';
    sparklesContainer.style.left = '0';
    sparklesContainer.style.width = '100%';
    sparklesContainer.style.height = '100%';
    sparklesContainer.style.pointerEvents = 'none';
    sparklesContainer.style.zIndex = '9999';
    document.body.appendChild(sparklesContainer);
    
    // Validation function
    function validateInput(input) {
      if(input.validity.valid) {
        input.classList.remove('error-field');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if(errorMsg) {
          input.parentElement.removeChild(errorMsg);
        }
        return true;
      } else {
        if(!input.classList.contains('error-field')) {
          input.classList.add('error-field');
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          
          if(input.validity.valueMissing) {
            errorMsg.textContent = 'ERROR: FIELD REQUIRED';
          } else if(input.validity.typeMismatch) {
            errorMsg.textContent = 'ERROR: INVALID FORMAT';
          } else {
            errorMsg.textContent = 'ERROR: INVALID INPUT';
          }
          
          input.parentElement.appendChild(errorMsg);
        }
        return false;
      }
    }
    
    // Add validation to each input
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
      
      input.addEventListener('input', function() {
        if(this.classList.contains('error-field')) {
          validateInput(this);
        }
      });
    });
    
    // Create electric effect on button click
    submitBtn.addEventListener('click', function(e) {
      const electricEffect = this.querySelector('.electric-effect');
      electricEffect.style.opacity = '0.7';
      
      // Create sparkles
      createSparkles(submitBtn);
      
      setTimeout(() => {
        electricEffect.style.opacity = '0';
      }, 300);
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      inputs.forEach(input => {
        if(!validateInput(input)) {
          isValid = false;
        }
      });
      
      if(isValid) {
        // Form is valid, show success effect
        submitBtn.style.backgroundColor = 'rgba(47, 224, 255, 0.3)';
        submitBtn.style.borderColor = 'var(--neon-blue)';
        submitBtn.style.color = 'var(--neon-blue)';
        submitBtn.textContent = 'TRANSMITTED';
        submitBtn.style.boxShadow = '0 0 20px var(--neon-blue)';
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          submitBtn.style.backgroundColor = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          submitBtn.textContent = 'SUBMIT';
          submitBtn.style.boxShadow = '';
        }, 3000);
      }
    });
    
    // Function to create sparkles
    function createSparkles(element) {
      const rect = element.getBoundingClientRect();
      
      for(let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position around the button
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 0.5 + Math.random() * 1;
        
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        sparklesContainer.appendChild(sparkle);
        
        // Animate sparkle
        setTimeout(() => {
          sparkle.style.opacity = '1';
          sparkle.style.transform = `translate(${targetX - x}px, ${targetY - y}px) scale(0)`;
          sparkle.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
          
          setTimeout(() => {
            sparklesContainer.removeChild(sparkle);
          }, duration * 1000);
        }, i * 50);
      }
    }
  });
