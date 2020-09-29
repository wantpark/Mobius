//var mn = require('./mobius/mn');
//var db = require('./mobius/db_action');
var fs = require('fs');

/*
var conf = {};
try {
    conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
}
catch (e) {
    conf.csebaseport = "7579";
    conf.dbpass = "dksdlfduq2";
    fs.writeFileSync('conf.json', JSON.stringify(conf, null, 4), 'utf8');
}
*/
var conf = JSON.parse(fs.readFileSync('conf_mn.json', 'utf8'));

global.defaultbodytype = 'json';

// parent CSE information
global.parent_cbname = conf.parent.cbname;
global.parent_cbcseid = conf.parent.cbcseid;
global.parent_cbhost = conf.parent.cbhost;
global.parent_cbhostport = conf.parent.cbhostport;
global.parent_cbprotocol = conf.parent.cbprotocol; // select 'http' or 'mqtt' when register remoteCSE
global.parent_mqttbroker = conf.parent.mqttbroker;

// my CSE information
global.usecsetype = 'mn'; // select 'in' or 'mn' or asn'
global.usecsebase = 'rosemary';
global.usecseid = '/rosemary';
global.usecsebaseport = conf.csebaseport;

global.usedbhost = 'localhost';
global.usedbpass = conf.dbpass;

global.usepxywsport = '7577';
global.usepxymqttport = '7578';

global.use_sgn_man_port = '7599';
global.use_cnt_man_port = '7583';
global.use_hit_man_port = '7594';

global.usetsagentport = '7582';

//global.use_mqtt_broker      = 'localhost'; // mqttbroker for mobius
global.use_mqtt_broker = parent_mqttbroker; // mqttbroker for mobius

global.use_secure = 'disable';
//global.use_secure           = 'enable';
global.use_mqtt_port = '1883';
if (use_secure === 'enable') {
    use_mqtt_port = '8883';
}

global.useaccesscontrolpolicy = 'disable';

global.wdt = require('./wdt');

global.allowed_ae_ids = [];
//allowed_ae_ids.push('ryeubi');

global.allowed_app_ids = [];
//allowed_app_ids.push('APP01');

global.usesemanticbroker = '10.10.202.114';

global.uservi = '2a';

global.useCert = 'disable';

// CSE core
require('./app');

var events = require('events');
global.csr_custom = new events.EventEmitter();

csr_custom.on('register_remoteCSE', function () {
    /*
    db.connect(usedbhost, 3306, 'root', usedbpass, function (rsc) {
        if (rsc == '1') {
            db.getConnection(function (code, connection) {
                if (code === '200') {
                    mn.build_mn(connection, '/'+usecsebase, function (rsp) {
                        if(rsp.rsc == '2000') {
                            console.log('[[[[[[[[[[[[[[[[register_remoteCSE]]]]]]]]]]]]]]]] ' + JSON.stringify(rsp));
                            clearInterval(refreshIntervalId);
                        }
                        else {
                            console.log('register_remoteCSE again');
                        }
                    });
                }
            });
        }
    });
    */
});
