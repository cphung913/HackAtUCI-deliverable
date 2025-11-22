import { useEffect, useRef } from "react";

export default function useScrollAnimation() {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				} else {
					entry.target.classList.remove("visible");
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(ref.current);

		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, []);

	return ref;
}
