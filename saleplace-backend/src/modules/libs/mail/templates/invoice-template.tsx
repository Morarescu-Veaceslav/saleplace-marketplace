import * as React from 'react'
import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { InvoiceTemplateProps } from '../interfaces/invoice.iterface';

export function InvoiceTemplate({
    invoiceId,
    planName,
    amount,
    currency,
    periodStart,
    periodEnd,
    invoiceUrl,
    invoicePdf,
    issuedAt,
}: InvoiceTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Your SalePlace invoice is ready</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">

                        <Section className="text-center mb-8">
                            <Heading className="text-3xl font-bold text-black">
                                Invoice Paid ✅
                            </Heading>

                            <Text className="text-base mt-2 text-black">
                                Thank you for your subscription on <b>SalePlace</b>.
                            </Text>
                        </Section>

                        <Section className="bg-gray-100 rounded-lg p-6 mb-6">
                            <Heading className="text-xl font-semibold text-[#5C54D6] mb-4">
                                Invoice Details
                            </Heading>

                            <Text>
                                <strong>Plan:</strong> {planName}
                            </Text>

                            <Text>
                                <strong>Amount:</strong>{' '}
                                {(amount / 100).toFixed(2)} {currency.toUpperCase()}
                            </Text>

                            {periodStart && periodEnd && (
                                <Text>
                                    <strong>Billing Period:</strong>{' '}
                                    {periodStart.toLocaleDateString()} –{' '}
                                    {periodEnd.toLocaleDateString()}
                                </Text>
                            )}

                            <Text className="mt-2">
                                <strong>Invoice ID:</strong> {invoiceId}
                            </Text>

                            <Text className="mt-1">
                                <strong>Issued At:</strong> {issuedAt.toLocaleDateString()}
                            </Text>
                        </Section>

                        <Section className="text-center mb-6">
                            <Link
                                href={invoiceUrl}
                                className="inline-block bg-[#5C54D6] text-white px-6 py-3 rounded-md font-medium"
                            >
                                View Invoice
                            </Link>
                        </Section>

                        <Section className="text-center mb-6">
                            <Link
                                href={invoicePdf}
                                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md font-medium"
                            >
                                Download PDF
                            </Link>
                        </Section>

                        <Section className="text-center mt-8 text-gray-500 text-sm">
                            © {new Date().getFullYear()} SalePlace. All rights reserved.
                        </Section>

                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}

