export const environment = {
  production: true,
  adminService: 'http://feliperojas.live/smart-campus/admin',
  dataService: 'http://feliperojas.live/smart-campus/data/api',
  brokerUrl: '13.82.121.101',
  brokerPort: 61614,
  brokerPath: '', //optional
  authEnabled: false,
  keyCloakConfig: {
    //configuracion de keycloak
    clientId: 'front-smart-campus',
    realm: 'smart-campus-iot',
    url: 'https://lemur-9.cloud-iam.com/auth',
  },
};
