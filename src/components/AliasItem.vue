<template>
	<ion-item
		:key="props.alias.alias"
		lines="none"
		class="animated fadeIn faster">
			<ion-toggle 
				mode="md"
				aria-label="toggle alias"
				:checked="props.alias.enabled"
				v-model="props.alias.enabled"
				disabled
				slot="start"
				@click="toggle()">
			</ion-toggle>
			<ion-label class="no-disable">
				<h2>{{ props.alias.alias }}</h2>
				<p>
					&nbsp;
					<ion-icon 
						:ios="props.alias.enabled ? arrowRedo : arrowRedoOutline" 
						:color="props.alias.enabled ? 'primary' : 'medium'"
						class="flip-vertically">
					</ion-icon>
					&nbsp;{{  props.alias.endpoint }}
				</p>
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
		IonInput, 
		IonList, 
		IonItem, 
		IonLabel, 
		IonButton, 
		IonIcon, 
		IonSpinner, 
		IonToggle,
		IonCheckbox
	} from '@ionic/vue';
	import { closeCircle, flagOutline, arrowRedoOutline, arrowRedo } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import { defineEmits } from 'vue';

	const props = defineProps(['alias', 'index', 'editing']);
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
../state/state