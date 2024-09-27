document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendarBody');
    const currentMonthElement = document.getElementById('currentMonth');
    const selectedDateElement = document.getElementById('selectedDate');
    const appointmentList = document.getElementById('appointmentList');
    const createAppointmentBtn = document.getElementById('createAppointment');
    const appointmentModal = document.getElementById('appointmentModal');
    const appointmentForm = document.getElementById('appointmentForm');
    const closeModalBtn = document.getElementById('closeModal');

    let currentDate = new Date();
    let selectedDate = new Date();
    let appointments = {};

    function renderCalendar() {
        calendarBody.innerHTML = '';
        currentMonthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarBody.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)));
            calendarBody.appendChild(dayElement);
        }

        updateSelectedDate();
    }

    function selectDate(date) {
        selectedDate = date;
        updateSelectedDate();
        renderAppointments();
    }

    function updateSelectedDate() {
        selectedDateElement.textContent = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.toggle('selected', day.textContent === selectedDate.getDate().toString() && currentDate.getMonth() === selectedDate.getMonth());
        });
    }

    function renderAppointments() {
        appointmentList.innerHTML = '';
        const dateKey = selectedDate.toDateString();
        if (appointments[dateKey]) {
            appointments[dateKey].forEach(appointment => {
                const appointmentElement = document.createElement('div');
                appointmentElement.classList.add('appointment-item');
                appointmentElement.textContent = `${appointment.time} - ${appointment.title}`;
                appointmentList.appendChild(appointmentElement);
            });
        }
    }

    createAppointmentBtn.addEventListener('click', () => {
        appointmentModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        appointmentModal.style.display = 'none';
    });

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const time = document.getElementById('appointmentTime').value;
        const title = document.getElementById('appointmentTitle').value;
        const dateKey = selectedDate.toDateString();
        if (!appointments[dateKey]) {
            appointments[dateKey] = [];
        }
        appointments[dateKey].push({ time, title });
        appointments[dateKey].sort((a, b) => a.time.localeCompare(b.time));
        renderAppointments();
        appointmentModal.style.display = 'none';
        appointmentForm.reset();
    });

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});