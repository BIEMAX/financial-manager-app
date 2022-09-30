export const environment = {
  production: false,
  applicationName: 'Financial Manager',
  apiUrl: '${{ secrets.URL_API_STAGING_ENVIRONMENT }}',
  apiVersion: 'v1',
  apiSecret: '',
  logInfo: true,
};

export const ui = {
  color: "primary", //Can be: primary (purple), accent (pink) or warn (orange)
};