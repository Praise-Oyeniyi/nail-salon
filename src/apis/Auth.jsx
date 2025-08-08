export async function submitData(userData, endpoint) {
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const text = await response.text();
		const jsonStr = text.substring(0, text.indexOf("}") + 1);
		const result = JSON.parse(jsonStr);

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
}
