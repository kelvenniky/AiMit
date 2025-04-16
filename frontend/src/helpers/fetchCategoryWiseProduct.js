const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
    try {
        // Construct the URL with query parameters
        const response = await fetch(`${SummaryApi.categoryWiseProduct.url}?category=${encodeURIComponent(category)}`, {
            method: 'GET', // Use GET method
            headers: {
                "Content-Type": "application/json" // Optional for GET requests
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        // Parse the JSON response
        const dataResponse = await response.json();
        return dataResponse;

    } catch (error) {
        console.error('Fetch error:', error);
        return null; // Handle the error in your component
    }
};

export default fetchCategoryWiseProduct;