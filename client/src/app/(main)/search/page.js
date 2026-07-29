import SearchResults from "@/pages/Search/searchResults";


// Server Component se metadata perfectly export hoga
export const metadata = {
  title: "Search Results",
  robots: {
    index: false, // Google isko index nahi karega
    follow: true, // Internal blog links follow karega
  },
};

export default function SearchPage() {
  return <SearchResults/>
}
