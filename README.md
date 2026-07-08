# todr.me

Personal website of Tomek Drwięga, built with [Astro](https://astro.build/) and deployed at [todr.me](https://todr.me).

> **Important:** All changes to the website content should be reflected in this README. Keep this file in sync with the site.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Redirects to `/projects` |
| Projects | `/projects` | Showcase of open-source projects |
| Blog | `/blog` | Blog posts |
| Contact | `/contact` | Contact information |

## Projects

### Blockchain & Web3

| Project | Description |
|---------|-------------|
| [pvm-decompiler](https://tomusdrw.github.io/pvm-decompiler) ([repo](https://github.com/tomusdrw/pvm-decompiler)) | Decompiler for PVM (Polkadot Virtual Machine) bytecode that emits structured, readable pseudo-code |
| [anan-as](https://tomusdrw.github.io/anan-as) ([repo](https://github.com/tomusdrw/anan-as)) | AssemblyScript implementation of the JAM PVM (64-bit). Powers the PVM backend of the typeberry JAM client |
| [as-lan](https://tomusdrw.github.io/as-lan) ([repo](https://github.com/tomusdrw/as-lan)) | AssemblyScript SDK for building JAM services |
| [wasm-pvm](https://tomusdrw.github.io/wasm-pvm) ([repo](https://github.com/tomusdrw/wasm-pvm)) | Rust compiler translating WebAssembly bytecode into PolkaVM (PVM) bytecode via LLVM IR |
| [eth-opcodevis](https://tomusdrw.github.io/eth-opcodevis) ([repo](https://github.com/tomusdrw/eth-opcodevis)) | Interactive visualiser for Ethereum smart contract bytecode |
| [rust-web3](https://tomusdrw.github.io/rust-web3) ([repo](https://github.com/tomusdrw/rust-web3)) | Rust implementation of Web3.js — an Ethereum JSON-RPC multi-transport client |

### Visualizations & Tools

| Project | Description |
|---------|-------------|
| [relativity-simulations](https://tomusdrw.github.io/relativity-simulations) ([repo](https://github.com/tomusdrw/relativity-simulations)) | Interactive WebGL special relativity simulator with twin paradox and light-signal propagation |
| [trumpet](https://tomusdrw.github.io/trumpet) ([repo](https://github.com/tomusdrw/trumpet)) | Browser-based trumpet tuner with real-time pitch detection and fingering chart |
| [blacksoft.graph.vis](https://tomusdrw.github.io/blacksoft.graph.vis) ([repo](https://github.com/tomusdrw/blacksoft.graph.vis)) | Animated visualisation of graph algorithms using arbor.js |
| [kdtree](https://tomusdrw.github.io/kdtree) ([repo](https://github.com/tomusdrw/kdtree)) | JavaScript k-d tree implementation with interactive demos |
| [rust-type-visualiser](https://tomusdrw.github.io/rust-type-visualiser) ([repo](https://github.com/tomusdrw/rust-type-visualiser)) | Visualise deeply nested Rust generic types from compiler errors |
| [rust-assert-diff](https://tomusdrw.github.io/rust-assert-diff) ([repo](https://github.com/tomusdrw/rust-assert-diff)) | Highlighted diff viewer for Rust test assertion failures |
| [corewords](https://fluffyassist.github.io/corewords) ([repo](https://github.com/FluffyAssist/corewords)) | Polish AAC core words app — 500 key words for alternative communication |

### Libraries & Automation

| Project | Description |
|---------|-------------|
| [fjall-js](https://github.com/tomusdrw/fjall-js) | TypeScript/Node.js bindings for the fjall LSM-tree storage engine with pre-built native binaries |
| [telemach-bot](https://github.com/tomusdrw/telemach-bot) | Telegram bot forwarding messages and transcribed voice notes to email with LLM-generated subjects |
| [github-notifications](https://github.com/tomusdrw/github-notifications) | GitHub notification poller that hydrates content into a JSONL feed for LLM pipelines |

## Blog Posts

| Date | Title | Link |
|------|-------|------|
| 2025-01-20 | Building the Future with FluffyLabs and Typeberry | [todr.me/building-the-future-with-fluffylabs-and-typeberry](https://todr.me/building-the-future-with-fluffylabs-and-typeberry) |
| 2015-01-12 | Jak przeszliśmy od Java do Javascript | [todr.me/jak-przeszlismy-od-java-do-javascript](https://todr.me/jak-przeszlismy-od-java-do-javascript) |

## Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Tech Stack

- [Astro](https://astro.build/) v5 — static site generator
- [Sass](https://sass-lang.com/) — styling
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap generation
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) — RSS feed

## License

[MIT](LICENSE.md)
