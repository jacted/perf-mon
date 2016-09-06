var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var LogSchema   = new Schema({
    visitorid: Number,
    hostname: String,
    load_time: Number, 
    dns: Number,
    latency: Number,
    transfer: Number,
    dom_to_interactive: Number,
    interactive_to_completed: Number,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Log', LogSchema);