import * as React from 'react'
import { Body, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

interface AccountDeletionTemplateProps {
    domain: string
}
export function AccountDeletionTemplate({ domain }: AccountDeletionTemplateProps) {
    const registerLink = `${domain}/account/create`
    return (
        <Html>
            <Tailwind>
                <Head />
                <Preview>Account Deletion Confirmation</Preview>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="max-w-[600px] mx-auto bg-white p-8 rounded-md">
                        <Section className="text-center mb-8">
                            <Heading className="text-3xl text-black font-bold">
                                Your account has been successfully deleted
                            </Heading>

                            <Text className="text-base text-black mt-2">
                                Your <b>SalePlace</b> account has been permanently removed from our system.
                                All of your personal data has been deleted and cannot be recovered.
                            </Text>

                            <Text className="text-base text-black mt-2">
                                We're sorry to see you go, but we respect your decision.
                            </Text>
                        </Section>

                        <Section className="bg-gray-100 rounded-lg p-6 text-center mb-6">
                            <Text className="text-sm text-gray-600 mt-2">
                                You will no longer receive notifications or messages from SalePlace.
                            </Text>

                            <Text className="text-base text-black mt-2">
                                If you ever decide to come back, you’re always welcome to create a new account.
                            </Text>

                            <Link
                                href={registerLink}
                                className="inline-flex justify-center items-center rounded-md mt-3 text-sm font-medium text-white bg-[#5C54D6] px-5 py-2 rounded-full"
                            >
                                Rejoin SalePlace
                            </Link>
                        </Section>

                        <Section className="text-center mt-8">
                            <Text className="text-gray-600">
                                Thank you for being part of our community. We hope to see you again in the future.
                            </Text>
                        </Section>
                    </Section>
                </Body>
            </Tailwind>
        </Html>

    )
}