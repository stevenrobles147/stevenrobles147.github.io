document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate API call/processing
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
});
