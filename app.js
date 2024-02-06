window.onload = () => {
  fetch(
    "https://script.google.com/macros/s/AKfycbw3E7T598n28O7lJ85vslrHR4TfQbCaJ0koOw5RpMF3-m-QsIGJgSCeGFiRKOJjC_tqNg/exec?sheetName=Sheet2"
  )
    .then((response) => response.json())
    .then((data) => {
      // Obtener la lista de nombres y operaciones
      const nombres = data.slice(1).map((row) => row[0]).filter(Boolean); // Filtrar valores vacíos
      const operaciones = data.slice(1).map((row) => row[1]).filter(Boolean);
      const obras = data.slice(1).map((row) => row[2]).filter(Boolean);
      const ubicaciones = data.slice(1).map((row) => row[3]).filter(Boolean);
      const cateogorias = data.slice(1).map((row) => row[4]).filter(Boolean);

      // Llenar el campo de selección de nombres
      const selectNombre = document.getElementById("Nombre");
      nombres.forEach((nombre) => {
        const option = document.createElement("option");
        option.value = nombre;
        option.textContent = nombre;
        selectNombre.appendChild(option);
      });

      // Llenar el campo de selección de operaciones
      const selectOperacion = document.getElementById("Operacion");
      operaciones.forEach((operacion) => {
        const option = document.createElement("option");
        option.value = operacion;
        option.textContent = operacion;
        selectOperacion.appendChild(option);
      });

      // Llenar el campo de selección de obras
      const selectObra = document.getElementById("Obra");
      obras.forEach((obra) => {
        const option = document.createElement("option");
        option.value = obra;
        option.textContent = obra;
        selectObra.appendChild(option);
      });

      // Llenar el campo de selección de ubicaciones
      const selectUbicacion = document.getElementById("Ubicacion");
      ubicaciones.forEach((ubicacion) => {
        const option = document.createElement("option");
        option.value = ubicacion;
        option.textContent = ubicacion;
        selectUbicacion.appendChild(option);
      });

      // Llenar el campo de selección de categorias
      const selectCategoria = document.getElementById("Categoría");
      cateogorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
      });
      
    })
    .catch((error) => {
      console.error("Error fetching names and operations:", error);
    });

  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    document.getElementById("message").textContent = "Enviando..";
    document.getElementById("message").style.display = "block";

    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    // Send a POST request to your Google Apps Script
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
        // Check if the request was successful
        if (response) {
          return response; // Assuming your script returns JSON response
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
    .then(function (data) {
        // Display a success message
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
        // Handle errors, you can display an error message here
        console.error(error);
        document.getElementById("message").textContent =
          "An error occurred while submitting the form.";
        document.getElementById("message").style.display = "block";
      });
  });

  document.getElementById("resetFormButton").addEventListener("click", function () {
    document.getElementById("form").reset(); // Resetea todo el formulario
  });

};
