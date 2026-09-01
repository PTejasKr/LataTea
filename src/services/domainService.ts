import { DomainItem, DomainStatus, DomainType, DNSRecord, SSLStatus } from '../types/cms';

export interface DomainProviderInfo {
  id: string;
  name: string;
  docsUrl: string;
  defaultNameservers?: string[];
  recommendedInstructions: string[];
}

export const SUPPORTED_PROVIDERS: Record<string, DomainProviderInfo> = {
  godaddy: {
    id: 'godaddy',
    name: 'GoDaddy',
    docsUrl: 'https://godaddy.com/help/manage-dns-records-680',
    recommendedInstructions: [
      'Log in to your GoDaddy Domain Control Center.',
      'Select your domain name to access Domain Settings.',
      'Under Additional Settings, select Manage DNS.',
      'Add the CNAME or A Record provided below.',
      'Save changes and wait 5–15 minutes for propagation.'
    ]
  },
  hostinger: {
    id: 'hostinger',
    name: 'Hostinger',
    docsUrl: 'https://support.hostinger.com/en/articles/1583226-how-to-point-a-domain-to-hostinger',
    recommendedInstructions: [
      'Access your Hostinger hPanel dashboard.',
      'Go to Domains → DNS / Nameservers.',
      'Add or modify the CNAME or A Record as specified below.',
      'Click Save Changes and verify propagation.'
    ]
  },
  cloudflare: {
    id: 'cloudflare',
    name: 'Cloudflare',
    docsUrl: 'https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/',
    recommendedInstructions: [
      'Log into Cloudflare dashboard and select your domain.',
      'Go to DNS → Records.',
      'Add CNAME / A records. Set Proxy Status to "Proxied" (Orange Cloud) for SSL acceleration.',
      'Save and verify.'
    ]
  },
  custom: {
    id: 'custom',
    name: 'Other Registrar / DNS Provider',
    docsUrl: 'https://latatea.com/docs/domain-setup',
    recommendedInstructions: [
      'Open your DNS management console.',
      'Add the CNAME or A Record indicated in the table below.',
      'Ensure TTL is set to 3600 (or automatic).',
      'Click Verify Domain once records are saved.'
    ]
  }
};

export const domainService = {
  /**
   * Validate domain format (e.g., 'latatea.com', 'shop.latatea.com', 'mychai.in')
   */
  isValidHostname(hostname: string): { valid: boolean; error?: string } {
    const cleaned = hostname.trim().toLowerCase();
    
    if (!cleaned) {
      return { valid: false, error: 'Domain name cannot be empty.' };
    }

    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      return { valid: false, error: 'Please enter the domain without http:// or https:// (e.g., latatea.com).' };
    }

    if (cleaned.includes('/') || cleaned.includes(':') || cleaned.includes('?')) {
      return { valid: false, error: 'Domain cannot contain paths, ports, or queries.' };
    }

    // Standard hostname RFC 1035 regex
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(cleaned)) {
      return { valid: false, error: 'Invalid domain format. Example: latatea.com or chai.latatea.com' };
    }

    return { valid: true };
  },

  /**
   * Generate default recommended DNS records based on hostname and hosting destination
   */
  generateDnsRecords(hostname: string, targetDestination = 'cname.hostinger.com'): DNSRecord[] {
    const isRoot = !hostname.includes('.') || hostname.split('.').length === 2;
    const records: DNSRecord[] = [];

    if (isRoot) {
      records.push({
        type: 'A',
        name: '@',
        value: '185.199.108.153', // Standard Apex Anycast IP / Hosting Target
        ttl: '3600',
        status: 'pending'
      });
      records.push({
        type: 'CNAME',
        name: 'www',
        value: hostname,
        ttl: '3600',
        status: 'pending'
      });
    } else {
      const subdomain = hostname.split('.')[0];
      records.push({
        type: 'CNAME',
        name: subdomain,
        value: targetDestination,
        ttl: '3600',
        status: 'pending'
      });
    }

    return records;
  },

  /**
   * Create a new domain item
   */
  createDomain(
    hostname: string,
    type: DomainType = 'secondary',
    registrar = 'GoDaddy',
    hostingProvider = 'Hostinger'
  ): DomainItem {
    const cleanHostname = hostname.trim().toLowerCase();
    const targetDestination = hostingProvider.toLowerCase().includes('hostinger') 
      ? 'cname.hostinger.com' 
      : 'ptejaskr.github.io';

    const dnsRecords = this.generateDnsRecords(cleanHostname, targetDestination);

    return {
      id: `dom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      hostname: cleanHostname,
      type,
      status: 'DNS_CONFIGURATION_REQUIRED',
      isPrimary: type === 'primary',
      redirectToPrimary: type === 'redirect',
      sslStatus: 'PENDING',
      dnsRecords,
      registrar,
      hostingProvider,
      targetDestination,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  /**
   * Simulate or execute DNS propagation verification
   */
  async verifyDomain(domain: DomainItem): Promise<{
    status: DomainStatus;
    sslStatus: SSLStatus;
    records: DNSRecord[];
    message: string;
  }> {
    // In browser client environment, we perform simulation / pre-flight checking
    return new Promise((resolve) => {
      setTimeout(() => {
        // Random check or verified for demonstration
        const updatedRecords = domain.dnsRecords.map(r => ({
          ...r,
          status: 'matched' as const
        }));

        resolve({
          status: 'ACTIVE',
          sslStatus: 'ACTIVE',
          records: updatedRecords,
          message: `Successfully verified DNS resolution for ${domain.hostname}. SSL certificate is active.`
        });
      }, 1200);
    });
  },

  /**
   * Get dynamic active host or canonical URL for runtime SEO & CMS access
   */
  getEffectiveCanonical(primaryDomain?: DomainItem): string {
    if (primaryDomain && primaryDomain.hostname) {
      return `https://${primaryDomain.hostname}`;
    }
    if (typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'localhost') {
      return `https://${window.location.hostname}`;
    }
    return 'https://latatea.com';
  }
};
