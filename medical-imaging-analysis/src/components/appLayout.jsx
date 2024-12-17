import Landing from "../pages/landing";
import { SearchProvider } from "../UI/searchContext";
import Nav from "./nav";

export default function AppLayout() {
  return (
    <>
      <SearchProvider>
        <Nav></Nav>
        <Landing />
      </SearchProvider>
    </>
  );
}
