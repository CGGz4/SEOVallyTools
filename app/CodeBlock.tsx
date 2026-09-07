"use client";

import { useState } from "react";

export function CodeBlock({
  label,
  code,
}: {
  label: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="codeblock">
      <div className="codeblock-head">
        <span>{label}</span>
        <button className="copy-btn" type="button" onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
