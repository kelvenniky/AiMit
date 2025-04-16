const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        });

        // Check if the response is okay (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Get the error message from the response
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        // Attempt to parse the response as JSON
        const dataResponse = await response.json();
        return dataResponse;
        
    } catch (error) {
        console.error('Fetch error:', error); // Log the error for debugging
        return null; // Return null or handle the error as needed
    }
};

export default fetchCategoryWiseProduct;