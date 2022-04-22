import axios from 'axios';

const rateRegex = new RegExp(/<Cube currency='(.*)' rate='(.*)'\/>/g);

async function buildPresence() {
  const url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
  var response = await axios.get(url);
  var data = response.data;
  var rates = String(data).matchAll(rateRegex);
  var calculatedRates = rateOf(['TRY'], rates);
  return ':( ' + calculatedRates[0]?.value.toFixed(2);
}

function rateOf(currencies, rates) {
  return [...rates]
    .filter(rate => currencies.includes(rate[1]))
    ?.map(rate => {
      return {
        name: rate[1],
        value: Number(rate[2]),
      };
    });
}

export { buildPresence };