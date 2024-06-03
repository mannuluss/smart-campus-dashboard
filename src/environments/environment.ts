export const environment = {
  production: false,
  adminService: 'http://localhost:8090/admin',
  dataService: 'http://localhost:8091/data/api',
  //Configuracion del broker
  brokerConfig: {
    brokerHostName: '13.82.121.101',
    brokerPort: 61614,
    brokerPath: '', //optional
    wsOptions: {
      protocol: 'wss', //optional pero se debe especificar si se usa wss para https
    },
  },
  authEnabled: false, //indica si se debe usar keycloak para autenticar
  keyCloakConfig: {
    clientId: 'front-smart-campus',
    realm: 'smart-campus-iot',
    url: 'https://lemur-9.cloud-iam.com/auth',
  },
};
