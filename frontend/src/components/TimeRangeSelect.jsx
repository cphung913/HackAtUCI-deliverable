export default function TimeRangeSelect({timeRange, setTimeRange}) {
    return (<><label htmlFor="time-select">Show:</label>
			<select
				id="time-select"
				value={timeRange}
				onChange={(e) => setTimeRange(e.target.value)}>
				<option value="week">Last week</option>
				<option value="month">Last month</option>
				<option value="year">Last year</option>
				<option value="all">All time</option>
			</select></>)
}