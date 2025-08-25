// Funciones para manejar el email con reCAPTCHA

function showEmailRecaptcha() {
  const emailButton = document.querySelector(".email-button");
  const recaptchaContainer = document.getElementById(
    "email-recaptcha-container"
  );
  const emailDisplay = document.getElementById("email-display");

  // Ocultar el botón y mostrar el reCAPTCHA
  emailButton.style.display = "none";
  recaptchaContainer.style.display = "flex";
  emailDisplay.style.display = "none";
}

function verifyEmailRecaptcha() {
  // Esta función se ejecuta automáticamente cuando el reCAPTCHA se completa
  showEmail();
}

function showEmail() {
  const emailButton = document.querySelector(".email-button");
  const recaptchaContainer = document.getElementById(
    "email-recaptcha-container"
  );
  const emailDisplay = document.getElementById("email-display");

  // Ocultar el reCAPTCHA y mostrar el email
  emailButton.style.display = "flex";
  recaptchaContainer.style.display = "none";
  emailDisplay.style.display = "flex";

  showNotification("Email mostrado correctamente", "success");
}

function copyEmail() {
  const emailText = "perezjuancruzok@gmail.com";

  // Usar la API moderna del portapapeles si está disponible
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(emailText)
      .then(() => {
        showNotification("Email copiado al portapapeles", "success");
      })
      .catch(() => {
        // Fallback para navegadores más antiguos
        fallbackCopyEmail(emailText);
      });
  } else {
    // Fallback para navegadores más antiguos
    fallbackCopyEmail(emailText);
  }
}

function fallbackCopyEmail(emailText) {
  // Crear un elemento temporal para copiar
  const textArea = document.createElement("textarea");
  textArea.value = emailText;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showNotification("Email copiado al portapapeles", "success");
  } catch (err) {
    showNotification("Error al copiar el email", "error");
  }

  document.body.removeChild(textArea);
}

// Función de notificación (reutilizada del contact.js)
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}
