import 'zone.js';
import { useEffect, useRef } from 'react';
import '@micro-frontends/shared-styles'

export function App() {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      loadModules();
      isMounted.current = true;
    }
  }, []);

  const loadModules = async () => {
    const { bootstrap: bootstrapCart } = await import('cart/Module');
    const { bootstrap: bootstrapBudget } = await import('budget/Module');
    const { bootstrap: bootstrapProducts } = await import('products/Module');
    bootstrapCart(); // load angular cart app
    bootstrapBudget('#budget'); // load vue budget app
    bootstrapProducts(document.getElementById('products') as HTMLElement); // load svelte products app
  };

  return (
    <div className="container">
      <div id="welcome">
        <div className="header">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
          <h1>Dashboard 👋</h1>
        </div>
      </div>
      <div className="apps-container">
        <div id="products" />
        <div id="cart">
          {/* @ts-ignore */}
          <app-cart-component />
        </div>
        <div id="budget" />
      </div>
    </div>
  );
}

export default App;
