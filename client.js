// All this information is provided by the service you register on
var providerHost = 'localhost';
var providerPort = '2775';
var providerSystemId = 'xxxxx';
var providerPassword = 'yyyyy';

var smpp = require('smpp');
var session = smpp.connect('smpp://' + providerHost + ':' + providerPort);
session.bind_transceiver({
    system_id: providerSystemId,
    password: providerPassword
}, (pdu) => {
    if (pdu.command_status === 0) {
        console.log('successful bound');
        session.submit_sm({
            source_addr: 'TEST',
            destination_addr: '+33XXXXXXXXXX',
            message_payload: 'Hi this is test message',
            short_message: 'Hi There',
            source_addr_ton: 5,
            source_addr_npi: 1,
            dest_addr_ton: 1,
            dest_addr_npi: 1,
        }, pdu => {
            console.log(pdu);
            if (pdu.command_status === 0) {
                console.log(pdu.message_id);
            }
        });
    }
});
