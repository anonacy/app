<template>
	<ion-item
		:key="alias.alias"
		lines="none"
		class="animated fadeIn faster">
			<ion-toggle 
				mode="md"
				aria-label="toggle alias"
				:checked="alias.enabled"
				v-model="alias.enabled"
				disabled
				slot="start">
			</ion-toggle>
			<ion-label class="no-disable">
				<h2>{{ alias.alias }}</h2>
				<p>
					&nbsp;
					<ion-icon 
						:ios="alias.enabled ? arrowRedo : arrowRedoOutline" 
						:color="alias.enabled ? 'primary' : 'medium'"
						class="flip-vertically">
					</ion-icon>
					&nbsp;{{  alias.endpoint }}
				</p>
			</ion-label>
			<ion-icon 
				class="animated fadeIn faster" 
				v-if="isEdit"
				:icon="closeCircle" 
				slot="end" 
				color="danger" 
				@click="remove(index)">
			</ion-icon>
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

	const props = defineProps(['alias', 'index']);

	const alias = props.alias
	const index = props.index
	const isEdit:Ref<boolean> = ref(false);


	function remove(i: number) {
		// todos.value.splice(i, 1)
	}

	function edit() {
		isEdit.value = !isEdit.value;
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