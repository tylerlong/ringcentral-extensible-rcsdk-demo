import SDK from '@ringcentral/sdk';
import RingCentral from '@rc-ex/core';
import RingCentralExtension from '@rc-ex/rcsdk';

// @ringcentral/sdk
const sdk = new SDK({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

(async () => {
  await sdk.login({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD,
  });

  // ringcentral-extensible + rcsdk extension
  const rc = new RingCentral();
  const ringCentralExtension = new RingCentralExtension(sdk);
  await rc.installExtension(ringCentralExtension);

  // API call with @ringcentral/sdk as HTTP engine
  const extensionInfo = await rc.restapi().account().extension().get();
  console.log(extensionInfo.extensionNumber);
})();
