import * as httpRequest from '../utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        // gọi API
        // Có 2 cách get API là XMLhttpRequest với fetch

        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type
            }
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
};
