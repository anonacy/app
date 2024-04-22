<template>
	<ion-item
		:key="props.forward.id"
		lines="none"
		class="animated fadeIn faster">
			<ion-icon
			  slot="start"
				:color="statusDict[props.forward.status].color"
				:ios="statusDict[props.forward.status].icon">
			</ion-icon>
			<ion-label>
				<span class="monospace text-medium">from:&nbsp;&nbsp;</span>{{ props.forward.sender }}
				<br/>
				<span class="monospace text-medium">alias:&nbsp;</span>{{ props.forward.alias }}
				<br/>
				<!-- <span class="monospace text-medium">endpt:&nbsp;</span><span :class="props.forward.endpoint ? '' : 'text-medium'">{{ props.forward.endpoint ? props.forward.endpoint : 'not available'}}</span>
				<br/> -->
				<span class="monospace text-medium">time:&nbsp;&nbsp;</span>{{ convertTimestamp(props.forward.timestamp) }}
			</ion-label>
			<ion-chip
				slot="end"
				class="monospace"
				style="font-size: 0.7em"
				:color="statusDict[props.forward.status].color">
				{{ statusDict[props.forward.status].word }}
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

	const props = defineProps(['forward']);
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