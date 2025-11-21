import QuoteComponent from "./QuoteComponent";

export default function QuoteList({ quotes, loading, error }) {
    return (<div className="messages">
				{quotes.length == 0 && !loading && <p>No quotes found.</p>}
				{loading && <p>Loading quotes...</p>}
				{error && <p className="error">Error: {error}</p>}
				<QuoteComponent quotes={quotes}/>
			</div>)
}