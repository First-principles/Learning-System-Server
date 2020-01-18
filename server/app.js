const app = require("./server");
const { PORT } = require("../config/config.json");

var server = app.listen(process.env.PORT || PORT, function() {
    console.log('Listening on port ' + server.address().port);
});