#!/usr/bin/env node
const fs = require('fs');
const { loadHistory, convert } = require('../lib')

let cmd, start, end, base, symbols = [], file, date, amount;
// Extract parameter values
process.argv.forEach(function (val, index, array) {
    if (val == "--start") {
        start = array[index + 1]
        cmd = array[index - 1]
    } else if (val == "--end") {
        end = array[index + 1]
    } else if (val == "--base") {
        base = array[index + 1]
    } else if (val == "--symbol") {
        let tmp = index + 1;
        while (array[tmp]) {
            symbols.push(array[tmp++])
            if (!array[tmp] || array[tmp].includes("--")) {
                break;
            }
        }
    } else if (val == "--amount") {
        amount = array[index + 1]
    } else if (val == "--date") {
        date = array[index + 1]
        cmd = array[index - 1]
    } else if (val == "--output") {
        file = array[index + 1]
    }
});

(async function () {
    try {
        if (cmd == "history") {
            let rates = []
            let data = await loadHistory(start, end, base, symbols.join(","));
            if (data.rates) {
                Object.keys(data.rates).forEach(key => {
                    symbols.forEach(symbol => {
                        rates.push({
                            "date": key, "base": base, "symbol": symbol, "rate": data.rates[key][symbol]
                        })
                    });
                })
                if (file) {
                    fs.writeFileSync(file, rates.map(t => (JSON.stringify(t))).join("\r\n"));
                } else {
                    console.log(rates);
                }
            }
        } else if (cmd == "convert" && !!amount) {
            let data = await convert(date, base, symbols.join(","), amount)
            let convertedAmount;
            if (data.rates) {
                convertedAmount = data.rates[symbols[0]]
            }
            if (file) {
                fs.writeFileSync(file, String(convertedAmount));
            } else {
                console.log(convertedAmount)
            }
        }

    } catch (e) {
        console.log(e.message);
    }
})();
