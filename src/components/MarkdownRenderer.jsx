import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Inline state-based copy button
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-gray-400 hover:text-white transition-colors duration-150"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const resolveDocLink = (href) => {
  if (!href?.startsWith("/docs/")) return href;
  let path = href.replace(/^\/docs\//, "");
  if (path === "concepts") path = "Concepts";
  return `#${path}`;
};

// Transform Docusaurus-style admonitions into simple HTML
const transformDocusaurusCallouts = (content) => {
  if (!content) return "";
  return content.replace(/:::(info|warning|note|danger|tip)(?:[ \t]+([^\n]*))?\n([\s\S]*?)\n:::/g, (match, type, title, body) => {
    const header = title ? title.trim() : type.toUpperCase();
    return `<div class="admonition admonition-${type}" data-title="${header}">\n\n${body}\n\n</div>`;
  });
};

export default function MarkdownRenderer({ rawContent }) {
  const processedContent = transformDocusaurusCallouts(rawContent);

  // Custom components for markdown rendering matching Medusa UI
  const components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return (
        <h2
          id={id}
          className="group relative text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-100 dark:border-gray-800 pb-1.5"
        >
          <a
            href={`#${window.location.hash.split('#')[1]?.split('?')[0] || "" }#${id}`}
            className="absolute -left-5 top-0.5 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity pr-2 font-normal"
          >
            #
          </a>
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return (
        <h3
          id={id}
          className="group relative text-base font-bold tracking-tight text-gray-900 dark:text-white mt-6 mb-3"
        >
          <a
            href={`#${window.location.hash.split('#')[1]?.split('?')[0] || "" }#${id}`}
            className="absolute -left-5 top-0.5 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity pr-2 font-normal"
          >
            #
          </a>
          {children}
        </h3>
      );
    },
    p: ({ children }) => (
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 my-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-5 my-4 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 my-4 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    a: ({ href, children }) => {
      const resolvedHref = resolveDocLink(href);
      const isExternal = resolvedHref?.startsWith("http");
      return (
        <a
          href={resolvedHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
        >
          {children}
        </a>
      );
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const codeText = String(children).replace(/\n$/, "");

      if (inline) {
        return (
          <code
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-mono text-[12px] font-semibold transition-colors"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm font-mono text-sm bg-gray-950">
          <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2 text-[11px] text-gray-400">
            <span>{match ? match[1].toUpperCase() : "CODE"}</span>
            <CopyButton text={codeText} />
          </div>
          <div className="p-4 overflow-x-auto text-[13px] text-gray-200 leading-relaxed font-mono">
            <pre className="m-0 leading-relaxed font-mono">
              <code>{codeText}</code>
            </pre>
          </div>
        </div>
      );
    },
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left border-collapse text-sm text-gray-600 dark:text-gray-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/35 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-top">
        {children}
      </td>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-4 italic text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {children}
      </blockquote>
    ),
    div: ({ className, children, ...props }) => {
      // Custom callout rendering
      if (className && className.startsWith("admonition")) {
        const type = className.split("admonition-")[1] || "note";
        const title = props["data-title"] || type.toUpperCase();

        let borderColor = "border-blue-500 bg-blue-50/30 dark:bg-blue-950/10";
        let textColor = "text-blue-800 dark:text-blue-200";
        let titleColor = "text-blue-900 dark:text-blue-100";

        if (type === "warning") {
          borderColor = "border-amber-500 bg-amber-50/30 dark:bg-amber-950/10";
          textColor = "text-amber-800 dark:text-amber-200";
          titleColor = "text-amber-900 dark:text-amber-100";
        } else if (type === "danger") {
          borderColor = "border-red-500 bg-red-50/30 dark:bg-red-950/10";
          textColor = "text-red-800 dark:text-red-200";
          titleColor = "text-red-900 dark:text-red-100";
        } else if (type === "tip" || type === "note") {
          borderColor = "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10";
          textColor = "text-emerald-800 dark:text-emerald-200";
          titleColor = "text-emerald-900 dark:text-emerald-100";
        }

        return (
          <div className={`my-6 rounded-lg border-l-4 p-4 ${borderColor} ${textColor}`}>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${titleColor}`}>
              {title}
            </div>
            <div className="text-[13px] leading-relaxed admonition-body">{children}</div>
          </div>
        );
      }
      return <div className={className} {...props}>{children}</div>;
    }
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
