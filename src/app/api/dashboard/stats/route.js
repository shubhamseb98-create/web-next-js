export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config';

// Models
import Product from '@/app/models/Product';
import Blog from '@/app/models/Blog';
import Enquiry from '@/app/models/Enquiry';
import Service from '@/app/models/Service';
import Banner from '@/app/models/Banner';
import WhyChoose from '@/app/models/whyChoose';
import Portfolio from '@/app/models/Portfolio';
import User from '@/app/models/User';

import { verifyToken } from '@/app/lib/auth';

export async function GET(request) {
    try {
        await verifyToken(request);
        await connectDB();

        const [
            productCount,
            blogCount,
            enquiryCount,
            serviceCount,
            bannerCount,
            whyChooseCount,
            portfolioCount,
            userCount,
            recentEnquiries
        ] = await Promise.all([
            Product.countDocuments(),
            Blog.countDocuments(),
            Enquiry.countDocuments(),
            Service.countDocuments(),
            Banner.countDocuments(),
            WhyChoose.countDocuments(),
            Portfolio.countDocuments(),
            User.countDocuments(),
            Enquiry.find().sort({ createdAt: -1 }).limit(5).lean()
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                products: productCount,
                blogs: blogCount,
                enquiries: enquiryCount,
                services: serviceCount,
                banners: bannerCount,
                whyChoose: whyChooseCount,
                portfolio: portfolioCount,
                users: userCount
            },
            recentEnquiries
        });
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch dashboard stats",
            error: error.message
        }, { status: 500 });
    }
}
