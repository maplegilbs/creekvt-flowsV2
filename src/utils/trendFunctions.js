//input current and prior levels as numeric values-> return "rising, falling or steady"
export function trend(current, prior) {
	let currentTrend;
	let trendPercent = (current - prior) / prior;
	switch (true) {
		case trendPercent > .05:
			currentTrend = "rising";
			break;
		case trendPercent < -.05:
			currentTrend = "falling";
			break;
		default:
			currentTrend = "steady";
			break;
	}
	return currentTrend;
};

