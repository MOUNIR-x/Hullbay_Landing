import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { sidebarConfig } from "../utils/docs";

export default function Sidebar({ currentDocId }) {
  // Store collapsed state for categories by title. By default, everything is expanded.
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (title) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside className="fixed bottom-0 top-14 left-0 z-30 hidden w-64 border-r border-gray-200 bg-white px-4 py-6 overflow-y-auto md:block dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      <nav className="space-y-6">
        {sidebarConfig.map((category) => {
          const isCollapsed = !!collapsedCategories[category.title];
          const hasActiveItem = category.items.some(item => item.id === currentDocId);
          
          return (
            <div key={category.title} className="space-y-1.5">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.title)}
                className="flex w-full items-center justify-between py-1 text-left text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <span>{category.title}</span>
                <span className="text-gray-400 dark:text-gray-500">
                  {isCollapsed ? (
                    <ChevronRight className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </span>
              </button>

              {/* Category Items */}
              {!isCollapsed && (
                <div className="space-y-1 pl-1">
                  {category.items.map((item) => {
                    const isActive = item.id === currentDocId;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex w-full items-center rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                          isActive
                            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
