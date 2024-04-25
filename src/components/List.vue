<template>
	<div class="small-container">
		<div class="sticky">
			<div class="space-between">
				<div class="title">{{`${capitalize(pluralize(type))}`}}<span v-if="items.length > 0">{{` (${items.length})`}}</span></div>
				<ion-button
					fill="clear"
					shape="round"
					class="refresh-button"
					@click="() => load()"
					:disabled="loading">
					<ion-icon :ios="refreshCircleOutline" slot="icon-only"></ion-icon>
				</ion-button>
			</div>
			<ion-item lines="none" v-if="type == 'domain'">
				<ion-input
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
					fill="outline"
					:disabled="loading">
						Add
				</ion-button>
			</ion-item>

			<ion-item lines="none" v-if="type == 'webhook'">
				<ion-input
					aria-label="Webhook URL"
					v-model="webhookInput"
					autofocus
					:placeholder="`add webhook url...`"
					@keyup.enter="add"
					:disabled="loading">
				</ion-input>
				<ion-button 
					slot="end"
					@click="add()"
					shape="round"
					size="small"
					fill="outline"
					:disabled="loading">
						Add
				</ion-button>
				<ion-button 
					slot="end"
					@click="edit()"
					shape="round"
					size="small"
					fill="outline"
					:disabled="loading">
						{{ editing ? 'Done' : 'Edit' }}
				</ion-button>
			</ion-item>

			<ion-grid v-if="type == 'alias'" lines="none" class="ion-no-padding">
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
								fill="outline"
								:disabled="loading">
									Add
							</ion-button>
							<ion-button 
								slot="end"
								@click="edit()"
								shape="round"
								size="small"
								fill="outline"
								:disabled="loading">
									{{ editing ? 'Done' : 'Edit' }}
							</ion-button>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-grid>
			<hr/>
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

		<ion-list v-if="!loading && type == 'webhook'">
			<WebhookItem v-for="(webhook, index) in items"
				:key="webhook.webhook"
				:webhook="webhook"
				:index="index"
				:editing="editing"
				@remove="remove"
				@toggle="toggle">
			 </WebhookItem>
			 <hr  v-if="items.length > 0"/>
			 <WebhookInfo></WebhookInfo>
		</ion-list>

		
		<ion-list v-if="!loading && type == 'message'">
			<MessageItem v-for="(message) in items"
				:key="message.message"
				:message="message">
			 </MessageItem>
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
	import { refreshOutline, refreshCircle, refreshCircleOutline } from 'ionicons/icons';
	import { ref, watch, Ref } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import HttpService from '../services/http';
	import { isEmail, isDomainName, isURL, pluralize, capitalize } from '../services/utils';
	import { error } from '../services/dialog';
	import DomainItem from './DomainItem.vue';
	import EndpointItem from './EndpointItem.vue';
	import AliasItem from './AliasItem.vue';
	import WebhookItem from './WebhookItem.vue';
	import WebhookInfo from './WebhookInfo.vue';
	import MessageItem from './MessageItem.vue';

	const items: Ref<any[]> = ref([]);
	const domainInput:Ref<string> = ref('');
	const aliasInput:Ref<string> = ref('');
	const webhookInput:Ref<string> = ref('');
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

	// FIXME: wanted /domains to reload when coming back from /domains/:id
	// watch(route, async (to, from) => {
	// 	if(from.path.includes('/domains/')) {
	// 		await load();
	// 	}
	// });

	async function add() {
		if(type.value == 'domain') {
			await addDomain();
		} else if(type.value == 'alias') {
			await addAlias();
		} else if(type.value == 'webhook') {
			await addWebhook();
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

	async function addWebhook() {
		const loadingCtrl = await loadingController.create({spinner: "dots", duration: 15000});
		try {
			webhookInput.value.trim()
			if(isURL(webhookInput.value)){
				await loadingCtrl.present();
				let res:any = await HttpService.post(`/webhook`, { webhook: webhookInput.value });
				if(res.status == 200) {
					items.value.unshift(res.data)
				}
				loadingCtrl.dismiss();	
			} else {
				error("Not a valid URL in the form: https://example.com/webhook")
				return;
			}
			webhookInput.value = '';
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
			const body = { [type.value]: items.value[i][type.value], enabled: items.value[i].enabled }
			const res:any = await HttpService.put(`/${type.value}`, body);
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

	.refresh-button {
		--padding-top: 0;
		--padding-bottom: 0;
		--padding-start: 0;
		--padding-end: 0;
		max-height: 0px !important;
		margin-top: 48px;
		margin-bottom: -30px;
		margin-right: 12px;
	}

	.refresh-button .button-native {
		padding: 0 !important;
	}
</style>
../state/state