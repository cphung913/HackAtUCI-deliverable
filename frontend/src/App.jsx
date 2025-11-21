import { useEffect, useState } from "react";
import "./App.css";
import quoteIcon from "./assets/quotebook.png";
import TimeRangeSelect from "./components/TimeRangeSelect";
import QuoteList from "./components/QuoteList";
import QuoteForm from "./components/QuoteForm";

function App() {
	const [timeRange, setTimeRange] = useState("all");
	const [quotes, setQuotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [reload, setReload] = useState(0);

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
	}, [timeRange, reload]);

	return (
		<div className="App">
			<img src={quoteIcon}/>
			<h1>Hack at UCI Tech Deliverable</h1>

		<h2>Submit a quote</h2>
		<QuoteForm onSubmitted={() => setReload((n) => n + 1)} />
		<h2>Previous Quotes</h2>
		<TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
		<QuoteList quotes={quotes} loading={loading} error={error}/>
		</div>
	);
}

export default App;
