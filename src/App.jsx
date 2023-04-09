import { useState, useEffect } from "react";
import axios from "axios";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";

import { colors } from "./colors";
import "./App.css";

// Config option for axios request
const options = {
	method: "GET",
	url: "https://api.api-ninjas.com/v1/quotes",
	headers: {
		"X-Api-Key": "wx6DRkDP3XwH5ALn2PlUnA==DnGZEOxXndCbqwza",
	},
};

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [color, setColor] = useState("#16a085");
	const [newQuote, setNewQuote] = useState(0);

	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				const data = response?.data[0];
				setQuote(data.quote);
				setAuthor(data.author);
				const randIdx = Math.floor(Math.random() * 11);
				setColor(colors[randIdx]);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [newQuote]);

	// Trigger useEffect to fetch new quote
	const handleClick = () => {
		setNewQuote(newQuote + 1);
	};

	return (
		<div className="wrapper" style={{ backgroundColor: `${color}` }}>
			<div className="quote-box">
				<div className="quote-text" style={{ color: `${color}` }}>
					<FaQuoteLeft size={32} />
					<span id="text">{" " + quote}</span>
				</div>
				<div className="quote-author" style={{ color: `${color}` }}>
					<div className="author"> - {author}</div>
				</div>
				<div className="quote-buttons">
					<a
						className="tweet-button"
						rel="noreferrer"
						href={
							"https://twitter.com/intent/tweet?text=" +
							'"' +
							quote +
							'" - ' +
							author
						}
						target="_blank"
						style={{ backgroundColor: `${color}` }}
					>
						<FaTwitter
							size={28}
							color="white"
							style={{ backgroundColor: `${color}` }}
						/>
					</a>
					<button
						className="new-quote"
						style={{ backgroundColor: `${color}` }}
						onClick={handleClick}
					>
						New quote
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
