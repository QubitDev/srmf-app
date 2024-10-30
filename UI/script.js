document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const menuScreen = document.getElementById('menu-screen');
    const misCitasScreen = document.getElementById('mis-citas-screen');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout');
    const citasList = document.getElementById('citas-list');

    const mockCitas = [
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' }
    ];

    function showScreen(screen) {
        loginScreen.classList.add('hidden');
        menuScreen.classList.add('hidden');
        misCitasScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Mock authentication (replace with real authentication in production)
        if (username && password) {
            // Redirigir a otra página HTML
            window.location.href = '/vista-citas.html';
        } else {
            alert('Please enter both username and password');
        }
    });
    

    logoutButton.addEventListener('click', () => {
        showScreen(loginScreen);
    });

    document.querySelector('a[href="#mis-citas"]').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen(misCitasScreen);
        renderCitas();
    });

    function renderCitas() {
        citasList.innerHTML = '';
        mockCitas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita-item');
            citaElement.innerHTML = `
                <p><strong>${cita.doctor}</strong> - ${cita.specialty}</p>
                <p>${cita.date} ${cita.time}</p>
            `;
            citasList.appendChild(citaElement);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const menuScreen = document.getElementById('menu-screen');
    const misCitasScreen = document.getElementById('mis-citas-screen');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout');
    const citasList = document.getElementById('citas-list');

    const mockCitas = [
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' },
        { doctor: 'Dr. Jhona', specialty: 'Ginecólogo', date: '14/12/2024', time: '10:00' }
    ];

    function showScreen(screen) {
        loginScreen.classList.add('hidden');
        menuScreen.classList.add('hidden');
        misCitasScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Mock authentication (replace with real authentication in production)
        if (username && password) {
            // Redirigir a otra página HTML
            window.location.href = '/vista-citas.html';
        } else {
            alert('Please enter both username and password');
        }
    });
    

    logoutButton.addEventListener('click', () => {
        showScreen(loginScreen);
    });

    document.querySelector('a[href="#mis-citas"]').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen(misCitasScreen);
        renderCitas();
    });

    function renderCitas() {
        citasList.innerHTML = '';
        mockCitas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita-item');
            citaElement.innerHTML = `
                <p><strong>${cita.doctor}</strong> - ${cita.specialty}</p>
                <p>${cita.date} ${cita.time}</p>
            `;
            citasList.appendChild(citaElement);
        });
    }
});