import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

export function keyCloakInitializer(
  keycloak: KeycloakService,
  auth: AuthService,
): () => Promise<any> {
  return () =>
    new Promise<any>(async (resolve, reject) => {
      try {
        //inizializa keycloak buscando si el usuario esta autenticado
        await keycloak.init({
          initOptions: {
            onLoad: 'check-sso',
            redirectUri: window.location.href,
            checkLoginIframe: false,
            enableLogging: true,
          },
          loadUserProfileAtStartUp: false,
          config: environment.keyCloakConfig,
        });
        console.log('keycloak inicializado');
        //si el usuario esta autenticado, se obtiene su información
        if (await keycloak.isLoggedIn()) {
          console.log('keycloak logueado');
          await auth.initUserInfo();
        }
        resolve(true);
      } catch (error) {
        console.error('Error inicializando keycloak');
        console.log(error)
        //TODO: por alguna razon, cuando se inicializa keycloak, si el usuario se autentico, se genera un error, asi que se vuele a inicializar.
        await keycloak.init({
          initOptions: {
            onLoad: 'check-sso',
            redirectUri: window.location.href,
            checkLoginIframe: false,
            enableLogging: true,
          },
          loadUserProfileAtStartUp: false,
          config: environment.keyCloakConfig,
        });
        reject(error);
      }
    });
}
