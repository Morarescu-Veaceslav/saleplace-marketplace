import * as React from 'react'
import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { CheckoutTemplateProps } from '../interfaces/send-checkout-email.interface';

export function CheckoutTemplate({
    orderId,
    productName,
    price,
    currency,
    transactionId,
}: CheckoutTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Payment successful – SalePlace</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">

                        {/* HEADER */}
                        <Section className="text-center mb-8">
                            <Heading className="text-3xl text-black font-bold">
                                Payment successful 🎉
                            </Heading>

                            <Text className="text-base text-black mt-2">
                                Thank you for your purchase on <b>SalePlace</b>.
                            </Text>

                            <Text className="text-base text-black mt-2">
                                Your order has been successfully processed.
                            </Text>
                        </Section>

                        {/* ORDER SUMMARY */}
                        <Section className="bg-gray-100 rounded-lg p-6 mb-6">
                            <Heading className="text-xl font-semibold text-[#5C54D6] mb-4">
                                Order summary
                            </Heading>

                            <Text className="text-base text-black">
                                <strong>Product:</strong> {productName}
                            </Text>

                            <Text className="text-base text-black">
                                <strong>Price:</strong> {price} {currency.toUpperCase()}
                            </Text>

                            <Text className="text-base text-black mt-2">
                                <strong>Order ID:</strong> {orderId}
                            </Text>

                            <Text className="text-base text-black">
                                <strong>Transaction ID:</strong> {transactionId}
                            </Text>
                        </Section>

                        {/* FOOTER */}
                        <Section className="text-center mt-8">
                            <Text className="text-gray-600">
                                If you have any questions regarding your order, feel free to contact us at{' '}
                                <Link
                                    href="mailto:help@saleplace.com"
                                    className="text-[#5C54D6] underline font-medium"
                                >
                                    help@saleplace.com
                                </Link>
                                .
                            </Text>

                            <Text className="text-gray-500 text-sm mt-4">
                                © {new Date().getFullYear()} SalePlace. All rights reserved.
                            </Text>
                        </Section>

                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}