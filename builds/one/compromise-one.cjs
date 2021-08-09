!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).nlp=e()}(this,(function(){"use strict";const t=/[/:]/g,e=function(e){if(r=e,"[object Array]"===Object.prototype.toString.call(r))return e;var r;let[,n,o,s]=e.split(t);return n=void 0===n?null:parseInt(n,10),o=void 0===o?null:parseInt(o,10),s=void 0===s||"-"===s?null:parseInt(s,10),(isNaN(n)||isNaN(o)||isNaN(s))&&console.warn(`invalid pointer: '${e}'`),[n,o,s]},r=/ /,n=function(t,e,r,n){if(!0===t.tags.has(e))return null;let o=r[e];if(o){if(o.not&&o.not.length>0)for(let e=0;e<o.not.length;e+=1){if(!0===n&&t.tags.has(o.not[e]))return null;t.tags.delete(o.not[e])}if(o.parents&&o.parents.length>0)for(let e=0;e<o.parents.length;e+=1)t.tags.add(o.parents[e])}return t.tags.add(e),!0},o=function(t,e,s={},i){var u;if(!0!=(u=e,"[object Array]"===Object.prototype.toString.call(u)))if(e=e.trim(),r.test(e))!function(t,e,o,s){let i=e.split(r);t.forEach((t,e)=>{let r=i[e];r&&"."!==r&&(r=r.replace(/^#/,""),n(t,r,o,s))})}(t,e,s,i);else{e=e.replace(/^#/,"");for(let r=0;r<t.length;r+=1)n(t[r],e,s,i)}else e.forEach(e=>o(t,e,s,i))},s=function(t,e){for(let r of e)if(t.has(r))return!0;return!1},i=function(t,e){for(let r=0;r<t.length;r+=1){let n=t[r];if(!0!==n.optional&&!0!==n.negation){if(void 0!==n.word&&!1===e.has(n.word))return!0;if(void 0!==n.tag&&!1===e.has("#"+n.tag))return!0;if(n.fastOr&&!1===s(n.fastOr,e))return!1}}return!1},u=function(t,e,r=3){if(t===e)return 1;if(t.length<r||e.length<r)return 0;const n=function(t,e){let r=t.length,n=e.length;if(0===r)return n;if(0===n)return r;let o=(n>r?n:r)+1;if(Math.abs(r-n)>(o||100))return o||100;let s,i,u,l,a,c,h=[];for(let t=0;t<o;t++)h[t]=[t],h[t].length=o;for(let t=0;t<o;t++)h[0][t]=t;for(let o=1;o<=r;++o)for(i=t[o-1],s=1;s<=n;++s){if(o===s&&h[o][s]>4)return r;u=e[s-1],l=i===u?0:1,a=h[o-1][s]+1,(c=h[o][s-1]+1)<a&&(a=c),(c=h[o-1][s-1]+l)<a&&(a=c);let n=o>1&&s>1&&i===e[s-2]&&t[o-2]===u&&(c=h[o-2][s-2]+l)<a;h[o][s]=n?c:a}return h[r][n]}(t,e);let o=Math.max(t.length,e.length);return 1-(0===o?0:n/o)},l=/(\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)/,a=/(\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E)/;let c={};const h=function(t,e){return-1!==t.post.indexOf(e)},f=function(t,e){return-1!==t.pre.indexOf(e)};c.hasQuote=function(t){return l.test(t.pre)||a.test(t.post)},c.hasQuotation=c.hasQuote,c.hasComma=function(t){return h(t,",")},c.hasPeriod=function(t){return!0===h(t,".")&&!1===h(t,"...")},c.hasExclamation=function(t){return h(t,"!")},c.hasQuestionMark=function(t){return h(t,"?")||h(t,"¿")},c.hasEllipses=function(t){return h(t,"..")||h(t,"…")||f(t,"..")||f(t,"…")},c.hasSemicolon=function(t){return h(t,";")},c.hasSlash=function(t){return/\//.test(t.text)},c.hasHyphen=function(t){const e=/^(-|–|—)$/;return e.test(t.post)||e.test(t.pre)},c.hasDash=function(t){const e=/ (-|–|—) /;return e.test(t.post)||e.test(t.pre)},c.hasContraction=function(t){return Boolean(t.implicit)},c.isAcronym=function(t){return t.tags.has("Acronym")},c.isKnown=function(t){return t.tags.size>0},c.isTitleCase=function(t){return/^[A-Z][a-z'\u00C0-\u00FF]/.test(t.text)};let p=function(){};p=function(t,e,r,n){let o=function(t,e,r,n){if(!0===e.anything)return!0;if(!0===e.start&&0!==r)return!1;if(!0===e.end&&r!==n-1)return!1;if(void 0!==e.word){if(null!==t.machine&&t.machine===e.word)return!0;if(void 0!==t.alias&&t.alias.hasOwnProperty(e.word))return!0;if(!0===e.soft&&e.word===t.root)return!0;if(void 0!==e.fuzzy){let r=u(e.word,t.normal);if(r>e.fuzzy)return!0;if(!0===e.soft&&(r=u(e.word,t.root),r>e.fuzzy))return!0}return!(!t.alias||!t.alias.some(t=>t===e.word))||e.word===t.text||e.word===t.normal}return void 0!==e.tag?!0===t.tags.has(e.tag):void 0!==e.method?"function"==typeof c[e.method]&&!0===c[e.method](t):void 0!==e.regex?e.regex.test(t.normal):void 0!==e.fastOr?!(!t.implicit||!0!==e.fastOr.has(t.implicit))||e.fastOr.has(t.normal)||e.fastOr.has(t.text):void 0!==e.choices&&("and"===e.operator?e.choices.every(e=>p(t,e,r,n)):e.choices.some(e=>p(t,e,r,n)))}(t,e,r,n);return!0===e.negative?!o:o};var g=p;const m=function(t,e){let r=Object.assign({},t.regs[t.r],{start:!1,end:!1}),n=t.t;for(;t.t<t.terms.length;t.t+=1){if(e&&g(t.terms[t.t],e,t.start_i+t.t,t.phrase_length))return t.t;let o=t.t-n+1;if(void 0!==r.max&&o===r.max)return t.t;if(!1===g(t.terms[t.t],r,t.start_i+t.t,t.phrase_length))return void 0!==r.min&&o<r.min?null:t.t}return t.t},d=function(t,e){let r=t.t;if(!e)return t.terms.length;for(;r<t.terms.length;r+=1)if(!0===g(t.terms[r],e,t.start_i+r,t.phrase_length))return r;return null},b=function(t,e){if(!0===t.end&&!0===t.greedy&&e.start_i+e.t<e.phrase_length-1){let r=Object.assign({},t,{end:!1});if(!0===g(e.terms[e.t],r,e.start_i+e.t,e.phrase_length))return!0}return!1},y=function(t,e=0){let r=t.regs[t.r],n=!1;for(let o=0;o<r.choices.length;o+=1){let s=r.choices[o];if(n=s.every((r,n)=>{let o=0,s=t.t+n+e+o;if(void 0===t.terms[s])return!1;let i=g(t.terms[s],r,s+t.start_i,t.phrase_length);if(!0===i&&!0===r.greedy)for(let e=1;e<t.terms.length;e+=1){let n=t.terms[s+e];if(n){if(!0!==g(n,r,t.start_i+e,t.phrase_length))break;o+=1}}return e+=o,i}),n){e+=s.length;break}}return n&&!0===r.greedy?y(t,e):e},v=function(t){let e=0;return!0===t.regs[t.r].choices.every(r=>{let n=r.every((e,r)=>{let n=t.t+r;return void 0!==t.terms[n]&&g(t.terms[n],e,n,t.phrase_length)});return!0===n&&r.length>e&&(e=r.length),n})&&e},w=function(t,e){return t.groups[t.inGroup]||(t.groups[t.inGroup]={start:e,length:0}),t.groups[t.inGroup]},E=function(t,e,r,n){if(0===t.length||0===e.length)return null;let o={t:0,terms:t,r:0,regs:e,groups:{},start_i:r,phrase_length:n,inGroup:null};for(;o.r<e.length;o.r+=1){let t=e[o.r];if(o.hasGroup=Boolean(t.group),!0===o.hasGroup?o.inGroup=t.group:o.inGroup=null,!o.terms[o.t]){if(!1===e.slice(o.r).some(t=>!t.optional))break;return null}if(!0===t.anything&&!0===t.greedy){let r=d(o,e[o.r+1]);if(null===r||0===r)return null;if(void 0!==t.min&&r-o.t<t.min)return null;if(void 0!==t.max&&r-o.t>t.max){o.t=o.t+t.max;continue}if(!0===o.hasGroup){w(o,o.t).length=r-o.t}o.t=r;continue}if(void 0!==t.choices&&"or"===t.operator){let e=y(o);if(e){if(!0===t.negative)return null;if(!0===o.hasGroup){w(o,o.t).length+=e}if(!0===t.end){let t=o.phrase_length-1;if(o.t+o.start_i!==t)return null}o.t+=e;continue}if(!t.optional)return null}if(void 0!==t.choices&&"and"===t.operator){let e=v(o);if(e){if(!0===t.negative)return null;if(!0===o.hasGroup){w(o,o.t).length+=e}if(!0===t.end){let t=o.phrase_length-1;if(o.t+o.start_i!==t)return null}o.t+=e;continue}if(!t.optional)return null}let r=o.terms[o.t],s=g(r,t,o.start_i+o.t,o.phrase_length);if(!0===t.anything||!0===s||b(t,o)){let s=o.t;if(t.optional&&e[o.r+1]&&t.negative)continue;if(t.optional&&e[o.r+1]){let n=g(r,e[o.r+1],o.start_i+o.t,o.phrase_length);if(t.negative||n){let t=o.terms[o.t+1];t&&g(t,e[o.r+1],o.start_i+o.t,o.phrase_length)||(o.r+=1)}}if(o.t+=1,!0===t.end&&o.t!==o.terms.length&&!0!==t.greedy)return null;if(!0===t.greedy){if(o.t=m(o,e[o.r+1]),null===o.t)return null;if(t.min&&t.min>o.t)return null;if(!0===t.end&&o.start_i+o.t!==n)return null}if(!0===o.hasGroup){const e=w(o,s);o.t>1&&t.greedy?e.length+=o.t-s:e.length++}}else{if(t.negative){let e=Object.assign({},t);if(e.negative=!1,!0===g(o.terms[o.t],e,o.start_i+o.t,o.phrase_length))return null}if(!0!==t.optional){if(Boolean(o.terms[o.t].implicit)&&e[o.r-1]&&o.terms[o.t+1]){if(o.terms[o.t-1]&&o.terms[o.t-1].implicit===e[o.r-1].word)return null;if(g(o.terms[o.t+1],t,o.start_i+o.t,o.phrase_length)){o.t+=2;continue}}return null}}}let s=[null,r,o.t+r];if(s[1]===s[2])return null;let i={};return Object.keys(o.groups).forEach(t=>{let e=o.groups[t],n=r+e.start;i[t]=[null,n,n+e.length]}),{pointer:s,groups:i}},x=function(t,e){return t.pointer[0]=e,Object.keys(t.groups).forEach(r=>{t.groups[r][0]=e}),t},j=function(t,e,r){let n=E(t,e,0,t.length);return n?(n=x(n,r),n):null},O=/(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/,z=/([![^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/,_=/ /g,k=t=>/^[![^]*(<[^<]*>)?\//.test(t)&&/\/[?\]+*$~]*$/.test(t),S=function(t){return t=(t=t.map(t=>t.trim())).filter(t=>t)},$=/\{([0-9]+,?[0-9]*)\}/,F=/&&/,C=new RegExp(/^<\s*?(\S+)\s*?>/),A=function(t){return t[t.length-1]},q=function(t){return t[0]},P=function(t){return t.substr(1)},D=function(t){return t.substr(0,t.length-1)},B=function(t){return t=P(t),t=D(t)},G=function(t){let e={};for(let r=0;r<2;r+=1){if("$"===A(t)&&(e.end=!0,t=D(t)),"^"===q(t)&&(e.start=!0,t=P(t)),("["===q(t)||"]"===A(t))&&(e.group=null,"["===q(t)&&(e.groupStart=!0),"]"===A(t)&&(e.groupEnd=!0),t=(t=t.replace(/^\[/,"")).replace(/\]$/,""),"<"===q(t))){const r=C.exec(t);r.length>=2&&(e.group=r[1],t=t.replace(r[0],""))}if("+"===A(t)&&(e.greedy=!0,t=D(t)),"*"!==t&&"*"===A(t)&&"\\*"!==t&&(e.greedy=!0,t=D(t)),"?"===A(t)&&(e.optional=!0,t=D(t)),"!"===q(t)&&(e.negative=!0,t=P(t)),"("===q(t)&&")"===A(t)){F.test(t)?(e.choices=t.split(F),e.operator="and"):(e.choices=t.split("|"),e.operator="or"),e.choices[0]=P(e.choices[0]);let r=e.choices.length-1;e.choices[r]=D(e.choices[r]),e.choices=e.choices.map(t=>t.trim()),e.choices=e.choices.filter(t=>t),e.choices=e.choices.map(t=>t.split(/ /g).map(G)),t=""}if("/"===q(t)&&"/"===A(t))return t=B(t),e.regex=new RegExp(t),e;if("~"===q(t)&&"~"===A(t))return t=B(t),e.soft=!0,e.word=t,e}return!0===$.test(t)&&(t=t.replace($,(t,r)=>{let n=r.split(/,/g);return 1===n.length?(e.min=Number(n[0]),e.max=Number(n[0])):(e.min=Number(n[0]),e.max=Number(n[1]||999)),e.greedy=!0,e.optional=!0,""})),"#"===q(t)?(e.tag=P(t),e.tag=(r=e.tag).charAt(0).toUpperCase()+r.substr(1),e):"@"===q(t)?(e.method=P(t),e):"."===t?(e.anything=!0,e):"*"===t?(e.anything=!0,e.greedy=!0,e.optional=!0,e):(t&&(t=(t=t.replace("\\*","*")).replace("\\.","."),e.word=t.toLowerCase()),e);var r},L=function(t,e={}){return t=function(t){let e=0,r=null;for(let n=0;n<t.length;n++){const o=t[n];!0===o.groupStart&&(r=o.group,null===r&&(r=String(e),e+=1)),null!==r&&(o.group=r),!0===o.groupEnd&&(r=null)}return t}(t),e.fuzzy||(t=t.map(t=>{if(void 0!==t.choices){if("or"!==t.operator)return t;!0===t.choices.every(t=>{if(1!==t.length)return!1;let e=t[0];return!e.start&&!e.end&&void 0!==e.word&&!0!==e.negative&&!0!==e.optional&&!0!==e.method})&&(t.fastOr=new Set,t.choices.forEach(e=>{t.fastOr.add(e[0].word)}),delete t.choices)}return t})),t};let M={"!":"¡","?":"¿Ɂ",'"':'“”"❝❞',"'":"‘‛❛❜","-":"—–",a:"ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",b:"ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",c:"¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",d:"ÐĎďĐđƉƊȡƋƌ",e:"ÈÉÊËèéêëĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ",f:"ƑƒϜϝӺӻҒғſ",g:"ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",h:"ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",I:"ÌÍÎÏ",i:"ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",j:"ĴĵǰȷɈɉϳЈј",k:"ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",l:"ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",m:"ΜϺϻМмӍӎ",n:"ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",o:"ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",p:"ƤΡρϷϸϼРрҎҏÞ",q:"Ɋɋ",r:"ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",s:"ŚśŜŝŞşŠšƧƨȘșȿЅѕ",t:"ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",u:"µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",v:"νѴѵѶѷ",w:"ŴŵƜωώϖϢϣШЩшщѡѿ",x:"×ΧχϗϰХхҲҳӼӽӾӿ",y:"ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",z:"ŹźŻżŽžƵƶȤȥɀΖ"},T={};Object.keys(M).forEach((function(t){M[t].split("").forEach((function(e){T[e]=t}))}));const N=/([A-Z]\.)+[A-Z]?,?$/,Q=/^[A-Z]\.,?$/,U=/[A-Z]{2,}('s|,)?$/,Z=/([a-z]\.)+[a-z]\.?$/,I=function(t){return function(t){return!0===N.test(t)||!0===Z.test(t)||!0===Q.test(t)||!0===U.test(t)}(t)&&(t=t.replace(/\./g,"")),t},H=function(t){let e=t.text||"";e=function(t){let e=t=(t=(t=t||"").toLowerCase()).trim();return t=(t=(t=(t=(t=t.replace(/[,;.!?]+$/,"")).replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g,"'")).replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g,'"')).replace(/\u2026/g,"...")).replace(/\u2013/g,"-"),!1===/^[:;]/.test(t)&&(t=(t=(t=t.replace(/\.{3,}$/g,"")).replace(/[",.!:;?)]+$/g,"")).replace(/^['"(]+/g,"")),""===(t=(t=t.replace(/[\u200B-\u200D\uFEFF]/g,"")).trim())&&(t=e),t.replace(/([0-9]),([0-9])/g,"$1$2")}(e),e=(t=>{let e=t.split("");return e.forEach((t,r)=>{T[t]&&(e[r]=T[t])}),e.join("")})(e),e=I(e),t.normal=e},W=/\//,J=function(t,e){let r=t.normal||t.text;const n=e.one.aliases;return n.hasOwnProperty(r)&&(t.alias=t.alias||[],t.alias.push(n[r])),W.test(r)&&r.split(W).forEach(e=>{""!==(e=e.trim())&&(t.alias=t.alias||[],t.alias.push(e))}),t},R=function(t){let e=t.implicit||t.normal||t.text;e=e.replace(/['’]s$/,""),e=e.replace(/s['’]$/,"s"),e=e.replace(/([aeiou][ktrp])in$/,"$1ing"),!0===/^(re|un)-?[^aeiou]./.test(e)&&(e=e.replace("-","")),e=e.replace(/^[#@]/,""),e!==t.normal&&(t.machine=e)},K=function(t,e,r){for(let n=0;n<t.length;n+=1)for(let o=0;o<t[n].length;o+=1)e(t[n][o],r)},V={normal:t=>K(t,H),alias:(t,e)=>K(t,J,e),machine:t=>K(t,R),freq:function(t){let e={};for(let r=0;r<t.length;r+=1)for(let n=0;n<t[r].length;n+=1){let o=t[r][n],s=o.machine||o.normal;e[s]=e[s]||0,e[s]+=1}for(let r=0;r<t.length;r+=1)for(let n=0;n<t[r].length;n+=1){let o=t[r][n],s=o.machine||o.normal;o.freq=e[s]}},offset:function(t){let e=0,r=0;for(let n=0;n<t.length;n+=1)for(let o=0;o<t[n].length;o+=1){let s=t[n][o];s.offset={index:r,start:e+s.pre.length,length:s.text.length},e+=s.pre.length+s.text.length+s.post.length,r+=1}},wordCount:function(t){let e=0;for(let r=0;r<t.length;r+=1)for(let n=0;n<t[r].length;n+=1)""!==t[r][n].normal&&(e+=1,t[r][n].wordCount=e)}},X=/(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g,Y=/((?:\r?\n|\r)+)/,tt=/[ .][A-Z]\.? *$/i,et=/(?:\u2026|\.{2,}) *$/,rt=/[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i,nt=function(t,e){if(!0===tt.test(t))return!1;if(!0===et.test(t))return!1;if(!1===rt.test(t))return!1;let r=t.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/,"").split(" "),n=r[r.length-1].toLowerCase();return!0!==e.has(n)},ot=/\S/,st=/^\s+/,it=function(t){if(!0===/^(re|un|micro|macro|trans|bi|mono|over)-?[^aeiou]./.test(t))return!1;if(!0===/^([a-z\u00C0-\u00FF/]+)(-|–|—)(like|ish|less|able)/i.test(t))return!1;if(!0===/^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i.test(t))return!0;return!0===/^([0-9]{1,4})(-|–|—)([a-z\u00C0-\u00FF`"'/-]+$)/i.test(t)},ut=function(t){let e=[];const r=t.split(/[-–—]/);let n="-",o=t.match(/[-–—]/);o&&o[0]&&(n=o);for(let t=0;t<r.length;t++)t===r.length-1?e.push(r[t]):e.push(r[t]+n);return e},lt=/[a-z] ?\/ ?[a-z]+$/,at=/\S/,ct=/^[!?.]+$/,ht=/(\S+)/;let ft=[".","?","!",":",";","-","–","—","--","...","(",")","[","]",'"',"'","`"];ft=ft.reduce((t,e)=>(t[e]=!0,t),{});const pt=/^[ \n\t.[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/,gt=/[ \n\t.'[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/,mt=/['’]/,dt=/^[a-z]\.([a-z]\.)+/i,bt=/^[-+.][0-9]/,yt=/^'[0-9]{2}/;var vt={one:{termList:function(t){let e=[];for(let r=0;r<t.length;r+=1)for(let n=0;n<t[r].length;n+=1)e.push(t[r][n]);return e},getDoc:function(t,r){let n=[];return t.filter(t=>t).forEach(t=>{let[o,s,i]=e(t);s||(s=0);let u=r[o]||[];i||(i=u.length),u=u.slice(s,i),u.length>0&&n.push(u)}),n},setTag:o,unTag:function(t,e,r){e=e.trim().replace(/^#/,"");for(let n=0;n<t.length;n+=1){let o=t[n];if("*"===e){o.tags.clear();continue}let s=r[e];if(s&&s.children.length>0)for(let t=0;t<s.children.length;t+=1)o.tags.delete(s.children[t]);o.tags.delete(e)}},cacheDoc:function(t){return t.map(t=>{let e=new Set;return t.forEach(t=>{""!==t.normal&&e.add(t.normal),t.implicit&&e.add(t.implicit);let r=Array.from(t.tags);for(let t=0;t<r.length;t+=1)e.add("#"+r[t])}),e})},cacheMatch:function(t){let e=new Set;return t.forEach(t=>{!0!==t.optional&&!0!==t.negative&&(t.tag&&e.add("#"+t.tag),t.word&&e.add(t.word))}),e},parseMatch:function(t,e={}){if(null==t||""===t)return[];"number"==typeof t&&(t=String(t));let r=function(t){let e=t.split(O),r=[];e.forEach(t=>{k(t)?r.push(t):r=r.concat(t.split(z))}),r=S(r);let n=[];return r.forEach(t=>{(t=>/^[![^]*(<[^<]*>)?\(/.test(t)&&/\)[?\]+*$~]*$/.test(t))(t)||k(t)?n.push(t):n=n.concat(t.split(_))}),n=S(n),n}(t);return r=r.map(t=>G(t)),r=L(r,e),r=function(t,e){return!0===e.fuzzy&&(e.fuzzy=.85),"number"==typeof e.fuzzy&&(t=t.map(t=>(e.fuzzy>0&&t.word&&(t.fuzzy=e.fuzzy),t.choices&&t.choices.forEach(t=>{t.forEach(t=>{t.fuzzy=e.fuzzy})}),t))),t}(r,e),r},match:function(t,e,r){r=r||[];let{regs:n,group:o,justOne:s}=e,u=[];if(0===n.length)return{ptrs:[],byGroup:{}};const l=n.filter(t=>!0!==t.optional&&!0!==t.negative).length;t:for(let e=0;e<t.length;e+=1){let o=t[e];if(!r[e]||!i(n,r[e]))if(!0!==n[0].start)for(let t=0;t<o.length;t+=1){let r=o.slice(t);if(r.length<l)break;let i=E(r,n,t,o.length);if(i){if(i=x(i,e),u.push(i),!0===s)break t;let r=i.pointer[2];Math.abs(r-1)>t&&(t=Math.abs(r-1))}}else{let t=j(o,n,e);t&&u.push(t)}}return!0===n[n.length-1].end&&(u=u.filter(e=>{let r=e.pointer[0];return t[r].length===e.pointer[2]})),u=function(t,e){let r=[],n={};return 0===t.length||("number"==typeof e&&(e=String(e)),e?t.forEach(t=>{t.groups[e]&&r.push(t.groups[e])}):t.forEach(t=>{r.push(t.pointer),Object.keys(t.groups).forEach(e=>{n[e]=n[e]||[],n[e].push(t.groups[e])})})),{ptrs:r,byGroup:n}}(u,o),u},splitSentences:function(t,e){let r=e.one.abbreviations||new Set;t=t||"";let n=[],o=[];if(!(t=String(t))||"string"!=typeof t||!1===ot.test(t))return n;let s=function(t){let e=[],r=t.split(Y);for(let t=0;t<r.length;t++){let n=r[t].split(X);for(let t=0;t<n.length;t++)e.push(n[t])}return e}(t=t.replace(" "," "));for(let t=0;t<s.length;t++){let e=s[t];if(void 0!==e&&""!==e){if(!1===ot.test(e)){if(o[o.length-1]){o[o.length-1]+=e;continue}if(s[t+1]){s[t+1]=e+s[t+1];continue}}o.push(e)}}for(let t=0;t<o.length;t++){let e=o[t];o[t+1]&&!1===nt(e,r)?o[t+1]=e+(o[t+1]||""):e&&e.length>0&&(n.push(e),o[t]="")}if(0===n.length)return[t];for(let t=1;t<n.length;t+=1){let e=n[t].match(st);null!==e&&(n[t-1]+=e[0],n[t]=n[t].replace(st,""))}return n},splitTerms:function(t){let e=[],r=[];if("number"==typeof(t=t||"")&&(t=String(t)),function(t){return"[object Array]"===Object.prototype.toString.call(t)}(t))return t;const n=t.split(ht);for(let t=0;t<n.length;t++)!0!==it(n[t])?r.push(n[t]):r=r.concat(ut(n[t]));let o="";for(let t=0;t<r.length;t++){let n=r[t];!0===at.test(n)&&!1===ft.hasOwnProperty(n)&&!1===ct.test(n)?(e.length>0?(e[e.length-1]+=o,e.push(n)):e.push(o+n),o=""):o+=n}return o&&(0===e.length&&(e[0]=""),e[e.length-1]+=o),e=function(t){for(let e=1;e<t.length-1;e++)lt.test(t[e])&&(t[e-1]+=t[e]+t[e+1],t[e]=null,t[e+1]=null);return t}(e),e=function(t){const e=/^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?(-|–|—) ?$/,r=/^[0-9]{1,4}([a-z]{1,2})? ?$/;for(let n=0;n<t.length-1;n+=1)t[n+1]&&e.test(t[n])&&r.test(t[n+1])&&(t[n]=t[n]+t[n+1],t[n+1]=null);return t}(e),e=e.filter(t=>t),e},splitWhitespace:t=>{let{str:e,pre:r,post:n}=function(t){let e=t,r="",n="";return""===(t=(t=t.replace(pt,e=>(r=e,"-"!==r&&"+"!==r&&"."!==r||!bt.test(t)?"'"===r&&yt.test(t)?(r="",e):"":(r="",e)))).replace(gt,o=>(n=o,mt.test(o)&&/[sn]['’]$/.test(e)&&!1===mt.test(r)?(n=n.replace(mt,""),"'"):!0===dt.test(t)?(n=n.replace(/\./,""),"."):"")))&&(e=e.replace(/ *$/,t=>(n=t||"","")),t=e,r=""),{str:t,pre:r,post:n}}(t);return{text:e,pre:r,post:n,tags:new Set}}},termMethods:c,compute:V};let wt={};var Et={methods:vt,model:wt,parsers:[]};class xt{constructor(t,e,r={}){this.document=t,Object.defineProperty(this,"model",{enumerable:!1,value:wt,writable:!0}),Object.defineProperty(this,"methods",{enumerable:!1,value:vt,writable:!0}),Object.defineProperty(this,"_groups",{enumerable:!1,value:r,writable:!0}),Object.defineProperty(this,"_cache",{enumerable:!1,value:null,writable:!0}),Object.defineProperty(this,"isView",{enumerable:!1,value:!0,writable:!0}),this.pointer=e}get docs(){let t=this.document;return this.pointer&&(t=vt.one.getDoc(this.pointer,this.document)),Object.defineProperty(this,"docs",{value:t}),t}get found(){return this.docs.length>0}get length(){return this.docs.length}get fullPointer(){let{docs:t,pointer:e}=this;return(e||t.map((t,e)=>[e])).map((e,r)=>(e[1]=e[1]||0,e[2]=e[2]||t[r].length,e))}update(t){let e=new xt(this.document,t);return e._cache=this._cache,e}}const jt=function(t,e){const{methods:r,parsers:n}=Et;e&&r.two.addToLexicon&&r.two.addToLexicon(e,Et);let o=r.one.tokenize(t,Et),s=new xt(o);return s.compute(n),s};jt.verbose=function(t){return(void 0===typeof process?self.env:process.env).DEBUG_TAGS=void 0===t||Set,this},jt.parseMatch=Et.methods.one.parseMatch,jt.plugin=function(t){return t(Et,xt),this};const{methods:Ot,model:zt}=Et;jt.methods=()=>Et.methods,jt.model=()=>Et.model,jt.version="14rc",jt.tokenize=function(t,e){e&&Object.assign(Et.model.two.lexicon,e);let r=Ot.one.tokenize(t,Et);return new xt(r).compute("contractions")};let _t=[[["approx","apt","bc","cyn","eg","esp","est","etc","ex","exp","prob","pron","gal","min","pseud","fig","jd","lat","lng","vol","fm","def","misc","plz","ea","ps","sec","pt","pref","pl","pp","qt","fr","sq","nee","ss","tel","temp","vet","ver","fem","masc","eng","adj","vb","rb","inf","situ","vivo","vitro","wr"]],[["dl","ml","gal","ft","qt","pt","tbl","tsp","tbsp","km","dm","cm","mm","mi","td","hr","hrs","kg","hg","dg","cg","mg","µg","lb","oz","sq ft","hz","mps","mph","kmph","kb","mb","gb","tb","lx","lm","pa","fl oz","yb"],"Unit"],[["ad","al","arc","ba","bl","ca","cca","col","corp","ft","fy","ie","lit","ma","md","pd","tce"],"Noun"],[["adj","adm","adv","asst","atty","bldg","brig","capt","cmdr","comdr","cpl","det","dr","esq","gen","gov","hon","jr","llb","lt","maj","messrs","mister","mlle","mme","mr","mrs","ms","mstr","phd","prof","pvt","rep","reps","res","rev","sen","sens","sfc","sgt","sir","sr","supt","surg"],"Honorific"],[["jan","feb","mar","apr","jun","jul","aug","sep","sept","oct","nov","dec"],"Month"],[["dept","univ","assn","bros","inc","ltd","co"],"Organization"],[["rd","st","dist","mt","ave","blvd","cl","cres","hwy","ariz","cal","calif","colo","conn","fla","fl","ga","ida","ia","kan","kans","minn","neb","nebr","okla","penna","penn","pa","dak","tenn","tex","ut","vt","va","wis","wisc","wy","wyo","usafa","alta","ont","que","sask"],"Place"]],kt=new Set,St={};_t.forEach(t=>{t[0].forEach(e=>{kt.add(e),St[e]="Abbreviation",void 0!==t[1]&&(St[e]=[St[e],t[1]])})});var $t={one:{aliases:{"&":"and","@":"at","%":"percent"},abbreviations:kt},two:{lexicon:St}};const Ft="[0m";const Ct={green:"#7f9c6c",red:"#914045",blue:"#6699cc",magenta:"#6D5685",cyan:"#2D85A8",yellow:"#e6d7b3",black:"#303b50"},At={green:function(t){return"[32m"+t+Ft},red:function(t){return"[31m"+t+Ft},blue:function(t){return"[34m"+t+Ft},magenta:function(t){return"[35m"+t+Ft},cyan:function(t){return"[36m"+t+Ft},yellow:function(t){return"[33m"+t+Ft},black:function(t){return"[30m"+t+Ft}},qt=/[,:;).?!-]+/,Pt=/^[('"]+/,Dt=/[,:;)('"]/,Bt=/^[-–—]$/,Gt=function(t,e,r=!0){let n="";return t.forEach(t=>{let r=t.pre||"",o=t.post||"";"some"===e.punctuation&&(r=r.replace(Pt,""),Bt.test(o)&&(o=" "),o=o.replace(Dt,"")),"some"===e.whitespcae&&(r=r.replace(/\s/,""),o=o.replace(/\s+/," "));let s=t[e.use||"text"]||"";n+=r+s+o}),!1===e.keepPunct&&(n=n.replace(Pt,""),n=n.replace(qt,"")),!1===r&&(n=n.trim()),!0===e.lowerCase&&(n=n.toLowerCase()),n},Lt={text:{use:"text"},normal:{whitespace:"some",punctuation:"some",case:"some",unicode:"some",use:"normal"},machine:{whitespace:"some",punctuation:"some",case:"none",unicode:"some",use:"machine"},root:{use:"root"}},Mt={json:function(t){let e=this.docs.map(t=>({text:Gt(t,!1),terms:t.map(t=>((t=Object.assign({},t)).tags=Array.from(t.tags),t))}));return"number"==typeof t?e[t]:e},text:function(t){let e={keepSpace:!0,keepPunct:!0};var r;if(t&&"string"==typeof t&&Lt.hasOwnProperty(t)?e=Object.assign({},Lt[t]):t&&(r=t,"[object Object]"===Object.prototype.toString.call(r))&&(e=Object.assign({},t,e)),this.pointer){e.keepSpace=!1;let t=this.pointer[0];t&&t[1]&&(e.keepPunct=!1)}return function(t,e){let r="";for(let n=0;n<t.length;n+=1)r+=Gt(t[n],e,!0);return e.keepSpace||(r=r.trim()),!1===e.keepPunct&&(r=r.replace(Pt,""),r=r.replace(qt,"")),!0===e.cleanWhitespace&&(r=r.trim()),r}(this.docs,e)},debug:function(){let t=this,{docs:e,model:r}=t;return"undefined"!=typeof window&&window.document?(function(t){let e=t.world.tags;t.forEach(t=>{t.forEach(t=>{let r=t.tags,n=t.text||"-";t.implicit&&(n="["+t.implicit+"]");let o="'"+n+"'";o=o.padEnd(8);let s=r.find(t=>e[t]&&e[t].color),i="steelblue";e[s]&&(i=e[s].color,i=Ct[i]),console.log(`   ${o}  -  %c${r.join(", ")}`,`color: ${i||"steelblue"};`)})})}(t),t):(console.log(At.blue("=====")),e.forEach(t=>{console.log(At.blue("  -----")),t.forEach(t=>{let e=[...t.tags||[]],n=t.text||"-";t.implicit&&(n="["+t.implicit+"]"),void 0!==typeof module&&(n=At.yellow(n));let o="'"+n+"'";o=o.padEnd(18);let s=At.blue("  ｜ ")+o+"  - "+function(t,e){return e.two.tags&&(t=t.map(t=>{if(!e.two.tags.hasOwnProperty(t))return t;const r=e.two.tags[t].color||"blue";return At[r](t)})),t.join(", ")}(e,r);console.log(s)})}),console.log(""),t)},out:function(t){if("text"===t)return this.text();if("normal"===t)return this.text("normal");if("machine"===t||"reduced"===t)return this.text("machine");if("json"===t)return this.json();if("offset"===t||"offsets"===t)return this.compute("offset"),this.json();if("array"===t){return this.docs.map(t=>t.reduce((t,e)=>t+e.pre+e.text+e.post,"").trim()).filter(t=>t)}if("freq"===t||"frequency"===t||"topk"===t){return this.compute("freq").terms().unique().termList().sort((t,e)=>t.freq>e.freq?-1:0)}if("terms"===t){let t=[];return this.docs.forEach(e=>{let r=e.terms.map(t=>t.text);r=r.filter(t=>t),t=t.concat(r)}),t}return"tags"===t?this.docs.map(t=>t.reduce((t,e)=>(t[e.implicit||e.normal]=Array.from(e.tags),t),{})):"debug"===t?this.debug():this.text()}};Mt.data=Mt.json;const Tt={termList:function(){return this.methods.one.termList(this.docs)},terms:function(){return this.match(".")},cache:function(){return this._cache=this.methods.one.cacheDoc(this.document),this},uncache:function(){return this._cache=null,this},groups:function(t){if(t||0===t)return this.update(this._groups[t]||[]);let e={};return Object.keys(this._groups).forEach(t=>{e[t]=this.update(this._groups[t])}),e},eq:function(t){let e=this.pointer;return e||(e=this.docs.map((t,e)=>[e])),e[t]?this.update([e[t]]):this.update([])},first:function(){return this.eq(0)},last:function(){let t=this.pointer.length-1;return this.eq(t)},slice:function(t,e){let r=this.pointer||this.docs.map((t,e)=>[e]);return r=r.slice(t,e),this.update(r)},all:function(){return this.update()},fork:function(){let t=JSON.parse(JSON.stringify(this.document));return this.update(this.pointer).document=t,this},toLowerCase:function(){return this.termList().forEach(t=>{t.text=t.text.toLowerCase()}),this},toUpperCase:function(){return this.termList().forEach(t=>{t.text=t.text.toUpperCase()}),this},toTitleCase:function(){return this.termList().forEach(t=>{t.text=t.text.replace(/^ *[a-z\u00C0-\u00FF]/,t=>t.toUpperCase())}),this},toCamelCase:function(){return this.docs.forEach(t=>{t.forEach((e,r)=>{0!==r&&(e.text=e.text.replace(/^ *[a-z\u00C0-\u00FF]/,t=>t.toUpperCase())),r!==t.length-1&&(e.post="")})}),this},wordCount:function(){return this.list.reduce((t,e)=>t+=e.wordCount(),0)},compute:function(t){const{docs:e,methods:r,model:n}=this;let o=r.compute||{};return"string"==typeof t&&o.hasOwnProperty(t)?o[t](e,n,r):(t=>"[object Array]"===Object.prototype.toString.call(t))(t)?t.forEach(t=>o.hasOwnProperty(t)&&o[t](e,n,r)):"function"==typeof t&&t(this.docs,n,r),this}};Tt.group=Tt.groups,Tt.clone=Tt.fork;var Nt={matchOne:function(t,e){const r=this.methods.one;"string"==typeof t&&(t=r.parseMatch(t));let n={regs:t,group:e,justOne:!0},{ptrs:o,byGroup:s}=r.match(this.docs,n,this._cache,!0),i=this.update(o);return i._groups=s,i},match:function(t,e){const r=this.methods.one;"string"==typeof t&&(t=r.parseMatch(t));let n={regs:t,group:e},{ptrs:o,byGroup:s}=r.match(this.docs,n,this._cache);o=function(t,e){return e?(t.forEach(t=>{let r=t[0];e[r]&&(t[0]=e[r][0],t[1]+=e[r][1],t[2]+=e[r][1])}),t):t}(o,this.pointer);let i=this.update(o);return i._groups=s,i},has:function(t,e){const r=this.methods.one;"string"==typeof t&&(t=r.parseMatch(t));let n={regs:t,group:e},{ptrs:o}=r.match(this.docs,n,this._cache);return o.length>0},if:function(t,e){const r=this.methods.one;"string"==typeof t&&(t=r.parseMatch(t));let n={regs:t,group:e},{ptrs:o}=r.match(this.docs,n,this._cache);return o=o.map(t=>[t[0]]),this.update(o)},ifNo:function(t,e){const{docs:r,methods:n,_cache:o}=this,s=n.one;"string"==typeof t&&(t=s.parseMatch(t));let i={regs:t,group:e},{ptrs:u}=s.match(r,i,o),l=new Set(u.map(t=>t[0])),a=[];for(let t=0;t<r.length;t+=1)!1===l.has(t)&&a.push([t]);return this.update(a)},not:function(t){const{docs:e,methods:r,_cache:n}=this,o=r.one;"string"==typeof t&&(t=o.parseMatch(t));let s={regs:t},{ptrs:i}=o.match(e,s,n),u={};i.forEach(t=>{u[t[0]]=u[t[0]]||[],u[t[0]].push(t)});let l=[];for(let t=0;t<e.length;t+=1)l.push([t,0,e[t].length]);let a=function(t,e){let r={};e.forEach(t=>{r[t[0]]=r[t[0]]||[],r[t[0]].push(t)});let n=[];return t.forEach(t=>{let e=t[0];if(r[e]){let o=r[e];o.forEach((r,s)=>{let i=o[s-1];!i&&r[1]>0&&n.push([e,0,r[1]]),i&&i[2]<r[1]&&n.push([e,i[2],r[1]]),o[s+1]||n.push([e,r[2],t[2]])})}else n.push(t)}),n}(l,i);return this.update(a)}};var Qt={alpha:(t,e)=>t.normal<e.normal?-1:t.normal>e.normal?1:0,length:(t,e)=>{let r=t.normal.trim().length,n=e.normal.trim().length;return r<n?1:r>n?-1:0},wordCount:(t,e)=>t.words<e.words?1:t.words>e.words?-1:0,sequential:(t,e)=>{let r=t.pointer.join(""),n=e.pointer.join("");return r<n?1:r>n?-1:0},byFreq:function(t){let e={};return t.forEach(t=>{e[t.normal]=e[t.normal]||0,e[t.normal]+=1}),t.sort((t,r)=>{let n=e[t.normal],o=e[r.normal];return n<o?1:n>o?-1:0}),t}};const Ut=new Set(["index","sequence","seq","sequential","chron","chronological"]),Zt=new Set(["freq","frequency","topk","repeats"]);var It={unique:function(){let{docs:t,pointer:e}=this,r=e||t.map((t,e)=>[e]),n=new Set,o=new Set;return this.docs.forEach((t,e)=>{let r=t.map(t=>t.machine||t.normal).join(" ");n.has(r)&&o.add(e),n.add(r)}),r=r.filter((t,e)=>!1===o.has(e)),this.update(r)},reverse:function(){let t=this.pointer||this.docs.map((t,e)=>[e]);return t=[].concat(t),t=t.reverse(),this.update(t)},sort:function(t){let{docs:e,pointer:r}=this;t=t||"alpha";let n=r||e.map((t,e)=>[e]),o=e.map((t,e)=>({index:e,words:t.length,normal:t.map(t=>t.machine||t.normal||"").join(" "),pointer:n[e]}));return Ut.has(t)&&(t="sequential"),Zt.has(t)?(o=Qt.byFreq(o),this.update(o.map(t=>t.pointer))):"function"==typeof Qt[t]?(o=o.sort(Qt[t]),this.update(o.map(t=>t.pointer))):this}};const Ht={pre:function(t,e){return void 0===t?this.docs[0][0].pre:(this.docs.forEach(r=>{let n=r[0];!0===e?n.pre+=t:n.pre=t}),this)},post:function(t,e){if(void 0===t){let t=this.docs[this.docs.length-1];return t[t.length-1].post}return this.docs.forEach(r=>{let n=r[0];!0===e?n.post+=t:n.post=t}),this},trim:function(){let t=this.docs;t[0][0].pre="";let e=t[t.length-1];return e[e.length-1].post="",this},hyphenate:function(){return this.docs.forEach(t=>{t.forEach((e,r)=>{0!==r&&(e.pre=""),t[r+1]&&(e.post="-")})}),this},dehyphenate:function(){const t=/(-|–|—)/;return this.docs.forEach(e=>{e.forEach(e=>{t.test(e.post)&&(e.post=" ")})}),this},toQuotations:function(t,e){return t=t||'"',e=e||'"',this.docs.forEach(r=>{r[0].pre=t+r[0].pre;let n=r[r.length-1];n.post=e+n.post}),this},toParentheses:function(t,e){return t=t||"(",e=e||")",this.docs.forEach(r=>{r[0].pre=t+r[0].pre;let n=r[r.length-1];n.post=e+n.post}),this}};Ht.deHyphenate=Ht.dehyphenate,Ht.toQuotation=Ht.toQuotations;const Wt=function(t,e){let r=e.match(t).pointer,n={};return r.forEach(t=>{n[t[0]]=n[t[0]]||[],n[t[0]].push(t)}),n},Jt=function(t,e){let r=[];e[0][1]>t[1]&&r.push([t[0],t[1],e[0][1]]);for(let n=0;n<e.length;n+=1){let o=e[n];r.push(o);let s=e[n+1];s&&s[1]>o[2]&&r.push([t[0],o[2],s[1]])}let n=e[e.length-1];return n[2]<t[2]&&r.push([t[0],n[2],t[2]]),r},Rt=function(t,e){let r=[];e[0][1]>t[1]&&r.push([t[0],t[1],e[0][1]]);for(let n=0;n<e.length;n+=1){let o=e[n],s=e[n+1];s?r.push([t[0],o[1],s[1]]):r.push([t[0],o[1],t[2]])}return r},Kt=function(t,e){let r=[],n=t[1];for(let o=0;o<e.length;o+=1){let s=e[o];r.push([t[0],n,s[2]]),n=s[2]}let o=e[e.length-1];return o[2]<t[2]&&r.push([t[0],o[2],t[2]]),r};var Vt={splitOn:function(t){let e=this.fullPointer,r=Wt(t,this);for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(r[n[0]]){let o=Jt(n,r[n[0]]);e.splice(t,1,...o)}}return this.update(e)},splitBefore:function(t){let e=this.fullPointer,r=Wt(t,this);for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(r[n[0]]){let o=Rt(n,r[n[0]]);e.splice(t,1,...o)}}return this.update(e)},splitAfter:function(t){let e=this.fullPointer,r=Wt(t,this);for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(r[n[0]]){let o=Kt(n,r[n[0]]);e.splice(t,1,...o)}}return this.update(e)}};const Xt=function(t){return"[object Array]"===Object.prototype.toString.call(t)},Yt={tag:function(t,e="",r){if(!this.found||!t)return this;let n=this.termList();if(0===n.length)return this;const{methods:o,verbose:s,model:i}=this;!0===s&&console.log(" +  ",t,e||"");let u=i.two.tags;return Xt(t)?t.forEach(t=>o.one.setTag(n,t,u,r)):o.one.setTag(n,t,u,r),this},tagSafe:function(t,e=""){return this.tag(t,e,!0)},unTag:function(t,e){if(!this.found||!t)return this;let r=this.termList();if(0===r.length)return this;const{methods:n,verbose:o,model:s}=this;!0===o&&console.log(" -  ",t,e||"");let i=s.two.tags;return Xt(t)?t.forEach(t=>n.one.unTag(r,t,i)):n.one.unTag(r,t,i),this}};var te={insertAfter:function(t){const{methods:e,model:r,document:n}=this;let o=e.one.tokenize(t,{methods:e,model:r})[0];this.fullPointer.forEach(t=>{let e=n[t[0]];o=o.slice().map(t=>Object.assign({},t)),((t,e,r)=>{let n=[e,0].concat(r);Array.prototype.splice.apply(t,n)})(e,t[1],o),t[2]+=o.length})}};const ee=Object.assign({},Tt,Mt,Nt,Yt,It,Ht,Vt,te);ee.get=ee.eq;var re=function(t){Object.assign(t.prototype,ee)};const ne=function(t,e){const{methods:r,model:n}=e,{splitSentences:o,splitTerms:s,splitWhitespace:i}=r.one;if("string"==typeof t){t=o(t,n).map(t=>s(t).map(i)),r.compute.normal(t),r.compute.alias(t,n)}return t};return jt.plugin((function(t){let{methods:e,model:r,parsers:n}=t;Object.assign({},e,vt),Object.assign(r,$t),e.one.tokenize=ne,n.push("normal"),n.push("alias"),n.push("machine"),re(xt)})),jt}));
