var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage' , () => {
    it('should generate correct message object' , () => {
        var from = 'And';
        var text = 'Vasi';
        var result = generateMessage(from, text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({
            from : from,
            text : text
        });
    });
});