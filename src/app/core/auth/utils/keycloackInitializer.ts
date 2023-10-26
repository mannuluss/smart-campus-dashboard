import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

export function keyCloakInitializer(
  keycloak: KeycloakService,
  auth: AuthService
): () => Promise<any> {
  return () =>
    new Promise<any>(async (resolve, reject) => {
      try {
        //inizializa keycloak buscando si el usuario esta autenticado
        await keycloak.init({
          initOptions: {
            onLoad: 'check-sso',
            redirectUri: window.location.href,
          },
          loadUserProfileAtStartUp: false,
          config: environment.keyCloakConfig,
        });

        //si el usuario esta autenticado, se obtiene su información
        if (await keycloak.isLoggedIn()) {
          auth.initUserInfo();
        }
        resolve(true);
      } catch (error) {
        console.log(error)
        console.error('Error inicializando keycloak', error);
        reject(error);

      }
    });
}
