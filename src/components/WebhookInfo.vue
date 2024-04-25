<template>
		<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Webhook Events:</h2>
		<ion-card  v-for="(info, index) in webhookInfo">
			<ion-card-header>
				<ion-card-title class="text-white">{{ info.name }}</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<p>{{ info.description }}</p>
			</ion-card-content>
		</ion-card>
</template>

<script setup lang="ts">
	import { 
		IonCard, 
		IonCardHeader,
		IonCardTitle,
		IonCardContent
	} from '@ionic/vue';
	import { closeCircle, arrowRedoOutline, arrowRedo } from 'ionicons/icons';
	import { ref, Ref } from 'vue';

	const webhookInfo = ref([
		{
			name: "MessageSent",
			description: "An e-mail has been successfully delivered to its endpoint (either SMTP or HTTP)."
		},
		{
			name: "MessageHeld",
			description: "An e-mail has been held in Postal. This is the hook to use for blocked emails from disabled aliases."
		},
		{
			name: "MessageDeliveryFailed",
			description: "An e-mail cannot be delivered to its endpoint. This is a permanent failure so it will not be retried."
		},
		{
			name: "MessageDelayed",
			description: "An e-mail has been delayed due to an issue with the receiving endpoint. It will be retried automatically."
		},
		{
			name: "MessageBounced",
			description: "We received a bounce message in response to an email which had previously been successfully sent."
		},
		{
			name: "DomainDNSError",
			description: "This will be triggered when we detect an issue with the DNS configuration for any domain for this server."
		}
	]);
</script>

<style scoped>
	ion-card {
		padding: 0;
		margin: 12px 20px;
	}
	ion-card-title {
		font-size: 1.1em;
	}
</style>