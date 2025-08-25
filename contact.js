// Configuración de EmailJS
(function () {
  emailjs.init("TU_PUBLIC_KEY_AQUI"); // Reemplaza con tu Public Key de EmailJS
})();

// Función para verificar reCAPTCHA
function verifyRecaptcha() {
  const response = grecaptcha.getResponse();
  if (response.length === 0) {
    alert("Por favor, completa el reCAPTCHA antes de enviar el formulario.");
    return false;
  }
  return true;
}

// Función para enviar el formulario con EmailJS
function submitForm(event) {
  event.preventDefault();

  // Validar campos requeridos
  if (!validateRequiredFields()) {
    return;
  }

  // Verificar reCAPTCHA
  if (!verifyRecaptcha()) {
    return;
  }

  // Mostrar indicador de carga
  const submitButton = document.querySelector(".btn-enviar");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  // Preparar los datos del template
  const templateParams = {
    from_name: document.getElementById("nombre").value,
    from_email: document.getElementById("mail").value,
    subject: document.getElementById("asunto").value,
    message: document.getElementById("mensaje").value,
    recaptcha_response: grecaptcha.getResponse(),
  };

  // Enviar email usando EmailJS
  emailjs
    .send(
      "service_n8z85st", // Tu Service ID
      "template_6pu38wm", // Tu Template ID
      templateParams
    )
    .then(function (response) {
      console.log("Email enviado exitosamente:", response);

      // Mostrar mensaje de éxito
      alert("¡Mensaje enviado con éxito! Te responderemos pronto.");

      // Limpiar el formulario
      document.querySelector(".contact-form").reset();

      // Resetear reCAPTCHA
      grecaptcha.reset();
    })
    .catch(function (error) {
      console.error("Error al enviar email:", error);
      alert(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      );
    })
    .finally(function () {
      // Restaurar el botón
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

// Función para inicializar el formulario
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();

  // Agregar callbacks de reCAPTCHA si es necesario
  if (typeof grecaptcha !== "undefined") {
    grecaptcha.ready(function () {
      console.log("reCAPTCHA está listo");
    });
  }
});

// Función para validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para validar campos requeridos
function validateRequiredFields() {
  const nombre = document.getElementById("nombre").value.trim();
  const mail = document.getElementById("mail").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre) {
    alert("Por favor, ingresa tu nombre.");
    return false;
  }

  if (!mail) {
    alert("Por favor, ingresa tu email.");
    return false;
  }

  if (!validateEmail(mail)) {
    alert("Por favor, ingresa un email válido.");
    return false;
  }

  if (!asunto) {
    alert("Por favor, ingresa un asunto.");
    return false;
  }

  if (!mensaje) {
    alert("Por favor, ingresa un mensaje.");
    return false;
  }

  return true;
}
