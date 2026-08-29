/**
 * GOOGLE APPS SCRIPT — RSVP MELISSA & RODRIGO
 *
 * Antes de desplegar:
 * 1. Abre la hoja de Google Sheets donde quieres guardar las respuestas.
 * 2. Extensiones > Apps Script.
 * 3. Borra el contenido que aparezca y pega este código.
 * 4. Guarda el proyecto.
 *
 * El formulario enviará:
 * Fecha y hora | Nombre | Email | Personas | Asistencia | Restricción alimentaria
 */

const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('No existe una pestaña llamada "' + SHEET_NAME + '".');
    }

    const name = (e.parameter.name || '').trim();
    const email = (e.parameter.email || '').trim();
    const guests = (e.parameter.guests || e.parameter.numero_personas || '').trim();
    const numberOfPeople = (e.parameter.numero_personas || e.parameter.guests || '').trim();
    const attendance = (e.parameter.attendance || '').trim();
    const diet = (e.parameter.diet || '').trim();

    if (!name || !email || !guests || !attendance) {
      throw new Error('Faltan datos obligatorios.');
    }

    const headers = sheet.getRange(1, 1, 1, Math.max(7, sheet.getLastColumn())).getValues()[0] || [];
    const hasNumberHeader = headers.some(function (value) {
      return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '').includes('numerodepersonas');
    });

    if (!hasNumberHeader) {
      sheet.getRange(1, Math.max(sheet.getLastColumn(), 6) + 1).setValue('Número de personas');
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      guests,
      attendance,
      diet,
      numberOfPeople
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP recibido'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('RSVP de Melissa & Rodrigo activo.')
    .setMimeType(ContentService.MimeType.TEXT);
}
