import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function keyCloakInitializer(
  keycloak: KeycloakService,
): () => Promise<any> {
  return (): Promise<any> =>
    keycloak.init({
      initOptions: {
        onLoad: 'check-sso',
        redirectUri: window.location.href,
      },
      config: environment.keyCloakConfig,
    });
}
