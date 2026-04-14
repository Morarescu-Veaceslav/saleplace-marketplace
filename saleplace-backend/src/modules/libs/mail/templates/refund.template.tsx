import * as React from 'react';
import {
  Body,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface RefundTemplateProps {
  orderId: string;
  productName: string;
  price: string;
  currency: string;
  refundId: string;
}

export function RefundTemplate({
  orderId,
  productName,
  price,
  currency,
  refundId,
}: RefundTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Your refund has been completed – SalePlace</Preview>

      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">

            <Section className="text-center mb-8">
              <Heading className="text-3xl text-black font-bold">
                Refund completed 💸
              </Heading>

              <Text className="text-base text-black mt-2">
                Your refund has been successfully processed.
              </Text>

              <Text className="text-base text-black mt-2">
                Thank you for using <b>SalePlace</b>.
              </Text>
            </Section>

            <Section className="bg-gray-100 rounded-lg p-6 mb-6">
              <Heading className="text-xl font-semibold text-[#5C54D6] mb-4">
                Refund details
              </Heading>

              <Text className="text-base text-black">
                <strong>Product:</strong> {productName}
              </Text>

              <Text className="text-base text-black">
                <strong>Refunded amount:</strong> {price} {currency.toUpperCase()}
              </Text>

              <Text className="text-base text-black mt-2">
                <strong>Order ID:</strong> {orderId}
              </Text>

              <Text className="text-base text-black">
                <strong>Refund ID:</strong> {refundId}
              </Text>
            </Section>

            <Section className="text-center mt-8">
              <Text className="text-gray-600">
                If you have any questions, contact us at{' '}
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
