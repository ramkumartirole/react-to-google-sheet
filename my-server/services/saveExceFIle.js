require('dotenv').config();
const { google } = require('googleapis');
const credentials = {
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  Universe_Domainomain:process.env.Universe_Domain
};
const SHEET_ID =process.env.Sheet_ID;

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const exportToGoogleSheet = async (user, carData) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const sheetName = 'Sheet1';

    const createdAt = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Step 1: Check if sheet is empty (to add header only once)
    const getData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A1:D1`,
    });

    const hasHeader = getData.data.values && getData.data.values.length > 0;

    if (!hasHeader) {
      // Set header row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${sheetName}!A1:D1`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [
            ['User Name', 'Email', 'Car Selected', 'Order Date']
          ],
        },
      });

      // Apply bold + background formatting to header
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0, // usually Sheet1 is ID 0
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 4,
                },
                cell: {
                  userEnteredFormat: {
                    textFormat: { bold: true },
                    backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            },
          ],
        },
      });
    }

    // Step 2: Append new data
    const values = [[
      user.firstName || user.name || '',
      user.email || '',
      carData,
      createdAt,
    ]];

    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A:D`,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    // Step 3: Get appended row number to format it
    const updatedRange = appendResponse.data.updates.updatedRange; // e.g., Sheet1!A2:D2
    const rowMatch = updatedRange.match(/!(?:[A-Z]+)(\d+):/);
    const rowNumber = rowMatch ? parseInt(rowMatch[1], 10) : null;

    if (rowNumber) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        resource: {
          requests: [
            {
              updateBorders: {
                range: {
                  sheetId: 0,
                  startRowIndex: rowNumber - 1,
                  endRowIndex: rowNumber,
                  startColumnIndex: 0,
                  endColumnIndex: 4,
                },
                bottom: {
                  style: 'SOLID',
                  width: 1,
                  color: { red: 0.4, green: 0.4, blue: 0.4 },
                },
              },
            },
          ],
        },
      });
    }

    return true;
  } catch (error) {
    console.error('❌ Error writing to Google Sheet:', error.message);
    throw error;
  }
};

module.exports = exportToGoogleSheet;
