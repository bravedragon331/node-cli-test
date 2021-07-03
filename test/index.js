const expect = require("chai").expect;
const { convert } = require('../lib')

describe("Exchange Test", function () {
    it('Conversion Test', async () => {
        var data = await convert("2021-02-01", "USD", "EUR", 50);
        let convertedAmount;
        if (data.rates) {
            convertedAmount = data.rates["EUR"]
        }
        expect(convertedAmount).to.equal(41.377);
    })
})