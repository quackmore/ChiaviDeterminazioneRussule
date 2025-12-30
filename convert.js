const fs = require('fs');
const path = require('path');

function isNumber(value) {
    // Verifica se il valore è una stringa e se può essere convertito in un numero finito
    return typeof value === 'string' && !isNaN(value) && !isNaN(parseFloat(value));
}

// Funzione per generare l'HTML
function generateHtmlFromKeys(keys, cat) {
    const htmlSections = {};

    keys.forEach(key => {
        const keyNumber = key.split(' ')[0];
        const groupNumber = keyNumber.slice(0, -1);

        if (!htmlSections[groupNumber]) {
            htmlSections[groupNumber] = {
                title: `Chiavi ${groupNumber}`,
                rows: []
            };
        }

        const descriptionResult = key.slice(keyNumber.length).trim();
        const [description, result] = descriptionResult.split('->').map(part => part.trim());

        let resultFormatted;
        // if (result.startsWith('R.')) {
        //     resultFormatted = `<strong><em>${result}</em></strong>`;
        // } else {
        //     resultFormatted = `<a href="#k-${result}a">${result}</a>`;
        // }

        if (isNumber(result)) {
            resultFormatted = `<a href="#k-${result}a">${result}</a>`;
        } else {
            resultFormatted = `<strong><em>${result}</em></strong>`;
        }

        htmlSections[groupNumber].rows.push(
            `<tr id="k-${keyNumber}"><td class="col-code">${keyNumber}</td>` +
            `<td class="col-text">${description}</td>` +
            `<td class="col-result">${resultFormatted}</td></tr>`
        );
    });

    let htmlContent = `
<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="UTF-8">
  <title>Chiavi per ${cat}</title>
  <link href="style.css" rel="stylesheet">
</head>

<body>
  <a id="top"></a>
`;

    for (const [groupNumber, section] of Object.entries(htmlSections)) {
        htmlContent += `
  <section id="group-${groupNumber}">
    <table class="keys">
      ${section.rows.join('\n      ')}
    </table>
    <a class="top-link" href="#top">torna su</a>
  </section>
`;
    }

    htmlContent += `
</body>
</html>
`;
    return htmlContent;
}

// Leggi il file di input
const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Errore: specificare il nome del file di input.');
    process.exit(1);
}

// Genera il nome del file di output
const outputFile = path.join(
    path.dirname(inputFile),
    path.basename(inputFile, path.extname(inputFile)) + '.html'
);

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Errore nella lettura del file: ${err.message}`);
        process.exit(1);
    }

    const keys = data.split('\n').filter(line => line.trim() !== '');
    const htmlOutput = generateHtmlFromKeys(keys, path.basename(inputFile, path.extname(inputFile)));

    // Salva il file HTML
    fs.writeFile(outputFile, htmlOutput, (err) => {
        if (err) {
            console.error(`Errore nel salvataggio del file: ${err.message}`);
            process.exit(1);
        }
        console.log(`File HTML generato con successo: ${outputFile}`);
    });
});
