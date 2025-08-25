// Configuración de EmailJS
(function () {
  emailjs.init("pORWEzBp4OPe4K78m"); // Public Key de EmailJS
  console.log("EmailJS inicializado con Public Key:", "pORWEzBp4OPe4K78m");
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

  console.log("=== DIAGNÓSTICO EMAILJS ===");
  console.log("Template Params:", templateParams);
  console.log("Service ID:", "service_0hddnc8");
  console.log("Template ID:", "template_6pu38wm");
  console.log("Public Key:", "pORWEzBp4OPe4K78m");
  console.log("EmailJS disponible:", typeof emailjs !== "undefined");
  console.log("reCAPTCHA response:", grecaptcha.getResponse());

  // Enviar email usando EmailJS
  emailjs
    .send(
      "service_0hddnc8", // Service ID
      "template_6pu38wm", // Template ID
      templateParams
    )
    .then(function (response) {
      console.log("✅ Email enviado exitosamente:", response);

      // Mostrar mensaje de éxito
      alert("¡Mensaje enviado con éxito! Te responderemos pronto.");

      // Limpiar el formulario
      document.querySelector(".contact-form").reset();

      // Resetear reCAPTCHA
      grecaptcha.reset();
    })
    .catch(function (error) {
      console.error("❌ Error detallado al enviar email:", error);
      console.error("Código de error:", error.status);
      console.error("Texto de error:", error.text);

      let errorMessage = "Hubo un error al enviar el mensaje. ";

      if (error.status === 400) {
        errorMessage +=
          "Error de configuración. Verifica tu Service ID y Template ID.";
      } else if (error.status === 401) {
        errorMessage += "Error de autenticación. Verifica tu Public Key.";
      } else if (error.status === 403) {
        errorMessage +=
          "Acceso denegado. Verifica tu configuración de EmailJS.";
      } else {
        errorMessage += "Por favor, intenta nuevamente.";
      }

      alert(errorMessage);
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
