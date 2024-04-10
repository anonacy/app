import { toastController } from "@ionic/vue"

export async function toast(message = "") {
  const toast = await toastController.create({ duration: 2000 })
  toast.message = message;
  await toast.present();
}
