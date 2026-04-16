// script-improved.js

// Function to validate CNPJ
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if (cnpj.length !== 14) return false; // CNPJ must be 14 digits

    // Validate CNPJ with checksum
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
        sum += cnpj.charAt(i) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    let remainder = sum % 11;
    let firstCheck = remainder < 2 ? 0 : 11 - remainder;
    if (firstCheck !== Number(cnpj.charAt(12))) return false;

    // Validate second checksum digit
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
        sum += cnpj.charAt(i) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    remainder = sum % 11;
    let secondCheck = remainder < 2 ? 0 : 11 - remainder;
    return secondCheck === Number(cnpj.charAt(13));
}

// Function to parse SPED data
function parseSPED(data) {
    try {
        // Assume data is in CSV format for this example
        const rows = data.split('\n');
        const parsedData = [];
        for (const row of rows) {
            const columns = row.split(';');
            // Improve parsing here based on the expected data structure
            parsedData.push({
                column1: columns[0],
                column2: columns[1],
                // Add more columns as needed
            });
        }
        return parsedData;
    } catch (error) {
        console.error('Error while parsing SPED data:', error.message);
        throw new Error('Parsing error: ' + error.message);
    }
}

// Function that utilizes the validation and parsing
function processCNPJAndSPED(cnpj, spedData) {
    try {
        if (!validateCNPJ(cnpj)) {
            throw new Error('Invalid CNPJ: ' + cnpj);
        }
        const parsedData = parseSPED(spedData);
        console.log('Parsed SPED Data:', parsedData);
    } catch (error) {
        console.error('Error processing CNPJ and SPED:', error.message);
    }
}