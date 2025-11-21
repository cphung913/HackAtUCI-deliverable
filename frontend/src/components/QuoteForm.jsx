export default function QuoteForm({ quotes }) {
    return (<>{/* TODO: implement custom form submission logic to not refresh the page */}
                <form action="/api/quote" method="post">
                    <label htmlFor="input-name">Name</label>
                    <input type="text" name="name" id="input-name" required />
                    <label htmlFor="input-message">Quote</label>
                    <input type="text" name="message" id="input-message" required />
                    <button type="submit">Submit</button>
                </form></>)
}