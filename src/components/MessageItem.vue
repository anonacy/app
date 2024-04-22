<template>
	<ion-item
		:key="message.id"
		lines="none"
		class="animated fadeIn faster">
			<ion-icon
				:color="statusDict[message.status].color"
				:ios="statusDict[message.status].icon">
			</ion-icon>
			<ion-label>
				<span class="monospace text-medium">from:&nbsp;</span>{{ message.mail_from }}
				<br/>
				<span class="monospace text-medium">to:&nbsp;&nbsp;&nbsp;</span>{{ message.rcpt_to }}
				<br/>
				<span class="monospace text-medium">time:&nbsp;</span>{{ convertTimestamp(message.timestamp) }}
			</ion-label>
			<!-- <ion-label>
				<ion-icon :ios="mailOutline" color="medium"></ion-icon> {{ message.mail_from }}
				<br/>
				<ion-icon :ios="arrowRedoOutline" class="flip-vertically" color="medium"></ion-icon> {{ message.rcpt_to }}
				<span v-if="message.endpoint_id">
					<br/>
					<ion-icon :ios="arrowRedoOutline" class="flip-vertically"></ion-icon> {{ message.endpoint_id }}
					<br/>
				</span>
			</ion-label> -->
			<ion-chip
				slot="end"
				class="monospace"
				style="font-size: 0.7em"
				:color="statusDict[message.status].color">
				{{ statusDict[message.status].word }}
			</ion-chip>
	</ion-item>
</template>

<script setup lang="ts">
	import { 
		IonInput, 
		IonItem, 
		IonButton, 
		IonIcon, 
		IonCard,
		IonLabel,
		IonChip
	} from '@ionic/vue';
	import { closeCircle, 
		flagOutline, 
		send, 
		sendOutline, 
		personOutline,
		mailOutline,
		arrowRedoOutline
	} from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import { convertTimestamp } from '../services/utils';

	const props = defineProps(['message', 'index']);
	const statusDict: { [key: string]: any } = {
		Sent: {
			color: "success",
			icon: send,
			word: "Sent",
		},
		HardFail: {
			color: "danger",
			icon: sendOutline,
			word: "Failed",
		},
		SoftFail: {
			color: "warning",
			icon: sendOutline,
			word: "Soft Fail",
		},
		Held: {
			color: "medium",
			icon: sendOutline,
			word: "Blocked",
		},
		HoldCancelled: {
			color: "medium",
			icon: sendOutline,
			word: "Blocked",
		}
	}


	const message = props.message
	const index = props.index

</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}

	ion-icon {
		margin-right: 12px !important;
	}
</style>
../state/state