import { retrieveLicense } from "../integrations/cg4gmail.api"
import { GLOBAL } from "../utils/global-data"

export const licenseHandler = () => {
  GLOBAL.loader$.next(true);
  retrieveLicense().then( license => {
    GLOBAL.isActivated = true; /* license.action !== 'required' */;
  }).catch(error => {
    GLOBAL.error = 'Error while loading license';
  }).finally(() => {
    GLOBAL.loader$.next(false);
  })
}