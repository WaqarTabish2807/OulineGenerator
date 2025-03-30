import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 px-4 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Blog Outline Generator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Create professional blog outlines with our AI-powered outline generator.
              Upload your own templates and get consistent results for all your content.
            </p>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    About
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/templates">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Templates
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Pricing
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Help Center
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    FAQ
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Contact Us
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Privacy Policy
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Terms of Service
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <div className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors cursor-pointer">
                    Cookie Policy
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Blog Outline Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}