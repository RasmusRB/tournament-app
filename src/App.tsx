import { ThemeProvider } from "@/components/ThemeProvider";
import TournamentApp from "@/components/TournamentApp";

function App() {
  return (
    <ThemeProvider>
      <TournamentApp />
    </ThemeProvider>
  );
}

export default App;
