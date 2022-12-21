import type NextAuthPage from "../../types/NextAuthPage";

const TestPage: NextAuthPage = () => {
  return <h1>Calendar</h1>;
};

TestPage.requireAuth = true;
export default TestPage;
