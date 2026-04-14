import * as React from 'react'
import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { PasswordRecoveryTemplateProps } from '../interfaces/password-recovery.interface';

export function PasswordRecoveryTemplate({ domain, token, metadata }: PasswordRecoveryTemplateProps) {
    const resetLink = `${domain}/recovery/${token}`

    return (
        <Html>
            <Tailwind>
                <Head />
                <Preview>Reset Password</Preview>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">
                        <Section className="text-center mb-8">
                            <Heading className="text-3xl text-black font-bold">Reset Password</Heading>

                            <Text className="text-base text-black mt-2">
                                You have requested a password reset for your account.
                            </Text>
                            <Text className="text-base text-black mt-2">
                                To create a new password, press the button below:
                            </Text>

                            <Link
                                href={resetLink}
                                className="inline-flex justify-center items-center rounded-sm text-sm font-medium text-white  bg-[#5C54D6] px-6 py-2 mt-4 no-underline"
                            >
                                Reset password
                            </Link>

                        </Section>
                        <Section className='bg-gray-100 rounded-lg p-6 mb-6'>
                            <Heading className="text-xl font-semibold text-[#5C54D6] mb-2">
                                Information about your session
                            </Heading>

                            <Text className="text-base text-black">
                                We have detected a request for your account from the following session:
                            </Text>

                            <Section className="text-base text-black mt-2">
                                <Text>🌍 <strong>Location:</strong> {metadata.location.country}, {metadata.location.city}</Text>
                                <Text>💻 <strong>Operating System:</strong> {metadata.device.os}</Text>
                                <Text>🌐 <strong>Browser:</strong> {metadata.device.browser}</Text>
                                <Text>🖧 <strong>IP:</strong> {metadata.ip}</Text>
                            </Section>

                            <Text className="text-sm text-gray-600 mt-3">
                                If you did not request a password reset, you can ignore this email.
                            </Text>
                        </Section>
                        <Section className="text-center mt-8">
                            <Text className="text-gray-600">
                                If you have any questions or encounter any difficulties, please don’t hesitate to contact us at{" "}
                                <Link
                                    href="mailto:help@twichTest.ru"
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