/* INFO:
  Stores various state refs and setters
*/

import { ref, watch } from "vue";

export const apikey = ref("");
export const org = ref("");
export const orgID = ref("");
export const server = ref("");
export const serverID = ref("");

export function setApiKey(key: string) {
  apikey.value = key;
}

export function setAuth(
  _apikey: string, 
  _org: string, 
  _server: string, 
  _orgID: string = "", 
  _serverID: string = ""
  ) {
    apikey.value = _apikey;
    org.value = _org;
    orgID.value = _orgID;
    server.value = _server;
    serverID.value = _serverID;
}

