import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Instagram } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neon-cyan/20 bg-background/95 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-primary rounded-lg group-hover:glow-cyan transition-all duration-300">
                <Zap className="h-5 w-5 text-background" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-neon-cyan tracking-wider">
                  {siteConfig.brand}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-display">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-neon-cyan tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {siteConfig.categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-neon-cyan tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
                >
                  Returns Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-neon-cyan tracking-wider">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan hover:glow-cyan transition-all duration-300"
              >
                <Twitter className="h-4 w-4 text-neon-cyan" />
              </a>
              <a
                href="#"
                className="p-2 border border-neon-magenta/30 rounded-lg hover:border-neon-magenta hover:glow-magenta transition-all duration-300"
              >
                <Instagram className="h-4 w-4 text-neon-magenta" />
              </a>
              <a
                href="#"
                className="p-2 border border-neon-purple/30 rounded-lg hover:border-neon-purple hover:glow-purple transition-all duration-300"
              >
                <Github className="h-4 w-4 text-neon-purple" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Follow us for the latest arcade finds and restoration updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neon-cyan/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {siteConfig.brand}. All rights reserved. Made with ⚡ for retro gaming enthusiasts.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-neon-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-neon-cyan transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};