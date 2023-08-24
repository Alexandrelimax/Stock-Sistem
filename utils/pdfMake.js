import PdfPrinter from "pdfmake";
import { formatData } from "./dateFormat.js";


export function createPdf(list) {

    const date = formatData()
    const tableBody = [];

    const tableHeader = ['#', 'NOME', 'PREÇO', 'CATEGORIA', 'FORNECEDOR', 'QUANTIDADE']
    tableBody.push(tableHeader)

    let index = 1
    list.forEach(data => {
        const array = [];
        const { name, price, category, supplier, quantity } = data

        array.push(index, name, `R$${price}`, category, supplier, quantity)
        index++
        tableBody.push(array)
    })




    const documentDefinition = {
        content: [
            {
                text: 'Relatório de Produtos',
                alignment: 'center',
                fontSize: 25,
                margin: [0, 0, 0, 20],
            },
            {
                text: date,
                alignment: 'center',
                margin: [0, 0, 0, 20],
            },
            {
                table: {
                    widths: [50, 'auto', 'auto', 'auto', 'auto', 'auto'],
                    headerRows: 1,
                    body: tableBody,
                    

                },
                layout: {
                    defaultBorder: true,
                    paddingLeft: () => 20,  // Margem esquerda
                    paddingRight: () => 10, // Margem direita
                },
                alignment: 'center',
                fontSize:10,
                

            },
            {
                text: 'Rio de Janeiro, Brasil.\n© 2023 Empresa blá.',
                fontSize:15,
                alignment: 'center',
                margin: [0, 20, 0, 0],
            },
        ],
        defaultStyle: {
            font: 'Helvetica',

        }
    };

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
    };
    const printer = new PdfPrinter(fonts);
    const document = printer.createPdfKitDocument(documentDefinition);

    const chunks = [];
    document.on('data', (chunk) => {
        chunks.push(chunk);
    });

    return new Promise((resolve, reject) => {
        document.on('end', () => {
            const result = Buffer.concat(chunks);
            resolve(result);
        });

        document.on('error', (error) => {
            reject(error);
        });

        document.end();
    });
}



