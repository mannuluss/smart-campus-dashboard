export const environment = {
  production: true,
  adminService: 'http://feliperojas.live/smart-campus/admin',
  dataService: 'http://feliperojas.live/smart-campus/data/api',
  //Configuracion del broker
  brokerConfig: {
    brokerHostName: '13.82.121.101',
    brokerPort: 61614,
    brokerPath: '', //optional
    wsOptions: {
      protocol: 'ws', //optional pero se debe especificar si se usa wss para https
    },
  },
  authEnabled: false, //indica si se debe usar keycloak para autenticar
  keyCloakConfig: {
    clientId: 'front-smart-campus',
    realm: 'smart-campus-iot',
    url: 'https://lemur-9.cloud-iam.com/auth',
  },
};
