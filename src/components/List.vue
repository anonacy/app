<template>
	<div class="small-container">
		<div class="sticky">
			<div class="title">{{`${capitalize(pluralize(type))} (${items.length})`}}</div>
			<ion-item lines="none">
				<ion-label>
				<ion-input
					slot="start"
					aria-label="Todo"
					v-model="input"
					autofocus
					:placeholder="`Add ${type}...`"
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
			<hr/>
		</div>

		<div style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner v-if="isLoading" name="dots"></ion-spinner>
		</div>
		
		<ion-list v-if="!isLoading && type == 'domain'">
			<DomainItem v-for="(domain, index) in items"
				:key="domain.domain"
				:domain="domain"
				:index="index">
			 </DomainItem>
		</ion-list>
		
		<ion-list v-if="!isLoading && type == 'alias'">
			<AliasItem v-for="(alias, index) in items"
				:key="alias.alias"
				:alias="alias"
				:index="index">
			 </AliasItem>
		</ion-list>
		
		<ion-list v-if="!isLoading && type == 'endpoint'">
			<EndpointItem v-for="(endpoint, index) in items"
				:key="endpoint.endpoint"
				:endpoint="endpoint"
				:index="index">
			 </EndpointItem>
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
	// import { } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import HttpService from '../services/http'
	import { isEmail, pluralize, capitalize } from '../services/utils'
	import AliasItem from './AliasItem.vue';
	import EndpointItem from './EndpointItem.vue';
	import DomainItem from './DomainItem.vue';

	const items: Ref<any[]> = ref([]);
	const input:Ref<string> = ref('');
	const isEdit:Ref<boolean> = ref(false);
	const isLoading:Ref<boolean> = ref(false);
	const confirmDelete:Ref<boolean[]> = ref([]);
	const props = defineProps(['type']); // can be 'domain', 'endpoint', 'alias'
	const type:Ref<string> = ref(props.type);
	load();

	async function load() {
		isLoading.value = true;
		let res:any = await HttpService.get(`/${pluralize(type.value)}`);
		items.value = res.data;
		isLoading.value = false;
	}

	async function add() {
		isLoading.value = true;
		input.value.trim()
		if(isEmail(input.value)){
			let res:any = await HttpService.post(`/${type.value}`, { [type.value]: input.value });
			if(res.status == 200) {
				items.value.unshift(res.data)
			}
		}
		input.value = ''
		isLoading.value = false;
	}

	async function remove(i: number) {
		if(confirmDelete.value[i]) {
			isLoading.value = true;
			let body = { [type.value]: items.value[i][type.value] }
			let res:any = await HttpService.delete(`/${type.value}`, { [type.value]: items.value[i].endpoint});
			if(res.status == 200) {
				items.value.splice(i, 1)
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
</style>
../state/state