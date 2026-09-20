const fs = require('fs')
const path = require('path')

const header = '%PDF-1.3\n'

const objects = [
  '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
  '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
  '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
]

const rawContent =
  'BT /F1 24 Tf 72 720 Td (Meghaa Sunil - Resume placeholder) Tj ET\n' +
  'BT /F1 12 Tf 72 686 Td (Replace your resume by overwriting public/resume.pdf) Tj ET\n' +
  'BT /F1 12 Tf 72 672 Td (or update resumeUrl in src/data/profile.js) Tj ET\n'

const stream = '4 0 obj\n<< /Length ' + Buffer.byteLength(rawContent, 'latin1') + ' >>\nstream\n' + rawContent + 'endstream\nendobj\n'
const font = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'

const allParts = [header, ...objects, stream, font]
let offset = 0
const offsets = []
allParts.forEach((part, i) => {
  if (i === 0) {
    offsets.push(0)
  } else {
    offsets.push(offset)
  }
  offset += Buffer.byteLength(part, 'latin1')
})

let xref = 'xref\n0 6\n0000000000 65535 f \n'
offsets.forEach((off) => {
  xref += String(off).padStart(10, '0') + ' 00000 n \n'
})
const trailer =
  'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + offset + '\n%%EOF\n'

const pdf = allParts.join('') + xref + trailer
const out = path.resolve(__dirname, '..', 'public', 'resume.pdf')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, pdf, 'latin1')
console.log('Wrote placeholder PDF:', out)