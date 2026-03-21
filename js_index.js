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
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const dropdownContainer = this.nextElementSibling;

            document.querySelectorAll('.dropdown-container').forEach(dc => {
                if (dc !== dropdownContainer) {
                    dc.classList.remove('dropdown-active');
                }
            });

            dropdownContainer.classList.toggle('dropdown-active');
        });
    });

    // ==========================
    // BASE DE DATOS DEL QUIZ
    // ==========================
    const preguntas = [
        {
            texto: "Recibes un correo de 'tu banco' solicitando verificar tu cuenta con un enlace urgente.",
            respuesta: true,
            explicacion: "Intento clásico de phishing usando urgencia y suplantación bancaria."
        },
        {
            texto: "Correo de tu universidad con dominio oficial y sin enlaces sospechosos.",
            respuesta: false,
            explicacion: "Dominio legítimo y sin indicadores de ataque."
        },
        {
            texto: "Mensaje de 'Amazon' con error ortográfico y link acortado.",
            respuesta: true,
            explicacion: "Errores y enlaces acortados son indicadores claros de phishing."
        },
        {
            texto: "Correo interno de tu empresa solicitando credenciales vía archivo adjunto.",
            respuesta: true,
            explicacion: "Nunca se solicitan credenciales por archivo."
        },
        {
            texto: "Notificación real de actualización de contraseña desde dominio corporativo.",
            respuesta: false,
            explicacion: "Procedimiento normal si viene del dominio oficial."
        },
        {
            texto: "SMS con premio ganado y enlace externo.",
            respuesta: true,
            explicacion: "Técnica de smishing (phishing por SMS)."
        },
        {
            texto: "Correo de LinkedIn notificando inicio de sesión desde otro país.",
            respuesta: false,
            explicacion: "Puede ser legítimo, verificar siempre desde el sitio oficial."
        },
        {
            texto: "Página que imita Google pero URL extraña.",
            respuesta: true,
            explicacion: "Phishing por suplantación de sitio web."
        },
        {
            texto: "Correo de soporte IT solicitando reinicio de contraseña vía link externo.",
            respuesta: true,
            explicacion: "Ingeniería social interna."
        },
        {
            texto: "Correo de servicio conocido con HTTPS y dominio correcto.",
            respuesta: false,
            explicacion: "Indicadores de autenticidad."
        }
    ];

    // ==========================
    // VARIABLES
    // ==========================
    let indice = 0;
    let puntaje = 0;

    // ==========================
    // MOSTRAR PREGUNTA
    // ==========================
    function cargarPregunta() {
        if (indice < preguntas.length) {
            document.getElementById("pregunta").textContent = preguntas[indice].texto;
            document.getElementById("progreso").textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
            document.getElementById("feedback").textContent = "";
        } else {
            mostrarResultado();
        }
    }

    // ==========================
    // RESPUESTA
    // ==========================
    window.responder = function responder(respuestaUsuario) {
        const correcta = preguntas[indice].respuesta;

        if (respuestaUsuario === correcta) {
            puntaje++;
            document.getElementById("feedback").textContent = "✔ Correcto";
        } else {
            document.getElementById("feedback").textContent = "❌ Incorrecto";
        }

        document.getElementById("feedback").textContent += " - " + preguntas[indice].explicacion;

        indice++;

        setTimeout(cargarPregunta, 2000);
    }

    // ==========================
    // RESULTADO FINAL
    // ==========================
    function mostrarResultado() {
        document.getElementById("pregunta").textContent = "";
        document.getElementById("progreso").textContent = "";
        document.getElementById("feedback").textContent = "";

        document.getElementById("score").textContent = `Puntaje: ${puntaje}/10`;

        let nivel = "";

        if (puntaje <= 4) {
            nivel = "Alto riesgo (vulnerable a phishing)";
        } else if (puntaje <= 7) {
            nivel = "Riesgo medio";
        } else {
            nivel = "Buen nivel de seguridad";
        }

        document.getElementById("nivel").textContent = nivel;
    }

    // ---------------------------
    // INICIAR QUIZ
    // ---------------------------
    window.iniciarQuiz = function() {
        indice = 0;
        puntaje = 0;

        document.getElementById("inicio-quiz").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("resultados").style.display = "none";

        cargarPregunta();
    };

});

