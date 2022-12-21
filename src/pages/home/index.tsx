import type NextAuthPage from "../../types/NextAuthPage";

const TestPage: NextAuthPage = () => {
  return <h1>Home Page</h1>;
};

TestPage.requireAuth = true;
export default TestPage;
