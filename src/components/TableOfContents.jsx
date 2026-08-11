import React, { useEffect, useState } from "react";

// Helper to strip markdown symbols for TOC text
const cleanHeadingText = (text) => {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*+/g, '') // bold/italic
    .trim();
};

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  // Parse headings from markdown content
  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    const headingLines = [];
    // Regex to match ## and ### headings
    const regex = /^(##|###)\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1]; // '##' or '###'
      const text = match[2];
      const cleanedText = cleanHeadingText(text);
      const id = cleanedText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headingLines.push({
        id,
        text: cleanedText,
        level: level === "##" ? 2 : 3
      });
    }

    setHeadings(headingLines);
  }, [content]);

  // Scroll spy to highlight active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px", // Trigger when heading reaches upper-middle of viewport
      threshold: 0.1
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all heading elements on the page
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, null, `#${window.location.hash.split('#')[1].split('?')[0]}#${id}`);
      setActiveId(id);
    }
  };

  return (
    <aside className="fixed bottom-0 top-14 right-0 z-30 hidden w-60 border-l border-gray-200 bg-white px-6 py-6 overflow-y-auto lg:block dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-4">
        <h4 className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
          On This Page
        </h4>
        <ul className="space-y-2 text-xs">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block leading-relaxed transition-colors duration-150 ${
                    isActive
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
