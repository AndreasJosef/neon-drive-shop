import React from 'react';
import { ArrowRight, Zap, Gamepad2, Cpu, Palette, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-arcade.jpg';
import pcbImage from '@/assets/pcb-neon.jpg';
import controllerImage from '@/assets/controller-neon.jpg';

// Mock function to load products
const loadProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  return response.json();
};

const Index = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: loadProducts,
  });

  const { addItem } = useCart();
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      variantId: product.variants?.[0]?.id,
      qty: 1,
    });
    toast({
      title: "Added to cart! 🕹️",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const categories = [
    {
      id: 'cabinet',
      title: 'Arcade Cabinets',
      description: 'Fully restored vintage arcade machines',
      icon: Gamepad2,
      image: heroImage,
      count: products.filter(p => p.category === 'cabinet').length,
    },
    {
      id: 'pcb',
      title: 'PCB Boards',
      description: 'Original and reproduction game boards',
      icon: Cpu,
      image: pcbImage,
      count: products.filter(p => p.category === 'pcb').length,
    },
    {
      id: 'controller',
      title: 'Controllers',
      description: 'Premium joysticks and button kits',
      icon: Gamepad2,
      image: controllerImage,
      count: products.filter(p => p.category === 'controller').length,
    },
    {
      id: 'artwork',
      title: 'Artwork & Marquees',
      description: 'Authentic cabinet artwork and marquees',
      icon: Palette,
      image: heroImage,
      count: products.filter(p => p.category === 'artwork').length,
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Neon arcade cabinets"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
          <div className="absolute inset-0 grid-background opacity-30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Animated Logo */}
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-primary rounded-full glow-cyan animate-glow-pulse">
                <Zap className="h-16 w-16 text-background" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-transparent bg-gradient-primary bg-clip-text leading-tight">
              PLAYBACK NEON
            </h1>
            
            {/* Tagline */}
            <div className="relative">
              <p className="font-display text-2xl md:text-4xl text-neon-cyan tracking-[0.2em] uppercase animate-glow-pulse">
                INSERT COIN TO CONTINUE
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-primary glow-cyan" />
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto font-light">
              Premium restored arcade cabinets, PCB boards, and retro gaming accessories. 
              Step into the <span className="text-neon-magenta font-semibold">neon-soaked world</span> of classic arcade gaming.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                variant="neon"
                size="lg"
                asChild
                className="text-lg px-8 py-6 animate-float"
              >
                <Link to="/products">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Arcade Treasures
                </Link>
              </Button>
              
              <Button
                variant="neon-outline"
                size="lg"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-neon-cyan">{products.length}+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-neon-magenta">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Tested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-neon-purple">1980+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Since</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neon-cyan mb-4">
              Browse Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of authentic arcade hardware and accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="h-full border-neon-cyan/20 hover:border-neon-cyan/60 transition-all duration-300 overflow-hidden group-hover:glow-cyan bg-gradient-to-br from-background to-secondary/30">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <category.icon className="h-8 w-8 text-neon-cyan mb-2" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-xl text-neon-cyan group-hover:text-neon-magenta transition-colors">
                        {category.title}
                      </h3>
                      <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan">
                        {category.count}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-neon-cyan text-sm font-display font-semibold">
                      Explore Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-neon-magenta mb-4">
              Featured Arcade Machines
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked classics that defined the golden age of arcade gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group border-neon-magenta/20 hover:border-neon-magenta/60 transition-all duration-300 overflow-hidden hover:glow-magenta bg-gradient-to-br from-background to-secondary/20"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-gradient-accent text-foreground border-none">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-neon-magenta transition-colors">
                      {product.title}
                    </h3>
                    <div className="text-right">
                      <div className="font-display font-bold text-neon-magenta">
                        ${product.price.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">{product.price.currency}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 3).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="border-neon-purple/50 text-neon-purple text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="neon-magenta"
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="neon-outline"
                      size="icon"
                      asChild
                    >
                      <Link to={`/products/${product.slug}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="neon-purple"
              size="lg"
              asChild
              className="text-lg px-8 py-6"
            >
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
