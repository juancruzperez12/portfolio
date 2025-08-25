// Configuración de EmailJS
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("pORWEzBp4OPe4K78m"); // Public Key de EmailJS
    console.log("✅ EmailJS inicializado con Public Key:", "pORWEzBp4OPe4K78m");
  } else {
    console.error("❌ EmailJS no está disponible");
  }
})();

// Función para mostrar notificaciones
function showNotification(message, type = "info") {
  // Remover notificaciones existentes
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Crear nueva notificación
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Agregar al DOM
  document.body.appendChild(notification);

  // Mostrar con animación
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Ocultar automáticamente después de 4 segundos
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Variable global para almacenar el estado del reCAPTCHA del formulario
let formRecaptchaVerified = false;

// Función para verificar reCAPTCHA del formulario
function verifyRecaptcha() {
  if (!formRecaptchaVerified) {
    showNotification(
      "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
      "error"
    );
    return false;
  }
  return true;
}

// Callback para cuando se completa el reCAPTCHA del formulario
function onFormRecaptchaSuccess() {
  formRecaptchaVerified = true;
  console.log("✅ reCAPTCHA del formulario verificado");
  console.log(
    "Response del formulario:",
    grecaptcha.getResponse("form-recaptcha")
  );
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
    recaptcha_response: grecaptcha.getResponse("form-recaptcha"),
  };

  console.log("=== DIAGNÓSTICO EMAILJS ===");
  console.log("Template Params:", templateParams);
  console.log("Service ID:", "service_0hddnc8");
  console.log("Template ID:", "template_6pu38wm");
  console.log("Public Key:", "pORWEzBp4OPe4K78m");
  console.log("EmailJS disponible:", typeof emailjs !== "undefined");
  console.log("reCAPTCHA response:", grecaptcha.getResponse("form-recaptcha"));

  console.log("🚀 Intentando enviar email...");

  // Verificar que EmailJS esté disponible
  if (typeof emailjs === "undefined") {
    showNotification(
      "Error: EmailJS no está disponible. Recarga la página.",
      "error"
    );
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    return;
  }

  // Crear una promesa con timeout
  const emailPromise = emailjs.send(
    "service_0hddnc8", // Service ID
    "template_6pu38wm", // Template ID
    templateParams
  );

  // Agregar timeout de 30 segundos
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Timeout: La solicitud tardó demasiado")),
      30000
    );
  });

  // Ejecutar con timeout
  Promise.race([emailPromise, timeoutPromise])
    .then(function (response) {
      console.log("✅ Email enviado exitosamente:", response);

      // Mostrar mensaje de éxito
      showNotification(
        "¡Mensaje enviado con éxito! Te responderé pronto.",
        "success"
      );

      // Limpiar el formulario
      document.querySelector(".contact-form").reset();

      // Resetear reCAPTCHA y variable de estado
      grecaptcha.reset("form-recaptcha");
      formRecaptchaVerified = false;
    })
    .catch(function (error) {
      console.error("❌ Error detallado al enviar email:", error);
      console.error("Tipo de error:", typeof error);
      console.error("Mensaje de error:", error.message);
      console.error("Stack trace:", error.stack);

      let errorMessage = "Hubo un error al enviar el mensaje. ";

      if (error.message && error.message.includes("Timeout")) {
        errorMessage +=
          "La solicitud tardó demasiado. Verifica tu conexión a internet.";
      } else if (error.status === 400) {
        errorMessage +=
          "Error de configuración. Verifica tu Service ID y Template ID.";
      } else if (error.status === 401) {
        errorMessage += "Error de autenticación. Verifica tu Public Key.";
      } else if (error.status === 403) {
        errorMessage +=
          "Acceso denegado. Verifica tu configuración de EmailJS.";
      } else if (error.status === 429) {
        errorMessage +=
          "Demasiadas solicitudes. Intenta nuevamente en unos minutos.";
      } else {
        errorMessage += "Error desconocido. Por favor, intenta nuevamente.";
      }

      showNotification(errorMessage, "error");
    })
    .finally(function () {
      // Restaurar el botón
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Resetear variable de estado en caso de error
      if (!formRecaptchaVerified) {
        grecaptcha.reset("form-recaptcha");
      }
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
    showNotification("Por favor, ingresa tu nombre.", "error");
    return false;
  }

  if (!mail) {
    showNotification("Por favor, ingresa tu email.", "error");
    return false;
  }

  if (!validateEmail(mail)) {
    showNotification("Por favor, ingresa un email válido.", "error");
    return false;
  }

  if (!asunto) {
    showNotification("Por favor, ingresa un asunto.", "error");
    return false;
  }

  if (!mensaje) {
    showNotification("Por favor, ingresa un mensaje.", "error");
    return false;
  }

  return true;
}
