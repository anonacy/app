/* INFO:
  Stores various state refs and setters
*/

import { ref, watch } from "vue";

export const apikey = ref("");

export function setApiKey(key: string) {
  apikey.value = key;
}

