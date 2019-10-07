var smpp = require('smpp');
let checkAsyncUserPass = function (sysID, pass, cb) {
    cb(null)
};
var server = smpp.createServer(function (session) {
    session.on('bind_transceiver', function (pdu) {
        // we pause the session to prevent further incoming pdu events,
        // untill we authorize the session with some async operation.
        session.pause();
        checkAsyncUserPass(pdu.system_id, pdu.password, function (err) {
            if (err) {
                session.send(pdu.response({
                    command_status: smpp.ESME_RBINDFAIL
                }));
                session.close();
                return;
            }
            console.log('OK');
            session.send(pdu.response());
            session.resume();
        });
    });
    session.on('pdu', function (pdu) {
        console.log('server recieved ...');
        console.log(pdu);
        session.send(pdu.response({message_id: ('' + Math.random()).substr(2, 8)}));
        session.resume();
    });
});
server.listen(2775);
