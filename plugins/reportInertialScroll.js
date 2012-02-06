window.scrollability.reportInertialScroll = (function (e) {
	var raf, target, matches,
		transform, oldTransform = {},
		event = "scrollability-inertia";

	function getTransformValue(element) {
		transform = window.getComputedStyle(element).getPropertyValue("-webkit-transform");
		matches = transform.match(/(-?[0-9]+)/g);

		return {
			translateY : (transform !== 'none' ? parseInt(matches[5], 10) * -1 : 0),
			translateX : (transform !== 'none' ? parseInt(matches[4], 10) * -1 : 0)
		};
	}

	function iOSOnScrollEvent(e) {
		raf = window.requestAnimationFrame(iOSOnScrollEvent);
		transform = getTransformValue(target);

		if (transform.translateY !== oldTransform.translateY || transform.translateX !== oldTransform.translateX) {
			window.scrollability.dispatch(event, target, transform);
		}

		oldTransform = transform;
	}

	function stopiOSScrollPolling() {
		window.cancelAnimationFrame(raf);
	}

	function startiOSScrollPolling(e) {
		target = this;
		target.addEventListener("scrollability-end", stopiOSScrollPolling);

		iOSOnScrollEvent();
	}

	return startiOSScrollPolling;
}());
