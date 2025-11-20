export default function QuoteList({ quotes }) {
    return (
        <div className="quote-list">
            {quotes.map((quote, index) => (
                <div key={index} className="quote-item">
                    <p><strong>{quote.name}</strong> says:</p>
                    <p>"{quote.message}"</p>
                    <p><em>Submitted on: {new Date(quote.time).toLocaleString()}</em></p>
                </div>
            ))}
        </div>
    );
}