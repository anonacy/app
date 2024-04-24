/* INFO:
  Stores various state refs and setters
*/

import { ref } from "vue";

export const apikey = ref("");
export const org = ref("");
export const orgID = ref("");
export const server = ref("");
export const serverName = ref("");
export const serverID = ref("");
export const apiversion = ref("");

export function rmAuth() {
  apikey.value = "";
  org.value = "";
  orgID.value = "";
  server.value = "";
  serverName.value = "";
  serverID.value = "";
  apiversion.value = "";
}

export function setAuth(
  _apikey: string, 
  _org: string, 
  _orgID: string = "", 
  _server: string, 
  _serverName: string = "",
  _serverID: string = "",
  _apiversion: string = ""
  ) {
    apikey.value = _apikey;
    org.value = _org;
    orgID.value = _orgID;
    server.value = _server;
    serverName.value = _serverName;
    serverID.value = _serverID;
    apiversion.value = _apiversion;
}

