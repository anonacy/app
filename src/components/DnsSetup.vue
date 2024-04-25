<template>
	<div class="small-container">
		<div class="sticky">
			<div class="space-between">
				<div class="title monospace">
					<span class="highlight" @click="router.back">
						<ion-icon :ios="arrowBack" color="primary"></ion-icon>
						{{ domain }}
						</span>
					</div>
				<ion-button 
					@click="() => load()"
					shape="round"
					fill="outline"
					size="small"
					style="height: 28px; margin-top: 48px;">
					Verify DNS
				</ion-button>
			</div>
			<hr/>
		</div>

		<div v-if="loading" style="display: flex; justify-content: center; width: 100%;">
			<ion-spinner name="dots"></ion-spinner>
		</div>

		<ion-card v-if="!loading">
			<div v-for="(key, index) in Object.keys(dns)">
				<ion-chip v-if="key != 'ok' && dns[key]" class="chip-note">
					<ion-icon :ios="checkmarkCircle" color="success"></ion-icon>
					<ion-label>
						{{ words[key] }} is setup correctly
					</ion-label>
				</ion-chip>
			</div>
		</ion-card>

		<div v-if="setup.length > 0 && !loading">
			<div v-for="(record, index) in setup">
				<ion-card v-if="!record.ok" class="monospace">
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
	</div>

</template>

<script setup lang="ts">
	import { 
		IonCard,
		IonCardHeader,
		IonCardSubtitle,
		IonCardContent,
		IonSpinner,
		IonButton,
		IonChip,
		IonIcon,
		IonLabel,

	} from '@ionic/vue';
	import { checkmarkCircle, arrowBack } from 'ionicons/icons';
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

	load();

	async function load() {
		loading.value = true;
		let res:any = await HttpService.get(`/domain`, { domain: props.domain });
		setup.value = res.data.setup;
		dns.value = res.data.dns;
		loading.value = false;
	}

</script>

<style scoped>
	ion-item {
		--background-hover-opacity: 0;
	}
</style>