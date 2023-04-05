import axios from "axios";
export default class PixabayAPI {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    async fetchPixabay() {
        const axiosOptions = {
            method: 'get',
            url: 'https://pixabay.com/api/',
            params: {
                key: '35017734-fed2e09b3d8a04f799b9cec3a',
                q: `${this.searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: `${this.page}`,
                per_page: `${this.per_page}`,
            },
        };
        try {
            const response = await axios(axiosOptions);
            const data = response.data;
            this.page += 1;
            return data;
        } catch (error) {
            console.warn(error);
        }
    }
}

    
    
    
