import "@rainbow-me/rainbowkit/styles.css";
//import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
//import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

//import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

/*
export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});*/

const ScaffoldEthApp = () => {
  /*
  return (
    <html suppressHydrationWarning className={``}>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );*/
  //in questo return c'è la root del sito
  return (
    <html>
      <body>
        <div>blablabla</div>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
