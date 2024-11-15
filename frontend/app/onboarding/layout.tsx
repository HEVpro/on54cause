export default async function OnboardingLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return <section className="h-full w-full relative">{children}</section>
}
