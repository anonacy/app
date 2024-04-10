<template>
	<ion-item
		:key="endpoint.endpoint"
		lines="none"
		class="animated fadeIn faster">
			<ion-icon 
				color="primary"
				:ios="flagOutline">
			</ion-icon>
			<ion-input 
				v-model="endpoint.endpoint"
				value="endpoint.name">
			</ion-input>
			<ion-icon 
				class="animated fadeIn faster" 
				v-if="isEdit && !confirmDelete"
				:icon="closeCircle" 
				slot="end" 
				color="danger" 
				@click="confirmDelete = true">>
			</ion-icon>
			<ion-button 
				v-if="isEdit && confirmDelete"
				slot="end" 
				color="danger" 
				shape="round"
				@click="remove(index)">
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
	import { closeCircle, flagOutline } from 'ionicons/icons';
	import { ref, Ref } from 'vue';

	const props = defineProps(['endpoint', 'index']);

	const endpoint = props.endpoint
	const index = props.index
	const isEdit:Ref<boolean> = ref(false);
	const confirmDelete: Ref<boolean> = ref(false);


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

	ion-icon {
		margin-right: 10px !important;
	}
</style>
../state/state