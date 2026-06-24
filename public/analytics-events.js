(function () {
	function track(name, props) {
		window.plausible?.(name, props ? { props } : undefined);
		window.umami?.track(name, props);
	}

	document.addEventListener("click", function (e) {
		const link = e.target.closest("a[href]");
		const btn = e.target.closest("button");

		if (link) {
			const href = link.getAttribute("href") || "";
			const text = link.textContent.trim();
			const isExternal = link.host && link.host !== location.host;

			if (link.closest(".hero")) {
				track("Hero CTA", { label: text });
				return;
			}

			if (isExternal) {
				track("External Link", { url: link.href });
				return;
			}

			if (/\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(href)) {
				const img = link.querySelector("img");
				const label =
					img?.alt ||
					href
						.split("/")
						.pop()
						.replace(/\.[^.]+$/, "");
				track("Screenshot View", { label });
				return;
			}
		}

		if (btn && btn.closest(".expressive-code")) {
			const ec = btn.closest(".expressive-code");
			let heading = null;
			let node = ec;
			outer: while (node) {
				let sib = node.previousElementSibling;
				while (sib) {
					if (/^h[2-6]$/i.test(sib.tagName)) {
						heading = sib.textContent.trim();
						break outer;
					}
					sib = sib.previousElementSibling;
				}
				node = node.parentElement;
			}
			track("Code Copy", { page: location.pathname, ...(heading ? { section: heading } : {}) });
		}
	});
})();
