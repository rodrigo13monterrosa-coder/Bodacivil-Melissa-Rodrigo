INVITACIÓN MELISSA & RODRIGO
===========================

ARCHIVOS
- index.html: invitación
- script.js: cuenta atrás + formulario RSVP
- google-apps-script.gs: conexión con Google Sheets
- style.css: reservado para separar el CSS más adelante

CONFIGURACIÓN RSVP
1. Crea una hoja de Google Sheets.
2. Ponle una pestaña llamada RSVP.
3. En la primera fila puedes poner:
   Fecha y hora | Nombre | Email | Asistencia | Restricción alimentaria
4. Extensiones > Apps Script.
5. Copia google-apps-script.gs al editor y guarda.
6. Implementar > Nueva implementación > Aplicación web.
7. Ejecutar como: tú.
8. Quién tiene acceso: Cualquiera.
9. Copia la URL de la aplicación web.
10. Abre script.js y sustituye:
   PEGAR_AQUI_LA_URL_DE_TU_WEB_APP
   por esa URL.
11. Guarda y abre index.html con Live Server.

IMPORTANTE
Si haces cambios en Google Apps Script después de desplegarlo, crea una nueva versión de la implementación o actualiza la implementación existente para que los cambios queden publicados.
