<template>
	<ion-item
		:key="domain.domain"
		lines="none"
		class="animated fadeIn faster">
			<ion-icon 
				v-if="domain.dns.ok"
				slot="start" 
				:ios="checkmarkCircle" 
				color="primary">
			</ion-icon>
			<ion-icon 
				v-if="!domain.dns.ok"
				slot="start" 
				:ios="removeCircleOutline" 
				color="medium">
			</ion-icon>
			<ion-label class="no-disable">
					{{ domain.domain }}
					<br>
					<span class="monospace" style="font-size: 0.8em">
						<span :class="domain.dns.SPF ? 'text-primary' : 'text-medium'"><ion-icon :ios="domain.dns.SPF ? checkmark : close"></ion-icon>spf</span>&nbsp;
						<span :class="domain.dns.DKIM ? 'text-primary' : 'text-medium'"><ion-icon :ios="domain.dns.DKIM ? checkmark : close"></ion-icon>dkim</span>&nbsp;
						<span :class="domain.dns.RP ? 'text-primary' : 'text-medium'"><ion-icon :ios="domain.dns.RP ? checkmark : close"></ion-icon>rp</span>&nbsp;
						<span :class="domain.dns.MX ? 'text-primary' : 'text-medium'"><ion-icon :ios="domain.dns.MX ? checkmark : close"></ion-icon>mx</span>
					</span>
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
				@click="removeItem(index)">
				Confirm
			</ion-button>
			<ion-button
				v-if="!domain.dns.ok"
				slot="end" 
				color="medium" 
				shape="round"
				@click="() => view()">
					Setup&nbsp;DNS
			</ion-button>
			<ion-button
				v-if="domain.dns.ok"
				slot="end" 
				fill="outline"
				color="primary" 
				shape="round"
				@click="() => view()">
					DNS
			</ion-button>
	</ion-item>
</template>

<script setup lang="ts">
	import { 
		IonItem, 
		IonLabel, 
		IonButton, 
		IonIcon
	} from '@ionic/vue';
	import { closeCircle, checkmark, checkmarkCircle, removeCircleOutline, close } from 'ionicons/icons';
	import { ref, Ref } from 'vue';
	import { useRouter } from 'vue-router';

	const props = defineProps(['domain', 'index']);

	const domain = props.domain
	const index = props.index
	const isEdit:Ref<boolean> = ref(false);
	const confirmDelete: Ref<boolean> = ref(false);
	const router = useRouter();

	function view() {
		console.log("view()");
		router.push(`/domains/${domain.domain}`)
	}

	function removeItem(i: number) {
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