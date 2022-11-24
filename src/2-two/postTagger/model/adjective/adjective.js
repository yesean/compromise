export default [
  // all fell apart
  { match: '[(all|both)] #Determiner #Noun', group: 0, tag: 'Noun', reason: 'all-noun' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'is-filled' },
  // smoked poutine is
  { match: '[#PastTense] #Singular is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // baked onions are
  { match: '[#PastTense] #Plural are', group: 0, tag: 'Adjective', reason: 'baked-onions' },
  // well made
  { match: 'well [#PastTense]', group: 0, tag: 'Adjective', reason: 'well-made' },
  // is f*ed up
  { match: '#Copula [fucked up?]', group: 0, tag: 'Adjective', reason: 'swears-adjective' },
  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },
  // jury is out - preposition ➔ adjective
  { match: '#Copula #Adjective? [(out|in|through)]$', group: 0, tag: 'Adjective', reason: 'still-out' },
  // shut the door
  { match: '^[#Adjective] (the|your) #Noun', group: 0, notIf: '(all|even)', tag: 'Infinitive', reason: 'shut-the' },
  // the said card
  { match: 'the [said] #Noun', group: 0, tag: 'Adjective', reason: 'the-said-card' },
  // a myth that uncovered wounds heal
  // {
  //   match: '#Noun (that|which|whose) [#PastTense] #Noun',
  //   ifNo: '#Copula',
  //   group: 0,
  //   tag: 'Adjective',
  //   reason: 'that-past-noun',
  // },

  // faith-based, much-appreciated
  { match: '#Hyphenated [(#Hyphenated && #PastTense)]', group: 0, tag: 'Adjective', reason: 'faith-based' },
  //self-driving
  { match: '#Hyphenated [(#Hyphenated && #Gerund)]', group: 0, tag: 'Adjective', reason: 'self-driving' },
  //two-fold
  { match: '(#Hyphenated && #Value) fold', tag: 'Adjective', reason: 'two-fold' },
  //must-win
  { match: 'must (#Hyphenated && #Infinitive)', tag: 'Adjective', reason: 'must-win' },

  { match: 'too much', tag: 'Adverb Adjective', reason: 'bit-4' },
  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },

  // adjective-prefixes - 'un skilled'
  { match: '[(un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex)] #Adjective', group: 0, tag: ['Adjective', 'Prefix'], reason: 'un-skilled' },

]
