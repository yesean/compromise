const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/sentences/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// nlp.verbose(true)

let doc = nlp('they dragged on for 1 year or two ').debug()
// doc.dates().debug()
// let doc = nlp('9-5pm tuesday').debug()
// let m = doc.match('to 5pm tuesday').debug()
// console.log(m)
