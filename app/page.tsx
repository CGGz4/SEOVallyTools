import { MobileNav, SidebarNav } from "./SectionNav";
import { CodeBlock } from "./CodeBlock";

const envExport = `export SEOVALLY_API_KEY='svk_replace_with_your_key'`;

const mcpConfig = `{
  "mcpServers": {
    "seovally": {
      "url": "https://seovally.com/mcp",
      "headers": {
        "Authorization": "Bearer \${SEOVALLY_API_KEY}"
      }
    }
  }
}`;

const initializeCall = `curl https://seovally.com/mcp \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer svk_...' \\
  --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": {"name": "my-agent", "version": "1.0"}
    }
  }'`;

const listToolsCall = `curl https://seovally.com/mcp \\
  -X POST \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer svk_...' \\
  --data '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'`;

const exampleToolCall = `{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_priority_fixes",
    "arguments": {
      "domain": "example.com",
      "max_items": 5
    }
  }
}`;

export default function Home() {
  return (
    <>
      <MobileNav />

      <div className="shell">
        <SidebarNav />
        <main>
          <header className="hero" id="overview">
            <div>
              <h1>Give your agent live, actionable SEO data.</h1>
              <p>
                The SEOVally MCP server lets compatible clients run an audit,
                retrieve a report, compare domains, and turn findings into
                prioritized SEO work — without leaving the agent.
              </p>
              <div className="factstrip">
                <div className="fact">
                  <p className="fact-label">Endpoint</p>
                  <p className="fact-value">https://seovally.com/mcp</p>
                </div>
                <div className="fact">
                  <p className="fact-label">Transport</p>
                  <p className="fact-value">Streamable HTTP · JSON-RPC 2.0</p>
                </div>
                <div className="fact">
                  <p className="fact-label">Authentication</p>
                  <p className="fact-value">Bearer svk_...</p>
                </div>
              </div>
            </div>
            <div className="gauge-wrap" aria-hidden="true">
              <svg viewBox="0 0 200 120" width="180" height="108">
                <path
                  className="gauge-track"
                  d="M20,100 A80,80 0 0 1 180,100"
                />
                <path
                  className="gauge-value"
                  d="M20,100 A80,80 0 0 1 180,100"
                  strokeDasharray="251.2"
                  strokeDashoffset="45.2"
                />
                <text x="100" y="92" textAnchor="middle" className="gauge-num">
                  82
                </text>
              </svg>
              <p className="gauge-caption">
                example.com — AI visibility score
              </p>
            </div>
          </header>

          <section id="get-key">
            <h2>Get an API key</h2>
            <p className="lede">
              Keys are issued per client, so a compromised key can be revoked
              without affecting others.
            </p>
            <ol className="steps">
              <li>
                Create or sign in to your account at{" "}
                <a
                  href="https://seovally.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  seovally.com
                </a>
                .
              </li>
              <li>
                MCP access is available on the Pro and Agency plans. Check
                availability on the{" "}
                <a
                  href="https://seovally.com/plans"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plans
                </a>{" "}
                page.
              </li>
              <li>
                Contact SEOVally through{" "}
                <a
                  href="https://seovally.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  seovally.com/contact
                </a>{" "}
                with the email on your account and the name you want for the
                key — for example, <code>Cursor production</code>.
              </li>
              <li>
                Copy the <code>svk_...</code> key when it&rsquo;s issued.
                It&rsquo;s shown only once, so save it in your agent
                client&rsquo;s secret store or an environment variable.
              </li>
            </ol>
            <div className="note">
              <strong>Handle with care.</strong> Never commit an API key to
              Git or paste it into prompts, issues, or shared configuration
              files. Revoke a key and request a replacement if it&rsquo;s
              exposed.
            </div>
          </section>

          <section id="connect">
            <h2>Connect an MCP client</h2>
            <p className="lede">
              Use your client&rsquo;s remote or Streamable HTTP connection
              flow with these settings.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Setting</th>
                  <th className="mono">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Server URL</td>
                  <td className="mono">https://seovally.com/mcp</td>
                </tr>
                <tr>
                  <td>Authentication header</td>
                  <td className="mono">
                    Authorization: Bearer $&#123;SEOVALLY_API_KEY&#125;
                  </td>
                </tr>
                <tr>
                  <td>Protocol</td>
                  <td className="mono">Streamable HTTP</td>
                </tr>
              </tbody>
            </table>

            <h3>Store the key outside the configuration file</h3>
            <CodeBlock label="bash" code={envExport} />

            <p>
              Most MCP clients use a configuration shaped like this. Check
              your client&rsquo;s documentation for the exact settings screen
              or file location.
            </p>
            <CodeBlock label="json" code={mcpConfig} />
          </section>

          <section id="tools">
            <h2>Available tools</h2>
            <p className="lede">
              A key&rsquo;s scopes are set when it&rsquo;s issued. A tool
              outside those scopes simply isn&rsquo;t listed to the client.
            </p>
            <table>
              <thead>
                <tr>
                  <th className="mono">Tool</th>
                  <th>What an agent can do with it</th>
                  <th className="mono">Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">analyze_domain</td>
                  <td>
                    Run a fresh audit and receive scores, category results,
                    page facts, issue counts, and priority fixes.
                  </td>
                  <td className="mono">analyses</td>
                </tr>
                <tr>
                  <td className="mono">get_priority_fixes</td>
                  <td>
                    Get a short, ordered action list from an on-page and
                    AI-search audit.
                  </td>
                  <td className="mono">analyses</td>
                </tr>
                <tr>
                  <td className="mono">get_report</td>
                  <td>Retrieve the latest stored scorecard for a domain.</td>
                  <td className="mono">reports</td>
                </tr>
                <tr>
                  <td className="mono">compare_reports</td>
                  <td>
                    Benchmark two to five domains using their stored reports,
                    without starting new audits.
                  </td>
                  <td className="mono">reports</td>
                </tr>
                <tr>
                  <td className="mono">list_recent_reports</td>
                  <td>Browse recently analyzed domains and their scores.</td>
                  <td className="mono">reports</td>
                </tr>
                <tr>
                  <td className="mono">list_crawl_history</td>
                  <td>View recent deep-crawl runs for the key owner.</td>
                  <td className="mono">crawls</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="prompts">
            <h2>Good agent prompts</h2>
            <p className="lede">A few starting points once the server is connected.</p>
            <ul className="prompt-list">
              <li>
                &ldquo;Audit example.com, then make a three-item
                implementation plan from the priority fixes.&rdquo;
              </li>
              <li>
                &ldquo;Compare the stored SEO and AI visibility scores for
                example.com, competitor.com, and anothercompetitor.com.&rdquo;
              </li>
              <li>
                &ldquo;Run get_priority_fixes for example.com and turn each
                fix into an engineering ticket with acceptance
                criteria.&rdquo;
              </li>
              <li>
                &ldquo;List my recent reports and identify domains with an AI
                visibility score below 60.&rdquo;
              </li>
            </ul>
          </section>

          <section id="test">
            <h2>Test the connection</h2>
            <p className="lede">
              Replace <code>svk_...</code> with your own key. The response
              should identify the server and its available tools.
            </p>
            <CodeBlock label="bash — initialize" code={initializeCall} />

            <p>Then list the tools allowed by your key:</p>
            <CodeBlock label="bash — tools/list" code={listToolsCall} />
          </section>

          <section id="example">
            <h2>Example tool call</h2>
            <p className="lede">
              This starts a fresh audit. It can take longer than reading a
              stored report, since SEOVally fetches and evaluates the target
              site.
            </p>
            <CodeBlock label="json — tools/call" code={exampleToolCall} />
          </section>

          <section id="security">
            <h2>Security and limits</h2>
            <ul className="flags">
              <li>
                Keys are stored as hashes; the complete key is only displayed
                at issuance.
              </li>
              <li>
                Every call is recorded against the key for operational usage
                tracking.
              </li>
              <li>
                Follow the analysis allowance associated with your SEOVally
                plan.
              </li>
              <li>Do not grant a key more scopes than the agent needs.</li>
              <li>
                Revoke and replace a key immediately if it&rsquo;s exposed.
              </li>
            </ul>
          </section>

          <footer>
            <p>
              Documentation for the SEOVally MCP server. See the project on{" "}
              <a
                href="https://github.com/CGGz4/SEOVallyTools"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
