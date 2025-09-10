import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';

// Mock function to load products - in a real app this would be an API call
const loadProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  return response.json();
};

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, getItemCount, getSubtotal } = useCart();
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: loadProducts,
  });

  const itemCount = getItemCount();
  const subtotal = getSubtotal(products);
  const tax = subtotal * siteConfig.taxRate;
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : 50;
  const total = subtotal + tax + shipping;

  const getProductDetails = (productId: string, variantId?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;

    let price = product.price.amount;
    let title = product.title;
    let image = product.images[0];

    if (variantId && product.variants) {
      const variant = product.variants.find(v => v.id === variantId);
      if (variant) {
        price = variant.price.amount;
        title = `${product.title} - ${variant.title}`;
        image = variant.image || image;
      }
    }

    return { product, price, title, image };
  };

  if (itemCount === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-background border-l border-neon-cyan/20">
          <SheetHeader className="border-b border-neon-cyan/20 pb-4">
            <SheetTitle className="font-display text-neon-cyan tracking-wider flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-6 rounded-full bg-secondary mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl text-neon-cyan mb-2">Empty Cart</h3>
            <p className="text-muted-foreground mb-6">
              Your cart is empty. Start browsing our arcade treasures!
            </p>
            <Button 
              variant="neon" 
              asChild
              onClick={closeCart}
            >
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-background border-l border-neon-cyan/20 flex flex-col">
        <SheetHeader className="border-b border-neon-cyan/20 pb-4">
          <SheetTitle className="font-display text-neon-cyan tracking-wider flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            <Badge className="bg-gradient-primary text-background border-none">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto py-4">
          <div className="space-y-4">
            {items.map((item) => {
              const details = getProductDetails(item.productId, item.variantId);
              if (!details) return null;

              const { product, price, title, image } = details;

              return (
                <div
                  key={`${item.productId}-${item.variantId || 'default'}`}
                  className="flex items-center space-x-4 p-4 border border-neon-cyan/20 rounded-lg hover:border-neon-cyan/40 transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 object-cover rounded-lg border border-neon-cyan/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {title}
                    </h4>
                    <p className="text-sm text-neon-cyan font-display">
                      ${price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-neon-cyan/30 hover:border-neon-cyan"
                      onClick={() => updateQuantity(item.productId, item.variantId, item.qty - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-display text-neon-cyan min-w-[2rem] text-center">
                      {item.qty}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-neon-cyan/30 hover:border-neon-cyan"
                      onClick={() => updateQuantity(item.productId, item.variantId, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-neon-cyan/20 pt-4 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-display">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Shipping {subtotal >= siteConfig.freeShippingThreshold && '(Free!)'}
              </span>
              <span className="font-display">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < siteConfig.freeShippingThreshold && (
              <p className="text-xs text-neon-cyan">
                Add ${(siteConfig.freeShippingThreshold - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <div className="flex justify-between font-bold border-t border-neon-cyan/20 pt-2">
              <span className="font-display text-neon-cyan">Total</span>
              <span className="font-display text-neon-cyan">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="neon"
              className="w-full"
              asChild
              onClick={closeCart}
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button
              variant="neon-outline"
              className="w-full"
              asChild
              onClick={closeCart}
            >
              <Link to="/cart">View Full Cart</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};