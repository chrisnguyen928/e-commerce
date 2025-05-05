import "./globals.css";
import "./fanta.css"
import Head from "./head.js"
import Link from "next/link"
import Cart from "@/components/Cart";
import EmailInput from "@/components/EmailInput";
import ProductsProvider from "@/context/ProductContext";

export const metadata = {
  title: "Caffeine Heaven",
  description: "An online mock coffee store for buying all things coffee and matcha related",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <Head />
        <body>
          <div id="portal"/>
          <div id="app">
            <header>
              <div className="header-content">
                <Link href={'/'}>
                  <h1>Caffeine Heaven</h1>
                </Link>
                <h5 className="mid-text">- Cool Coffee and Matcha Stuff for Everyone -</h5>
                <Cart />
              </div>
            </header>

            <main>
              {children}
            </main>
            <div className="hr" />

            <footer>
              <div className="email-container">
                <h5>Get the latest updates on new coffee and matcha products!</h5>
                <EmailInput />
              </div>
              <div className="links-container">
                <div>
                  <h3>My Other Projects</h3>
                  <Link href={'https://brewly.netlify.app/'} target="blank_">Brewly</Link>
                  <Link href={'https://chris-nguyen-pokedex.netlify.app/'} target="blank_">Pokédex</Link>
                </div>
                <div>
                  <h3>Store</h3>
                  <Link href={'/'}>Home</Link>
                  <Link href={'/cart'}>Cart</Link>
                </div>
                <div>
                  <h3>Support</h3>
                  <Link href={'mailto:chrisnguyen928@gmail.com'}>Contact</Link>
                  <Link href={'/faq'}>FAQs</Link>
                </div>
              </div>
              <div className="socials">
                <p>
                  © <a href="">Chris Nguyen</a> 2025
                  <br />
                  Built with NextJS and <a href="https://www.fantacss.smoljames.com/">FantaCSS</a> stylesheet
                </p>
                <div className="social-links">
                  <Link href={'https://www.linkedin.com/in/christopher-nguyen-86a732194/'} target="blank_">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                  <Link href={'https://github.com/chrisnguyen928'} target="blank_">
                    <i className="fa-brands fa-github"></i>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}
