/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com',
            'ik.imagekit.io', 
        ], // <-- add this
    },
};

export default nextConfig;
