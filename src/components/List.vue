<template>
	<div class="small-container">
		<div class="sticky">
			<div class="title">{{`${capitalize(pluralize(type))}`}}<span v-if="items.length > 0">{{` (${items.length})`}}</span></div>
			<ion-item lines="none" v-if="type == 'domain'">
				<ion-input
					slot="start"
					aria-label="Domain Name"
					v-model="domainInput"
					autofocus
					:placeholder="`Add domain name...`"
					@keyup.enter="add"
					:disabled="loading">
				</ion-input>
				<ion-button 
					slot="end"
					@click="add()"
					shape="round"
					size="small"
					fill="solid"
					:disabled="loading">
						Add
				</ion-button>
				<ion-button
					fill="solid"
					shape="round"
					size="small"
					slot="end"
					@click="() => load()"
					:disabled="loading">
					<ion-icon :ios="refreshOutline"></ion-icon>
				</ion-button>
			</ion-item>

			<ion-grid v-if="type == 'alias'" lines="none">
				<ion-row>
					<ion-col size="5">
						<ion-item lines="none">
							<ion-input
								slot="start"
								aria-label="Alias Email"
								v-model="aliasInput"
								label="Alias"
								label-placement="stacked"
								autofocus
								:placeholder="`Enter alias email...`"
								@keyup.enter="add"
								:disabled="loading">
							</ion-input>
						</ion-item>
					</ion-col>
					<ion-col size="7">
						<ion-item lines="none">
							<ion-input
								slot="start"
								aria-label="Endpoint Email"
								v-model="endpointInput"
								label="Endpoint"
								label-placement="stacked"
								autofocus
								:placeholder="`Enter endpoint email...`"
								@keyup.enter="add"
								:disabled="loading">
							</ion-input>
							<ion-button 
								slot="end"
								@click="add()"
								shape="round"
								size="small"
								fill="solid"
								:disabled="loading">
									Add
							</ion-button>
							<ion-button 
								slot="end"
								@click="edit()"
								shape="round"
								size="small"
								fill="solid"
								:disabled="loading">
									{{ editing ? 'Done' : 'Edit' }}
							</ion-button>
							<ion-button
								fill="solid"
								shape="round"
								size="small"
								slot="end"
								@click="() => load()"
								:disabled="loading">
								<ion-icon :ios="refreshOutline"></ion-icon>
							</ion-button>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-grid>
			<hr style="margin-right: 30px"/>
		</div>

		<div v-if="loading" style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner name="dots"></ion-spinner>
		</div>
		
		<ion-list v-if="!loading && type == 'domain'">
			<DomainItem v-for="(domain, index) in items"
				:key="domain.domain"
				:domain="domain"
				:index="index"
				tappable>
			 </DomainItem>
		</ion-list>
		
		<ion-list v-if="!loading && type == 'alias'">
			<AliasItem v-for="(alias, index) in items"
				:key="alias.alias"
				:alias="alias"
				:index="index"
				:editing="editing"
				@remove="remove"
				@toggle="toggle">
			 </AliasItem>
		</ion-list>
		
		<ion-list v-if="!loading && type == 'endpoint'">
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
		IonSpinner,
		IonGrid,
		IonRow,
		IonCol,
		loadingController
	} from '@ionic/vue';
	import { refreshOutline } from 'ionicons/icons';
	import { ref, watch, Ref } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import HttpService from '../services/http'
	import { isEmail, isDomainName, pluralize, capitalize } from '../services/utils'
	import AliasItem from './AliasItem.vue';
	import EndpointItem from './EndpointItem.vue';
	import DomainItem from './DomainItem.vue';

	const items: Ref<any[]> = ref([]);
	const domainInput:Ref<string> = ref('');
	const aliasInput:Ref<string> = ref('');
	const endpointInput:Ref<string> = ref('');
	const editing:Ref<boolean> = ref(false);
	const loading:Ref<boolean> = ref(false);
	const confirmDelete:Ref<boolean[]> = ref([]);
	const props = defineProps(['type']); // can be 'domain', 'endpoint', 'alias'
	const type:Ref<string> = ref(props.type);
	const route = useRoute();

	load();

	async function load() {
		loading.value = true;
		items.value = (await HttpService.get(`/${pluralize(type.value)}`)).data;
		loading.value = false;
	}

	watch(route, async (to, from) => {
		await load();
	});

	async function add() {
		if(type.value == 'domain') {
			await addDomain();
		} else if(type.value == 'alias') {
			await addAlias();
		}
	}

	async function addDomain() {
		const loadingCtrl = await loadingController.create({spinner: "dots", duration: 15000});
		try {
			domainInput.value.trim()
			if(isDomainName(domainInput.value)){
				await loadingCtrl.present();
				let res:any = await HttpService.post(`/domain`, { domain: domainInput.value });
				if(res.status == 200) {
					items.value.unshift(res.data)
				}
				loadingCtrl.dismiss();	
			} else {
				return;
			}
			domainInput.value = '';
		}catch (e:any) {
			console.log("e.message: ", e.message);	
			loadingCtrl.dismiss();	
		}
	}

	async function addAlias() {
		const loadingCtrl = await loadingController.create({spinner: "dots", duration: 15000});
		try {
			aliasInput.value.trim()
			endpointInput.value.trim()
			if(isEmail(aliasInput.value) && isEmail(endpointInput.value)){
				await loadingCtrl.present();
				const body = { alias: aliasInput.value, endpoint: endpointInput.value }
				let res:any = await HttpService.post(`/alias`, body);
				if(res.status == 200) {
					items.value.unshift(res.data);
				}
				loadingCtrl.dismiss();	
			} else {
				return;
			}
			aliasInput.value = '';
			endpointInput.value = '';
		} catch (e:any) {
			console.log("e.message: ", e.message);
			loadingCtrl.dismiss();	
		}
	}

	async function remove(i: number) {
		const loadingCtrl = await loadingController.create({spinner: "dots", duration: 15000});
		try {
			await loadingCtrl.present();
			const body = { [type.value]: items.value[i][type.value] }
			const res:any = await HttpService.delete(`/${type.value}`, body);
			if(res.status == 200) {
				items.value.splice(i, 1)
				confirmDelete.value[i] = false;
			}
			loadingCtrl.dismiss();
		} catch (e:any) {
			console.log("e.message: ", e.message);
			loadingCtrl.dismiss();
		}

	}

	async function toggle(i: number) {
		const loadingCtrl = await loadingController.create({spinner: "dots", duration: 15000});
		try {
			await loadingCtrl.present();
			const body = { alias: items.value[i].alias, enabled: items.value[i].enabled }
			const res:any = await HttpService.put(`/alias`, body);
			if(res.status == 200) {
				items.value[i].enabled = items.value[i].enabled;
			}
			loadingCtrl.dismiss();
		} catch (e:any) {
			console.log("e.message: ", e.message);
			loadingCtrl.dismiss();
		}

	}

	function edit() {
		editing.value = !editing.value;
		confirmDelete.value.fill(false);
	}
</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}
</style>
../state/state