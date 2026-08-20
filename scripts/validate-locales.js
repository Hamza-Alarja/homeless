const fs = require('fs')
const path = require('path')

function validate(folder) {
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.json'))
  let errors = []
  for (const f of files) {
    const p = path.join(folder, f)
    try {
      const txt = fs.readFileSync(p, 'utf8')
      JSON.parse(txt)
    } catch (e) {
      errors.push({ file: p, error: e.message })
    }
  }
  if (errors.length) {
    console.error('JSON_ERRORS')
    errors.forEach(e => console.error(e.file + ': ' + e.error))
    process.exit(2)
  }
  console.log('OK')
}

if (require.main === module) {
  const folder = process.argv[2] || 'public/locales'
  validate(folder)
}
