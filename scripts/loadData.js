function loadData() {
  fetch(
    "https://script.google.com/macros/s/AKfycbw3E7T598n28O7lJ85vslrHR4TfQbCaJ0koOw5RpMF3-m-QsIGJgSCeGFiRKOJjC_tqNg/exec?sheetName=Sheet2"
  )
    .then((response) => response.json())
    .then((data) => {
      const getColumnData = (columnIndex) =>
        data
          .slice(1)
          .map((row) => row[columnIndex])
          .filter(Boolean);

      const fillSelect = (selectId, data) => {
        const select = document.getElementById(selectId);
        data.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });
      };

      const nombres = getColumnData(0);
      const operaciones = getColumnData(1);
      const obras = getColumnData(2);
      const ubicaciones = getColumnData(3);
      const cateogorias = getColumnData(4);

      fillSelect("Obra", obras);
      fillSelect("Nombre", nombres);
      fillSelect("Categoría", cateogorias);
      fillSelect("Ubicacion", ubicaciones);

      // Evento de cambio para las selecciones de Obra y Categoría
      const obraSelect = document.getElementById("Obra");
      const categoriaSelect = document.getElementById("Categoría");

      obraSelect.addEventListener("change", updateOperaciones);

      categoriaSelect.addEventListener("change", updateOperaciones);

      function updateOperaciones() {
        const selectedObra = obraSelect.value;
        const selectedCategoria = categoriaSelect.value.split(" ")[0];
        console.log(selectedObra);
        console.log(selectedCategoria);

        // Filtrar operaciones según la obra y categoría seleccionadas
        const filteredOperaciones = operaciones.filter((operacion) =>
          operacion.startsWith(`${selectedObra} ${selectedCategoria}`)
        );
        // Limpiar el desplegable de Operación antes de agregar nuevas opciones
        const operacionSelect = document.getElementById("Operacion");
        operacionSelect.innerHTML = "<option>Elegir operación</option>";
        fillSelect("Operacion", filteredOperaciones);
      }
    })

    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function loadFormData() {
  loadData();
}
