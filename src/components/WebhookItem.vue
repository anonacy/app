<template>
	<ion-item
		:key="props.webhook.webhook"
		lines="none"
		class="animated fadeIn faster">
			<ion-toggle 
				mode="md"
				aria-label="toggle webhook"
				:checked="props.webhook.enabled"
				v-model="props.webhook.enabled"
				slot="start"
				@click="toggle()">
			</ion-toggle>
			<ion-label class="no-disable">
				<h2>{{ props.webhook.webhook }}</h2>
			</ion-label>
			<ion-icon 
				class="animated fadeIn faster" 
				v-if="props.editing && !confirmDelete"
				:icon="closeCircle" 
				slot="end" 
				color="danger" 
				@click="confirmDelete = true">>
			</ion-icon>
			<ion-button 
				v-if="props.editing && confirmDelete"
				slot="end" 
				color="medium" 
				shape="round"
				fill="outline"
				@click="cancel()">
				Cancel
			</ion-button>
			<ion-button 
				v-if="props.editing && confirmDelete"
				slot="end" 
				color="danger" 
				shape="round"
				@click="remove()">
				Confirm
			</ion-button>
	</ion-item>
</template>

<script setup lang="ts">
	import { 
		IonItem, 
		IonLabel, 
		IonButton, 
		IonIcon, 
		IonToggle,
	} from '@ionic/vue';
	import { closeCircle, arrowRedoOutline, arrowRedo } from 'ionicons/icons';
	import { ref, Ref } from 'vue';

	const props = defineProps(['webhook', 'index', 'editing']);
	const emit = defineEmits(['remove', 'toggle']);

	const confirmDelete: Ref<boolean> = ref(false);


	function remove() {
		if(confirmDelete.value) {
			emit('remove', props.index);
		} else {
			confirmDelete.value = true;
		}
	};

	function cancel() {
		confirmDelete.value = false;
	}

	function toggle() {
		emit('toggle', props.index);
	}

</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}

	ion-toggle {
		margin-right: 12px !important;
	}
</style>