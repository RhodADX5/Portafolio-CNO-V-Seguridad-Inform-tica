document.addEventListener("DOMContentLoaded", function() {

    // ---------------------------
    // Inicialización EmailJS
    // ---------------------------
    (function(){
        emailjs.init("M-6IDaEchJTUWHmPR");
    })();

    const form = document.getElementById("contact-form");

    if(form){
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            emailjs.sendForm(
                "service_0kxea1e",
                "template_3jpy4st",
                this
            ).then(
                function() {
                    alert("Mensaje enviado correctamente.");
                },
                function(error) {
                    alert("Error al enviar el mensaje.");
                    console.error(error);
                }
            );
        });
    }

    // ---------------------------
    // Menú lateral
    // ---------------------------
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if(toggle && sidebar && overlay){
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // ---------------------------
    // Lógica del Submenú (Dropdown)
    // ---------------------------
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const arrow = document.querySelector('.arrow');

    if(dropdownBtn && dropdownContainer){
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que el enlace recargue la página
            dropdownContainer.classList.toggle('dropdown-active');
            arrow.classList.toggle('rotate');
        });
    }
});
