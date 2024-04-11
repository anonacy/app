<template>
	<div class="small-container">
		<div class="sticky">
			<div class="space-between">
				<div class="title monospace">
					<!-- <ion-button 
						style="margin-top: -12px; margin-right: -px; padding: 0;"
						@click="() => back()"
						fill="clear">
						<ion-icon :ios="arrowBack" color="primary"></ion-icon>
					</ion-button> -->
					<span class="highlight" @click="router.back">
						<ion-icon :ios="arrowBack" color="primary"></ion-icon>
						{{ domain }}
						</span>&nbsp;<span class="text-medium">setup</span></div>
				<ion-button 
					@click="() => load()"
					shape="round"
					fill="outline"
					size="small"
					style="height: 32px; margin-top: 52px;">
					Recheck DNS
				</ion-button>
			</div>
		</div>

		<div style="display: flex; justify-content: center; width: 100%; padding-top: 50px;">
			<ion-spinner v-if="loading" name="dots"></ion-spinner>
		</div>

		<div v-if="dns.ok && !loading">
			<div v-for="(key, index) in Object.keys(dns)">
				<ion-chip v-if="key != 'ok'" class="chip-note">
					<ion-icon :ios="checkmarkCircle" color="success"></ion-icon>
					<ion-label>
						{{ words[key] }} is setup correctly
					</ion-label>
				</ion-chip>
			</div>
		</div>

		<div v-if="setup.length > 0 && !loading">
			<ion-card v-for="(record, index) in setup" class="monospace">
				<ion-card-header>
					<ion-card-subtitle class="text-white">{{ record.title }}</ion-card-subtitle>
				</ion-card-header>

				<ion-card-content>
					<p>
						type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-white">{{ record.type }}</span>
						<br>
						name:&nbsp;&nbsp;&nbsp;&nbsp;
							<span class="text-white">{{ record.name }}</span>
							<span v-if="record.name == '@' && extractSubdomain(domain) != ''">{{ ` (${extractSubdomain(domain)})` }}</span>
							<span v-if="record.name != '@' && extractSubdomain(domain) != ''">{{ `.${extractSubdomain(domain)}` }}</span>
						<br>
						content:&nbsp;&nbsp;<span class="text-white">{{ record.content }}</span>
						<br>
						<span v-if="record.type == 'MX'">
							priority:&nbsp;<span class="text-white">{{ record.priority }}</span>
							<br>
						</span>
						<hr>
						<span v-if="record.title.includes('SPF')">
							You should have a <span class="text-white">{{ record.type }}</span> record for <span class="text-white">{{ domain }}</span> with the content above
						</span>
						<span v-if="record.title.includes('DKIM')">
							You should have a <span class="text-white">{{ record.type }}</span> record for <span class="text-white">{{ record.name }}.{{ domain }}</span> with the content above
						</span>
						<span v-if="record.title.includes('Return Path')">
							You should have a <span class="text-white">{{ record.type }}</span> record for <span class="text-white">{{ record.name }}.{{ domain }}</span> with the content <span class="text-white">{{ record.content }}</span>
						</span>
						<span v-if="record.title.includes('MX')">
							You should have a <span class="text-white">{{ record.type }}</span> record for <span class="text-white">{{ domain }}</span> with the content <span class="text-white">{{ record.content }}</span> and priority <span class="text-white">{{ record.priority }}</span>
						</span>

					</p>
				</ion-card-content>
			</ion-card>
		</div>
	</div>

</template>

<script setup lang="ts">
	import { 
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardSubtitle,
		IonCardContent,
		IonSpinner,
		IonButton,
		IonChip,
		IonIcon,
		IonLabel,

	} from '@ionic/vue';
	import { refreshCircleOutline, checkmarkCircle, arrowBack } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import HttpService from '../services/http'
	import { extractSubdomain } from '../services/utils';
	import router from '@/router';

	const props = defineProps(['domain', 'index']);
	const loading:Ref<boolean> = ref(false);
	const dns: Ref<any> = ref({});
	const setup: Ref<any[]> = ref([]);
	const words: Ref<any> = ref({ 
		SPF: "SPF Record", 
		DKIM: "DKIM Record", 
		RP: "Return Path", 
		MX: "MX Record"
	});
	const showingNote: Ref<number> = ref(-1);

	load();

	function showNote(i: number) {
		if (showingNote.value == i) {
			showingNote.value = -1;
		} else {
			showingNote.value = i;
		}
	}

	async function load() {
		loading.value = true;
		let res:any = await HttpService.get(`/domain`, { domain: props.domain });
		console.log("res: ", res.data);
		setup.value = res.data.setup;
		dns.value = res.data.dns;
		console.log(setup.value);
		console.log(dns.value);
		loading.value = false;
	}

	function remove(i: number) {
		// todos.value.splice(i, 1)
	}

</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}
</style>
../state/state