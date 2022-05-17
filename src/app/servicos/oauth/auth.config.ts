import { AuthConfig } from 'angular-oauth2-oidc';

export const DiscoveryDocumentConfig = {
  url: "https://calculeiapp.b2clogin.com/calculeiapp.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_up_in_base"
};

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://calculeiapp.b2clogin.com/60003e35-f1b0-4237-9231-ef8622eb97fc/v2.0/',
  tokenEndpoint: 'https://calculeiapp.b2clogin.com/calculeiapp.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_up_in_base',
  redirectUri: window.location.origin + '/paginas/login',
  postLogoutRedirectUri: window.location.origin + '/paginas/home',
  clientId: 'b16c237b-5e05-4778-a247-d581a3d66bf0',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid offline_access https://calculeiapp.onmicrosoft.com/b16c237b-5e05-4778-a247-d581a3d66bf0/api',
  showDebugInformation: true,
  clearHashAfterLogin: true,
  oidc: true,
};
