import useScrollAnimation from "./ScrollAnimation";

function QuoteItem({ quote }) {
	const ref = useScrollAnimation();

	return (
		<div ref={ref} className="quote-item">
			<p><strong>{quote.name}</strong> says:</p>
			<p>"{quote.message}"</p>
			<p><em>Submitted on: {new Date(quote.time).toLocaleString()}</em></p>
		</div>
	);
}

export default function QuoteComponent({ quotes }) {
	return (
		<div className="quote-list">
			{quotes.map((quote, index) => (
				<QuoteItem key={index} quote={quote} />
			))}
		</div>
	);
}