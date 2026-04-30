import { Strategy } from '@node-saml/passport-saml';

export type SamlStrategyConfig = {
  signOnUrl: string;
  logoutUrl: string;
  entityId: string;
  x509Cert: string;
};

export class SamlStrategy {
  private samlStrategy!: Strategy;

  createStrategy(samlStrategyConfig: SamlStrategyConfig) {
    this.samlStrategy = new Strategy(
      {
        audience: samlStrategyConfig.entityId,
        issuer: samlStrategyConfig.entityId,
        idpCert: samlStrategyConfig.x509Cert,
        wantAssertionsSigned: false,
        wantAuthnResponseSigned: true,
        callbackUrl: `${process.env.APP_URI}/login/callback`,
        entryPoint: samlStrategyConfig.signOnUrl,
        logoutUrl: samlStrategyConfig.logoutUrl,
        logoutCallbackUrl: `${process.env.APP_URI}/logout/callback`,
        signatureAlgorithm: 'sha256',
        identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
      },
      (profile: any, done: any) => {
        console.log('passport.use() profile: %s \n', JSON.stringify(profile));
        return done(null, profile);
      },
      (profile: any, done: any) => {
        return done(null, profile);
      },
    );
  }

  getStrategy() {
    return this.samlStrategy;
  }
}
