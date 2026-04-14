import * as React from 'react'
import { Body, Heading, Html, Link, Section, Tailwind, Text } from "@react-email/components";
interface VerificationTemplateProps {
    domain: string
    token: string
}
export function VerificationTemplate({ domain, token }: VerificationTemplateProps) {
    const verificationLink = `${domain}/account/verify?token=${token}`

    return (
        <Html>
            <Tailwind>
                <Body className="bg-slate-50 p-6">
                    <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">

                        <Section className="text-center mb-8">
                            <Heading className="text-3xl text-black font-bold">
                                Email Confirmation
                            </Heading>

                            <Text className="text-base text-black mt-4 leading-relaxed">
                                Thank you for logging in and joining the <strong>SalePlace</strong> community!
                                To activate your account and confirm your email address, please click the button below.
                                This step is required to access all the platform's features.
                            </Text>

                            <Link
                                href={verificationLink}
                                className="
                                inline-flex justify-center items-center
                                rounded-sm
                                text-sm font-medium text-white
                                bg-[#5C54D6]
                                px-6 py-3 mt-6
                                no-underline
                                "
                            >
                                Confirm Email
                            </Link>
                        </Section>

                        <Section className="text-center mt-6">
                            <Text className="text-gray-600 text-sm leading-relaxed">
                                If you have any questions or encounter any difficulties, please don’t hesitate to contact us at{" "}
                                <Link
                                    href="mailto:help@saleplace.com"
                                    className="text-[#5C54D6] underline font-medium"
                                >
                                    help@saleplace.com
                                </Link>.
                            </Text>
                        </Section>

                    </Section>
                </Body>
            </Tailwind>
        </Html>
    )
}