import axios from 'axios';

export const fetchProducts = async (search = '', page = 2) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/products`, {
            params: { search, page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
