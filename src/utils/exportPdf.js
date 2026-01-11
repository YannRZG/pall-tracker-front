import html2pdf from 'html2pdf.js'

// exportPdf.js
export const exportTableToPdf = (element, fileName = 'export.pdf') => {
  if (!(element instanceof HTMLElement)) {
    console.error('Référence HTML invalide.')
    return
  }

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }

  html2pdf().set(opt).from(element).save()
}

