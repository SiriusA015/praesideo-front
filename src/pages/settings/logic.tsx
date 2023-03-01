import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

const RATE = 2.83464566929;

// A3 297mm x 419mm
const PAGE_WIDTH = 419 * RATE;
const PAGE_HEIGHT = 297 * RATE;

// TODO: 
const CONTENT_WIDTH = 300 * RATE;
const CONTENT_HEIGHT = 297 * RATE;
const PAGE_MARGINS: [number, number] = [0 * RATE, 0 * RATE];

/* for type-script
interface PdfProps {
  dataUrl: string;
  pageSize?: {
    width: number;
    height: number;
  };
  pageOrientation?: string;
  contentSize?: {
    width: number;
    height: number;
  };
  pageMargins?: [number, number];
}
*/

/**
 * @param {HTMLElement} element
 */
export async function createPdfFromHtml(element: HTMLElement, name:string) {
  const pdfProps = await createPdfProps(element);
  createPdf(pdfProps, name);
}

/**
 * @param {HTMLElement} element
 * @returns {Promise<PdfProps>}
 */
async function createPdfProps(element: HTMLElement) {
  const options = {
    scale: 1
  };
  const canvas = await html2canvas(element, options);

  const dataUrl = canvas.toDataURL();

  const pdfProps = {
    dataUrl,
    pageSize: 'A4',
    pageOrientation: "landscape",
    // contentSize: {
    //   fit: [CONTENT_WIDTH, CONTENT_HEIGHT]
    // },
    pageMargins: [ 20, 60, 20, 60 ],
  };

  return pdfProps;
}

/**
 * @param {PdfProps} pdfProps
 */
function createPdf(pdfProps: { dataUrl?: any; pageSize?: any; pageOrientation?: any; contentSize?: any; pageMargins?: any; }, name: string) {
  const { dataUrl, contentSize, pageMargins } = pdfProps;
  const pageSize = pdfProps.pageSize;
  const pageOrientation = pdfProps.pageOrientation;

  const documentDefinitions = {
    pageSize,
    pageOrientation,
    content: {
      image: dataUrl
    },
    pageMargins
  };

  pdfMake.createPdf(documentDefinitions).download(name);
}
