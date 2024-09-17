const SearchPage = () => {
    return (
        <main className="p-10">
            <div className="flex items-center justify-between gap-x-4 mb-6">
                <h1 className="text-4xl font-bold">Search</h1>
                {/* <UploadDocumentBtn /> */}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* {documents == undefined &&
                    new Array(6).fill("").map((_, index) => <LoadingCard key={index} />)
                }
                {documents?.map((doc, index) => {
                    return <DocumentCard key={index} document={doc} />
                })} */}
            </div>
        </main>
    );
}

export default SearchPage;