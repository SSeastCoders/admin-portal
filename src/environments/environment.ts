// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //apiUrl: 'http://localhost:8080',
  apiUrl: 'https://localhost:8443',

  baseUrl: 'https://localhost:8443',
  userUrl: 'http://localhost:8222',
  accountUrl: 'http://localhost:8223/api/v1',
  transactionUrl: 'http://localhost:8224/api/v1',
  cardUrl: 'http://localhost:8225',


  production: false,
  //NODE_TLS_REJECT_UNAUTHORIZED=0
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
