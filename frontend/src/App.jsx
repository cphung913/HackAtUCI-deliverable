import React, { useEffect, useState } from "react";
import "./App.css";
import QuoteList from "./components/QuoteList";

function App() {
	const [timeRange, setTimeRange] = useState("all");
	const [quotes, setQuotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch quotes from api
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchQuotes() {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`http://localhost:8000/quotes?time_range=${encodeURIComponent(timeRange)}`, { signal });
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				const data = await response.json();
				setQuotes(data);
			} catch (error) {
				if (error.name !== "AbortError") setError(error.message || "Failed to fetch quotes");
			} finally {
				setLoading(false);
			}
		}

		fetchQuotes();
		return () => controller.abort();
	}, [timeRange]);

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>

			<label htmlFor="time-select">Show:</label>
			<select
				id="time-select"
				value={timeRange}
				onChange={(e) => setTimeRange(e.target.value)}>
				<option value="week">Last week</option>
				<option value="month">Last month</option>
				<option value="year">Last year</option>
				<option value="all">All time</option>
			</select>
			
			<div className="messages">
				{quotes.length == 0 && !loading && <p>No quotes found.</p>}
				{loading && <p>Loading quotes...</p>}
				{error && <p className="error">Error: {error}</p>}
				<QuoteList quotes={quotes} />
			</div>
		</div>
	);
}

export default App;
