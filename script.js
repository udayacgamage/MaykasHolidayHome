
    // Booking form basic handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        if (!btn) return;
        const original = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerText = 'Sent!';
          btn.classList.remove('cta-btn');
          btn.classList.add('btn-success');
          setTimeout(() => {
            btn.disabled = false;
            btn.innerText = original;
          }, 2000);
        }, 900);
      });
    }
