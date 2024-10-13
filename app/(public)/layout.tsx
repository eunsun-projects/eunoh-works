type BeforeLoginLayoutProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
};

function PublicLayout({ children, modal }: BeforeLoginLayoutProps) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}

export default PublicLayout;
