<template>
	<div class="small-container">
		<ion-item lines="none">
			<ion-label>
			<ion-input
				slot="start"
				aria-label="Todo"
				v-model="input"
				autofocus
				placeholder="Add a alias..."
				@keyup.enter="add" >
			</ion-input>
		</ion-label>
			<ion-button 
				slot="end"
				@click="add()"
				shape="round"
				size="small">
					Add
			</ion-button>
			<ion-button 
				slot="end"
				@click="edit()"
				shape="round"
				size="small">
				{{ isEdit ? 'Done' : 'Edit' }}
			</ion-button>
		</ion-item>

		<div style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner v-if="isLoading" name="dots"></ion-spinner>
		</div>
		
		<ion-list>
			<ion-item
				v-for="(alias, index) in aliases"
				:key="alias.id"
				lines="none"
				class="animated fadeIn faster">
					<ion-checkbox 
						mode="md"
						:checked="alias.enabled"
						v-model="alias.enabled"
						slot="start"
						disabled>
					</ion-checkbox>
					<ion-input 
						v-model="alias.alias"
						value="alias.name">
					</ion-input>
					<ion-icon 
						class="animated fadeIn faster" 
						v-if="isEdit"
						:icon="closeCircle" 
						slot="end" 
						color="danger" 
						@click="remove(index)">
					</ion-icon>
			</ion-item>
		</ion-list>
	</div>
</template>

<script setup lang="ts">
import { IonInput, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon, IonText, IonSpinner } from '@ionic/vue';
import { closeCircle } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import HttpService from '../services/http'

	let aliases: Ref<any[]> = ref([]);
	const input:Ref<string> = ref('');
	const isEdit:Ref<boolean> = ref(false);
	const isLoading:Ref<boolean> = ref(false);


	load();

	async function load() {
		isLoading.value = true;
		let res:any = await HttpService.get("/aliases");
		aliases.value = res.data;
		isLoading.value = false;
	}

	function add() {
		// input.value.trim()
		// if(input.value){
		// 	todos.value.push({
		// 		id: Date.now(),
		// 		created_at: Date.now(),
		// 		name: input.value,
		// 		completed: false
		// 	})
		// }
		// input.value = ''
	}

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