import { ref } from 'vue'

interface Country {
  name: string;
}

interface Region {
  name: string;
  countries: Country[];
}

export function useRegions() {
  const regions = ref<Record<string, Region>>({
    americas: {
      name: 'Americas',
      countries: [
        { name: 'Argentina' },
        { name: 'Brazil' },
        { name: 'Canada' },
        { name: 'Chile' },
        { name: 'Colombia' },
        { name: 'Mexico' },
        { name: 'Peru' },
        { name: 'United States' }
      ]
    },
    asia_pacific: {
      name: 'Asia Pacific',
      countries: [
        { name: 'Australia' },
        { name: 'Hong Kong' },
        { name: 'India' },
        { name: 'Japan' },
        { name: 'New Zealand' },
        { name: 'Singapore' }
      ]
    },
    emea: {
      name: 'EMEA',
      countries: [
        { name: 'Belgium' },
        { name: 'France' },
        { name: 'Germany' },
        { name: 'Ireland' },
        { name: 'Italy' },
        { name: 'Netherlands' },
        { name: 'Portugal' },
        { name: 'Spain' },
        { name: 'United Arab Emirates' },
        { name: 'United Kingdom' }
      ]
    }
  })

  return {
    regions
  }
}
