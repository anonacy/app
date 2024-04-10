<template>
	<div class="small-container">
		<div class="sticky">
			<div class="title">{{`Domains (${domains.length})`}}</div>
			<hr/>
			<!-- <ion-item lines="none">
				<ion-label>
				<ion-input
					slot="start"
					aria-label="Todo"
					v-model="input"
					autofocus
					placeholder="Add a domain..."
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
					{{ isEdit ? 'Cancel' : 'Edit' }}
				</ion-button>
			</ion-item> -->
		</div>

		<div style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner v-if="isLoading" name="dots"></ion-spinner>
		</div>
		
		<ion-list>
			<ion-item
				v-for="(domain, index) in domains"
				:key="domain.id"
				lines="none"
				class="animated fadeIn faster">
					<ion-checkbox 
						mode="md"
						:checked="domain.dns.ok"
						v-model="domain.dns.ok"
						slot="start"
						disabled>
					</ion-checkbox>
					<ion-label class="no-disable">
							{{ domain.domain }}
					</ion-label>
					<ion-icon 
						class="animated fadeIn faster" 
						v-if="isEdit && !confirmDelete[index]"
						:icon="closeCircle" 
						slot="end" 
						color="danger" 
						@click="confirmDelete[index] = true">>
					</ion-icon>
					<ion-button 
						v-if="isEdit && confirmDelete[index]"
						slot="end" 
						color="danger" 
						shape="round"
						@click="remove(index)">
						Confirm
					</ion-button>
			</ion-item>
		</ion-list>
	</div>
</template>

<script setup lang="ts">
	import { 
		IonInput, 
		IonList, 
		IonItem, 
		IonLabel, 
		IonCheckbox, 
		IonButton, 
		IonIcon, 
		IonSpinner
	} from '@ionic/vue';
	import { closeCircle } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import HttpService from '../services/http'

	let domains: Ref<any[]> = ref([]);
	const input:Ref<string> = ref('');
	const isEdit:Ref<boolean> = ref(false);
	const confirmDelete: any = ref([]);
	const isLoading:Ref<boolean> = ref(false);


	load();

	async function load() {
		isLoading.value = true;
		let res:any = await HttpService.get("/domains");
		domains.value = res.data;
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

	async function remove(index: number) {
		// Your remove logic here
		confirmDelete.value[index] = false; // Reset the confirmDelete flag for this index
	}

	// function remove(i: number) {
	// 	// todos.value.splice(i, 1)
	// }

	function edit() {
		confirmDelete.value.fill(false);
		isEdit.value = !isEdit.value;
	}
</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}
</style>
../state/state