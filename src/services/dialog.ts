import { alertController, toastController } from "@ionic/vue"

export async function toast(message = "") {
  const toast = await toastController.create({ duration: 2000 })
  toast.message = message;
  await toast.present();
}

export async function alert(message = "") {
  const alert = await alertController.create({
    header: 'Alert',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}

export async function error(message = "") {
  const alert = await alertController.create({
    header: 'Error',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}