var morse = require('./morse-node').create();

function decodeMorse() {
    // Your code should go here.
    var encoded = morse.encode('HELLO');
    console.log(encoded.toString());

    // var decoded = morse.decode(encoded);
    // console.log("DATA =" + decoded.toString());
}

module.exports = decodeMorse;
