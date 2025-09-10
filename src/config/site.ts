export const siteConfig = {
  brand: "Playback Neon",
  tagline: "INSERT COIN TO CONTINUE",
  description: "Premium restored arcade cabinets, PCB boards, and retro gaming accessories. Step into the neon-soaked world of classic arcade gaming.",
  currency: "USD" as const,
  taxRate: 0.08,
  freeShippingThreshold: 200,
  features: {
    cartDrawer: true,
    soundEffects: false,
    scanlinesToggle: true,
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Cabinets", href: "/products?category=cabinet" },
    { name: "PCBs", href: "/products?category=pcb" },
    { name: "Controllers", href: "/products?category=controller" },
    { name: "Artwork", href: "/products?category=artwork" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  categories: [
    { id: "cabinet", name: "Arcade Cabinets", icon: "🕹️" },
    { id: "pcb", name: "PCB Boards", icon: "🔧" },
    { id: "controller", name: "Controllers", icon: "🎮" },
    { id: "artwork", name: "Artwork & Marquees", icon: "🎨" },
  ],
};