import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Sun, Moon } from "lucide-react";
import { docFiles, indexDocsForSearch } from "../utils/docs";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const modalRef = useRef(null);

  // Initialize theme
  // Initialize theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = document.documentElement.classList.contains("dark") || stored === "dark" || (!stored && prefersDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(isDark);
  }, []);

  // Fetch index when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchIndex.length === 0) {
      indexDocsForSearch().then(index => setSearchIndex(index));
    }
  }, [isSearchOpen]);

  // Handle query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = searchIndex.filter(item => {
      return (
        item.title.toLowerCase().includes(query) ||
        (item.snippet && item.snippet.toLowerCase().includes(query)) ||
        item.id.toLowerCase().includes(query)
      );
    });
    setSearchResults(filtered.slice(0, 10)); // Limit to top 10 results
  }, [searchQuery, searchIndex]);

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Listen to keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleSelectResult = (hash) => {
    window.location.hash = hash;
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6">

        {/* Left Side: Brand */}
        <div className="flex items-center gap-2">
          <a href="#introduction/Pourquoi-hullbay" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:opacity-85">
              Hullbay
            </span>
          </a>
        </div>

        {/* Center Side: Search trigger */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              <span>Search documentation...</span>
            </div>
          </button>
        </div>

        {/* Mobile Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <SearchIcon className="h-5 w-5" />
        </button>

        {/* Right Side: Options */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white rounded-md transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/Fotetsa/hullbay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-all"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* Search Modal Backdrop */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/50 p-4 pt-[15vh] backdrop-blur-sm">
          {/* Search Box Modal */}
          <div
            ref={modalRef}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 transition-colors"
          >
            {/* Input Header */}
            <div className="flex items-center border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <SearchIcon className="mr-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search documents and sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-white"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ESC
              </button>
            </div>

            {/* Results body */}
            <div className="max-h-[350px] overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="py-6 text-center text-sm text-gray-400">
                  Type to start searching...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-400">
                  No results found for "<span className="font-semibold">{searchQuery}</span>"
                </div>
              ) : (
                <div className="space-y-0.5">
                  {searchResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectResult(item.id)}
                      className="w-full text-left flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 group"
                    >
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </div>
                        {item.pageTitle && (
                          <div className="text-[11px] text-gray-400 font-medium">
                            in {item.pageTitle}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {item.snippet}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-[11px] text-gray-400 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center gap-1.5">
                <span>Navigate:</span>
                <kbd className="rounded border px-1 font-mono text-[9px] dark:border-gray-800">↵</kbd>
                <span>Select</span>
              </div>
              <div>Search powered by local index</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
