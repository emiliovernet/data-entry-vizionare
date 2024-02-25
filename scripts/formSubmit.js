// Variable para almacenar los datos enviados previamente
let previousFormData = new FormData();

// Función para comparar dos conjuntos de FormData y verificar si son iguales
function areFormDataEqual(formData1, formData2) {
  const entries1 = Array.from(formData1.entries());
  const entries2 = Array.from(formData2.entries());

  return JSON.stringify(entries1) === JSON.stringify(entries2);
}

// Función para mostrar un mensaje de error con el color especificado
function showErrorMessage(message, color) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.display = "block";
  messageElement.style.backgroundColor = color;
  messageElement.style.color = "white";

  setTimeout(function () {
    messageElement.textContent = "";
    messageElement.style.display = "none";
    messageElement.style.backgroundColor = "beige";
    messageElement.style.color = "green";
  }, 2000);
}

function setupFormSubmit() {
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener el formulario actual
    const currentFormData = new FormData(this);

    // Verificar si los nuevos datos son iguales a los anteriores
    if (areFormDataEqual(currentFormData, previousFormData)) {
      // Mostrar mensaje de datos duplicados en rojo
      showErrorMessage("Datos duplicados", "red");
      return;
    }

    document.getElementById("message").textContent = "Enviando..";
    document.getElementById("message").style.display = "block";

    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    fetch(
      "https://script.google.com/macros/s/AKfycbw3E7T598n28O7lJ85vslrHR4TfQbCaJ0koOw5RpMF3-m-QsIGJgSCeGFiRKOJjC_tqNg/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    )
      .then(function (response) {
        if (response) {
          return response;
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        document.getElementById("message").textContent =
          "Envío de datos exitoso";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.backgroundColor = "green";
        document.getElementById("message").style.color = "beige";

        setTimeout(function () {
          document.getElementById("message").textContent = "";
          document.getElementById("message").style.display = "none";
          document.getElementById("message").style.backgroundColor = "beige";
          document.getElementById("message").style.color = "green";
        }, 2000);
      })
      .catch(function (error) {
        console.error(error);
        document.getElementById("message").textContent =
          "An error occurred while submitting the form.";
        document.getElementById("message").style.display = "block";
      });

    // Al finalizar el envío, actualizar los datos previos
    previousFormData = currentFormData;
  });
}

document.getElementById("resetFormButton")
  .addEventListener("click", function () {
    document.getElementById("form").reset(); // Resetea todo el formulario
  });
