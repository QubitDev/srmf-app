document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('#slideshow img');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    setInterval(nextSlide, 5000); // Cambiar de diapositiva cada 5 segundos

    document.getElementById('loginBtn').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirigir a login.html
    });

    document.getElementById('registerBtn').addEventListener('click', () => {
        window.location.href = 'registro.html'; // Redirigir a register.html
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('#slideshow img');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    setInterval(nextSlide, 5000); // Cambiar de diapositiva cada 5 segundos

    document.getElementById('loginBtn').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirigir a login.html
    });

    document.getElementById('registerBtn').addEventListener('click', () => {
        window.location.href = 'registro.html'; // Redirigir a register.html
    });
});
