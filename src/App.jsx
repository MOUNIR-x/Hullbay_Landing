import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TableOfContents from "./components/TableOfContents";
import MarkdownRenderer from "./components/MarkdownRenderer";
import { docFiles, parseFrontmatter, getBreadcrumbs, sidebarConfig } from "./utils/docs";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import Landing from "./pages/Landing";

// Flatten the sidebar into a single ordered list for prev/next navigation
const getFlatNavItems = () => sidebarConfig.flatMap((cat) => cat.items);

// Compute prev and next items relative to the current doc
const getNavItems = (currentDocId) => {
  const all = getFlatNavItems();
  const idx = all.findIndex((item) => item.id === currentDocId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
};

// Helper to determine the current doc ID from the hash. Returns null if we should show the landing page.
const getDocIdFromHash = () => {
  const hash = window.location.hash.substring(1);
  if (!hash || hash === "/" || hash === "") return null;
  
  // Extract only the document path part before any secondary hash anchor
  const parts = hash.split("#");
  const docPath = parts[0].split("?")[0];
  
  // Check for redirection requests
  if (docPath === "documentation" || docPath === "docs") {
    return "introduction/Pourquoi-hullbay";
  }
  
  // Ensure the document exists in our file map
  if (docFiles[docPath]) {
    return docPath;
  }
  return null; // Fallback to landing if it doesn't match any document
};

export default function App() {
  const [currentDocId, setCurrentDocId] = useState(getDocIdFromHash());
  const [rawContent, setRawContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Listen to hash change for routing
  useEffect(() => {
    const handleHashChange = () => {
      const docId = getDocIdFromHash();
      // Handle redirect if user typed #documentation or #docs manually
      const hash = window.location.hash.substring(1);
      const parts = hash.split("#");
      const docPath = parts[0].split("?")[0];
      if (docPath === "documentation" || docPath === "docs") {
        window.location.hash = "#introduction/Pourquoi-hullbay";
        return;
      }
      
      setCurrentDocId(docId);
      setIsMobileSidebarOpen(false); // Close sidebar on nav
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Check initial redirect on mount
    const hash = window.location.hash.substring(1);
    const parts = hash.split("#");
    const docPath = parts[0].split("?")[0];
    if (docPath === "documentation" || docPath === "docs") {
      window.location.hash = "#introduction/Pourquoi-hullbay";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Load the document content dynamically
  useEffect(() => {
    if (!currentDocId) {
      document.title = "Hullbay — Plateforme PaaS visuelle pour Docker Swarm";
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    setError(null);

    const loadContent = async () => {
      try {
        const loader = docFiles[currentDocId];
        if (!loader) {
          throw new Error(`Document "${currentDocId}" not found.`);
        }
        const module = await loader();
        const textContent = module.default || module;
        
        if (active) {
          const { frontmatter, content } = parseFrontmatter(textContent);
          setRawContent(content);
          setIsLoading(false);

          // Update page title
          document.title = frontmatter.title ? `Hullbay — ${frontmatter.title}` : "Hullbay — Documentation";
          
          // Scroll to top or to specific anchor if present in the hash
          const hashParts = window.location.hash.split("#");
          if (hashParts.length > 2) {
            const anchor = hashParts[2];
            setTimeout(() => {
              const el = document.getElementById(anchor);
              if (el) {
                const yOffset = -70;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }, 100);
          } else {
            window.scrollTo({ top: 0, behavior: "instant" });
          }
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setError(`Failed to load documentation for "${currentDocId}".`);
          setIsLoading(false);
        }
      }
    };

    loadContent();
    return () => {
      active = false;
    };
  }, [currentDocId]);

  if (!currentDocId) {
    return <Landing />;
  }

  const breadcrumbs = getBreadcrumbs(currentDocId);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Container Layout */}
      <div className="mx-auto max-w-[1440px] px-6">
        
        {/* Left Sidebar (Desktop) */}
        <Sidebar currentDocId={currentDocId} />

        {/* Mobile Sidebar Drawer Overlay */}
        {isMobileSidebarOpen && (
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Mobile Sidebar Content */}
        <div 
          className={`fixed bottom-0 top-14 left-0 z-50 w-64 border-r border-gray-200 bg-white px-4 py-6 overflow-y-auto dark:border-gray-800 dark:bg-gray-900 md:hidden transition-transform duration-200 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-6">
            {sidebarConfig.map((category) => (
              <div key={category.title} className="space-y-1.5">
                <div className="px-1 text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
                  {category.title}
                </div>
                <div className="space-y-1 pl-1">
                  {category.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex w-full items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        item.id === currentDocId
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Central Content Area wrapper */}
        <main className="md:pl-64 lg:pr-60 transition-all duration-200 min-h-[calc(100vh-3.5rem)] py-8">
          <div className="max-w-3xl mx-auto xl:max-w-none xl:px-8">
            
            {/* Breadcrumbs navigation */}
            <div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span>{crumb}</span>
                  {idx < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
                </React.Fragment>
              ))}
            </div>

            {/* Main Content Card / Loading / Error */}
            {isLoading ? (
              <div className="flex h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-800 dark:border-t-blue-400" />
              </div>
            ) : error ? (
              <div className="my-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-300">
                {error}
              </div>
            ) : (
              <>
                <article className="prose dark:prose-invert max-w-none">
                  <MarkdownRenderer rawContent={rawContent} />
                </article>

                {/* Prev / Next navigation */}
                {(() => {
                  const { prev, next } = getNavItems(currentDocId);
                  if (!prev && !next) return null;
                  return (
                    <nav className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 flex items-stretch justify-between gap-4">
                      {prev ? (
                        <a
                          href={`#${prev.id}`}
                          className="group flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-4 text-sm transition-colors hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-950/30 max-w-[48%]"
                        >
                          <ChevronLeft className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <div className="text-left">
                            <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-0.5">Précédent</div>
                            <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{prev.label}</div>
                          </div>
                        </a>
                      ) : <div />}
                      {next ? (
                        <a
                          href={`#${next.id}`}
                          className="group flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-4 text-sm transition-colors hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-950/30 max-w-[48%] ml-auto"
                        >
                          <div className="text-right">
                            <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-0.5">Suivant</div>
                            <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{next.label}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </a>
                      ) : <div />}
                    </nav>
                  );
                })()}
              </>
            )}
          </div>
        </main>

        {/* Right Table of Contents Sidebar (Desktop) */}
        {!isLoading && !error && <TableOfContents content={rawContent} />}
      </div>

      {/* Floating Action Button (Mobile Sidebar Switcher) */}
      <button
        onClick={() => setIsMobileSidebarOpen(prev => !prev)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 md:hidden dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform active:scale-95"
        title="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}
