<template>
	<ion-item
		:key="domain.domain"
		lines="none"
		class="animated fadeIn faster">
			<ion-checkbox 
				mode="md"
				:checked="domain.dns.ok"
				v-model="domain.dns.ok"
				aria-label="Domain ok"
				slot="start"
				disabled>
			</ion-checkbox>
			<ion-label class="no-disable">
					{{ domain.domain }}
			</ion-label>
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
	import { closeCircle } from 'ionicons/icons';
	import { ref, Ref } from 'vue';

	const props = defineProps(['domain', 'index']);

	const domain = props.domain
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
</style>
../state/state