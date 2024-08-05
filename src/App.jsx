import Header from "@/components/Header/Header";
import AppRoutes from "@/routes";

const App = () => {
  return (
    <div className="dark:bg-black h-full font-spaceGrotesk">
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;
