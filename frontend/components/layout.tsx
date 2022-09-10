import Topbar from "./Topbar";


function Layout({ children }: any) {
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
