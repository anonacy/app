<template>
	<ion-item
		:key="props.message.id"
		lines="none"
		class="animated fadeIn faster">
			<ion-icon
			  slot="start"
				:color="statusDict[props.message.status].color"
				:ios="statusDict[props.message.status].icon">
			</ion-icon>
			<ion-label>
				<span class="monospace text-medium">from:&nbsp;&nbsp;</span>{{ props.message.mail_from }}
				<br/>
				<span class="monospace text-medium">alias:&nbsp;</span>{{ props.message.rcpt_to }}
				<br/>
				<!-- <span class="monospace text-medium">endpt:&nbsp;</span><span :class="props.message.endpoint ? '' : 'text-medium'">{{ props.message.endpoint ? props.message.endpoint : 'not available'}}</span>
				<br/> -->
				<span class="monospace text-medium">time:&nbsp;&nbsp;</span>{{ convertTimestamp(props.message.timestamp) }}
			</ion-label>
			<ion-chip
				slot="end"
				class="monospace"
				style="font-size: 0.7em"
				:color="statusDict[props.message.status].color">
				{{ statusDict[props.message.status].word }}
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

	const props = defineProps(['message']);
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
		Pending: {
			color: "medium",
			icon: sendOutline,
			word: "Pending",
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

</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}

	ion-icon {
		margin-right: 12px !important;
	}

	ion-label {
		font-size: 0.9em !important;
	}
</style>
../state/state