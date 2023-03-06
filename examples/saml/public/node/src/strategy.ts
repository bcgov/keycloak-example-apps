import { Strategy } from 'passport-saml/lib/passport-saml';

export type SamlStrategyConfig = {
  signOnUrl: string;
  logoutUrl: string;
  entityId: string;
  x509Cert: string;
};

export class SamlStrategy {
  samlStrategy: any;

  createStrategy(samlStrategyConfig: SamlStrategyConfig) {
    this.samlStrategy = new Strategy(
      {
        audience: samlStrategyConfig.entityId,
        issuer: samlStrategyConfig.entityId,
        callbackUrl: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/callback`,
        entryPoint: process.env.SSO_SIGN_ON_SERVICE_URL,
        cert: samlStrategyConfig.x509Cert,
        logoutUrl: samlStrategyConfig.logoutUrl,
        logoutCallbackUrl: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/logout/callback`,
        signatureAlgorithm: 'sha256',
      },
      (profile: any, done: any) => {
        console.log('passport.use() profile: %s \n', JSON.stringify(profile));
        return done(null, profile);
      },
    );
  }

  getStrategy() {
    return this.samlStrategy;
  }
}
