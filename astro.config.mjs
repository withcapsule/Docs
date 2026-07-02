// @ts-check
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.withcapsule.dev",
	integrations: [
		starlight({
			title: "Capsule",
			description:
				"Official documentation for Capsule - a free, anonymous file-sharing tool. Guides for the web, Android, CLI, and self-hosting.",
			social: [],
			head: [
				{
					tag: "script",
					content: `((window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)}),(plausible.init=plausible.init||function(i){plausible.o=i||{}}));plausible.init();`,
				},
				{
					tag: "script",
					attrs: { defer: true, src: "/p.js" },
				},
				{
					tag: "script",
					attrs: {
						defer: true,
						src: "/u.js",
						"data-website-id":
							"c7715639-99fc-407e-9e97-513b63db8410",
						"data-api": "/cdn/u",
					},
				},
				{
					tag: "script",
					attrs: { defer: true, src: "/analytics-events.js" },
				},
				{
					tag: "meta",
					attrs: {
						property: "og:image",
						content:
							"https://docs.withcapsule.dev/Capsule_banner.png",
					},
				},
				{
					tag: "meta",
					attrs: { property: "og:type", content: "website" },
				},
				{
					tag: "meta",
					attrs: { name: "twitter:card", content: "summary_large_image" },
				},
				{
					tag: "meta",
					attrs: {
						name: "twitter:image",
						content:
							"https://docs.withcapsule.dev/Capsule_banner.png",
					},
				},
				{
					tag: "script",
					attrs: { type: "application/ld+json" },
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						name: "Capsule Documentation",
						url: "https://docs.withcapsule.dev",
						description:
							"Official documentation for Capsule — a free, anonymous file-sharing tool.",
						publisher: { "@type": "Person", name: "Sean Singh" },
						about: {
							"@type": "SoftwareApplication",
							name: "Capsule",
							applicationCategory: "UtilitiesApplication",
							operatingSystem: "Web, Android, Linux, macOS, Windows",
							url: "https://withcapsule.dev",
							offers: {
								"@type": "Offer",
								price: "0",
								priceCurrency: "USD",
							},
						},
					}),
				},
			],
			sidebar: [
				{
					label: "Guides",
					items: [
						{
							label: "Getting Started",
							slug: "guides/getting-started",
						},
						{ label: "Android", slug: "guides/android" },
						{ label: "Web", slug: "guides/web" },
						{ label: "CLI", slug: "guides/cli" },
					],
				},
				{
					label: "API",
					items: [{ label: "Reference", slug: "api/reference" }],
				},
				{
					label: "Self-Hosting",
					items: [{ label: "Setup", slug: "self-hosting/setup" }],
				},
				{
					label: "Legal",
					items: [
						{ label: "Privacy Policy", slug: "privacy" },
						{ label: "Terms of Service", slug: "terms" },
					],
				},
			],
		}),
	],
});
