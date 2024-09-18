## Extractor de Datos para Declaraciones Juradas Formulario 5220 IIBB CABA

**Descripción:**

Este script de Node.js está diseñado para automatizar la extracción de datos relevantes de los formularios 5220 de la Ciudad de Buenos Aires. Lee un directorio de archivos PDF, extrae datos clave como CUIT, períodos impositivos y valores de impuestos, y genera archivos JSON con la información estructurada.

**Funcionalidades:**

* **Procesamiento de PDF:** Lee archivos PDF del formulario 5220.
* **Extracción de datos:** Utiliza expresiones regulares para identificar y extraer datos clave.
* **Generación de JSON:** Crea archivos JSON con los datos extraídos en un formato estructurado.
* **Flexibilidad:** Puede adaptarse a diferentes formatos de formulario 5220 ajustando las expresiones regulares.

**Cómo usar:**

1. **Instalar dependencias:**
   ```bash
   npm install pdf-parse fs
   
2. Colocar los archivos PDF: Guarda los formularios 5220 en la carpeta ./pdfs
3. Ejecutar el script:
   ```bash
   node index.js
4. Verificar resultados: Los archivos JSON con los datos extraídos se guardarán en la misma carpeta que los PDFs.

Consideraciones:

Formato del PDF: El script asume un formato específico del formulario 5220. Cambios en el formato podrían requerir ajustes en las expresiones regulares.
Exactitud de los datos: La precisión de los datos extraídos depende de la calidad del PDF y de las expresiones regulares utilizadas.
Rendimiento: Para grandes cantidades de archivos, considera optimizar el código y utilizar técnicas de procesamiento en paralelo.
