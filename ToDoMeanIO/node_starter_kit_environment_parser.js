/**
 * Created by aishwarya on 03/05/16.
 */
var config=require('./node_starter_kit_config');

var internalconfig=
{
    "service_type":"mongo"//mysql,postgres
};

module.exports.getEnv=function() {
    var returnObject={};
    var vcap_service;
    if(process.env.VCAP_SERVICES) {
        vcap_service = JSON.parse(process.env.VCAP_SERVICES);
    }
    var service_name = config.service_name;
    var creds;
    if (vcap_service && service_name) {
        creds = vcap_service[service_name][0]['credentials'];
    }
    if (creds) {
        switch (internalconfig.service_type) {
            case 'mongo':
                switch (config.deployment_target) {
                    case 'bluemix':
                    case 'cog1':
                        returnObject.url=creds.url;
                        return returnObject;
                    case 'pcf':
                        returnObject.url=creds.uri;
                        return returnObject;
                }
                break;
            case 'mysql':
                returnObject = {
                    name: vcap_service[service_name][0].credentials.name,
                    host: vcap_service[service_name][0].credentials.hostname,
                    user: vcap_service[service_name][0].credentials.username,
                    password: vcap_service[service_name][0].credentials.password,
                    port: vcap_service[service_name][0].credentials.port
                };
                return returnObject;
        }

    }
    else {
        switch (internalconfig.service_type) {
            case 'mongo':
                returnObject.url='mongodb://localhost/dev';
                return returnObject;
            case 'mysql':
                break;


        }
    }
};