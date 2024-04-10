import { Ref } from 'vue';

interface Domain {
	domain: string;
	dns: {
		SPF: string;
		DKIM: string;
		RP: string;
		MX: string;
	}
}

interface Endpoint {
	endpoint: string;
}

interface Alias {
	alias: string;
	endpoint: string;
	enabled: boolean;
}

export type { Ref, Domain, Endpoint, Alias }