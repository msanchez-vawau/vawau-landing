export {}

declare global {
  interface Window {
    trackEvent?: (name: string) => void
  }
}