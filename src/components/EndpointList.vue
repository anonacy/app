<template>
	<div class="small-container">
		<div class="sticky">
			<div class="title">{{`Endpoints (${endpoints.length})`}}</div>
			<hr/>
			<ion-item lines="none">
				<ion-label>
				<ion-input
					slot="start"
					aria-label="Todo"
					v-model="input"
					autofocus
					placeholder="Add a endpoint..."
					@keyup.enter="add" >
				</ion-input>
			</ion-label>
				<ion-button 
					slot="end"
					@click="add()"
					shape="round"
					size="small"
					:disabled="isLoading">
						Add
				</ion-button>
				<!-- <ion-button 
					slot="end"
					@click="edit()"
					shape="round"
					size="small"
					:disabled="isLoading">
					{{ isEdit ? 'Done' : 'Edit' }}
				</ion-button> -->
			</ion-item>
		</div>

		<div style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner v-if="isLoading" name="dots"></ion-spinner>
		</div>
		
		<ion-list v-if="!isLoading">
			<ion-item
				v-for="(endpoint, index) in endpoints"
				:key="endpoint.id"
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
		IonButton, 
		IonIcon, 
		IonSpinner
	} from '@ionic/vue';
	import { closeCircle, flagOutline } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import HttpService from '../services/http'
	import { isEmail } from '../services/utils'

	let endpoints: Ref<any[]> = ref([]);
	const input:Ref<string> = ref('');
	const isEdit:Ref<boolean> = ref(false);
	const isLoading:Ref<boolean> = ref(false);
	const confirmDelete:Ref<boolean[]> = ref([]);


	load();

	async function load() {
		isLoading.value = true;
		let res:any = await HttpService.get("/endpoints");
		endpoints.value = res.data;
		isLoading.value = false;
	}

	async function add() {
		isLoading.value = true;
		input.value.trim()
		if(isEmail(input.value)){
			let res:any = await HttpService.post("/endpoint", { endpoint: input.value });
			if(res.status == 200) {
				endpoints.value.unshift(res.data)
			}
		}
		input.value = ''
		isLoading.value = false;
	}

	async function remove(i: number) {
		if(confirmDelete.value[i]) {
			isLoading.value = true;
			let res:any = await HttpService.delete("/endpoint", { endpoint: endpoints.value[i].endpoint});
			if(res.status == 200) {
				endpoints.value.splice(i, 1)
				confirmDelete.value[i] = false;
			}
			isLoading.value = false;
		} else {
			confirmDelete.value[i] = true;
		}
	}

	function edit() {
		isEdit.value = !isEdit.value;
		confirmDelete.value.fill(false);
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