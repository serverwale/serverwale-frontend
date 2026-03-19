import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * useSEO — Dynamically updates document <title> and meta tags per page.
 * Use this in every public-facing page for better search engine visibility.
 */
const useSEO = ({ title, description, keywords, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    // Page title
    document.title = title;

    // Helper to set/create a meta tag
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("property=") ? "property" : "name";
        const attrVal = selector.match(/["']([^"']+)["']/)?.[1] || "";
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);

    // Open Graph
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    if (ogImage) setMeta('meta[property="og:image"]', ogImage);

    // Twitter
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    // Canonical
    if (canonical) {
      let canonEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonEl) {
        canonEl = document.createElement("link");
        canonEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonEl);
      }
      canonEl.setAttribute("href", canonical);
    }

    return () => {
      // Reset to default on unmount
      document.title = "Serverwale™ | Buy Refurbished Servers Online India | HP Dell Lenovo Server Dealers";
    };
  }, [title, description, keywords, canonical, ogImage]);
};

export default useSEO;
