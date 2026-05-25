import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChefHat, Sparkles, Utensils, DollarSign, Image, RefreshCw, Bookmark, Printer, Search } from 'lucide-react';
import './styles.css';

const cuisines = ['Greek', 'French', 'American', 'Chinese', 'Italian'];
const focuses = ['Chef\'s choice', 'Seafood', 'Meat', 'Poultry', 'Vegetarian', 'Pasta', 'Seasonal', 'Low food cost', 'Premium'];

const menuData = {
  Greek: [
    {
      name: 'Seared Branzino with Lemon-Oregano Potatoes',
      caption: 'Crisp-skinned branzino over roasted lemon potatoes, finished with fennel, Kalamata olive relish, and herb oil.',
      ingredients: ['Branzino', 'Yukon potatoes', 'Lemon', 'Oregano', 'Fennel', 'Kalamata olives', 'Parsley'],
      cost: 9.75,
      price: 32,
      prep: 'Pan-sear fillets, roast potatoes with lemon and oregano, fold fennel and olives into a bright relish, finish with herb oil.',
      reason: 'Feels upscale, cooks fast during service, and uses familiar Greek flavors with premium presentation.',
      pairing: 'Assyrtiko or a crisp Sauvignon Blanc'
    },
    {
      name: 'Lamb Kefta with Smoked Eggplant Yogurt',
      caption: 'Spiced lamb kefta served with smoked eggplant yogurt, cucumber-herb salad, and warm grilled pita.',
      ingredients: ['Ground lamb', 'Garlic', 'Cumin', 'Mint', 'Eggplant', 'Greek yogurt', 'Cucumber'],
      cost: 7.9,
      price: 27,
      prep: 'Shape and grill lamb kefta, char eggplant for yogurt sauce, toss cucumber salad, and plate with warm pita.',
      reason: 'Profitable, aromatic, easy to prep ahead, and strong as a dinner special or shareable entree.',
      pairing: 'Xinomavro or a medium-bodied red blend'
    },
    {
      name: 'Spanakopita-Crusted Salmon',
      caption: 'Atlantic salmon baked under a spinach, feta, and phyllo crumble with dill lemon beurre blanc.',
      ingredients: ['Salmon', 'Spinach', 'Feta', 'Phyllo', 'Dill', 'Lemon', 'Butter'],
      cost: 8.6,
      price: 30,
      prep: 'Top salmon with spinach-feta mix and phyllo crumble, bake until just cooked, and sauce with dill lemon butter.',
      reason: 'A recognizable Greek idea turned into an upscale seafood entree with good plate appeal.',
      pairing: 'Dry rosé or Pinot Gris'
    }
  ],
  French: [
    {
      name: 'Duck Breast with Cherry-Port Gastrique',
      caption: 'Crisp duck breast with cherry-port gastrique, potato fondant, haricots verts, and thyme jus.',
      ingredients: ['Duck breast', 'Cherries', 'Port', 'Potatoes', 'Haricots verts', 'Thyme', 'Veal stock'],
      cost: 12.4,
      price: 39,
      prep: 'Render duck skin, finish to medium rare, reduce cherry-port sauce, sear potato fondants, and glaze vegetables.',
      reason: 'Classic French luxury, strong margin at premium price, and excellent visual impact.',
      pairing: 'Pinot Noir or Côtes du Rhône'
    },
    {
      name: 'Cod Provençal with Saffron Tomato Broth',
      caption: 'Tender cod in saffron tomato broth with fennel, olives, fingerlings, and rouille toast.',
      ingredients: ['Cod', 'Tomato', 'Saffron', 'Fennel', 'Olives', 'Fingerling potatoes', 'Aioli'],
      cost: 9.2,
      price: 31,
      prep: 'Simmer broth, poach cod gently, warm vegetables, and garnish with rouille toast.',
      reason: 'Elegant but light, ideal for seafood guests, and practical for batch prep.',
      pairing: 'Chablis or dry Provençal rosé'
    },
    {
      name: 'Chicken Roulade with Mushroom Cognac Cream',
      caption: 'Herb-stuffed chicken roulade with wild mushroom Cognac cream, pommes purée, and glazed carrots.',
      ingredients: ['Chicken breast', 'Herbs', 'Mushrooms', 'Cognac', 'Cream', 'Potatoes', 'Carrots'],
      cost: 6.8,
      price: 28,
      prep: 'Stuff and roll chicken, roast or sous-vide, reduce mushroom cream, and serve over smooth potatoes.',
      reason: 'High perceived value with modest ingredient cost and dependable execution.',
      pairing: 'White Burgundy or Chardonnay'
    }
  ],
  American: [
    {
      name: 'Bourbon-Glazed Short Rib with Cheddar Grits',
      caption: 'Slow-braised short rib glazed with bourbon jus over smoked cheddar grits and charred broccolini.',
      ingredients: ['Short rib', 'Bourbon', 'Beef stock', 'Stone-ground grits', 'Cheddar', 'Broccolini', 'Molasses'],
      cost: 11.5,
      price: 36,
      prep: 'Braise short ribs ahead, reduce bourbon glaze, cook cheddar grits, and finish broccolini to order.',
      reason: 'Comfort-driven, upscale, and excellent for prepped service with strong menu appeal.',
      pairing: 'Cabernet Sauvignon or Old Fashioned'
    },
    {
      name: 'Pan-Roasted Halibut with Corn Crab Succotash',
      caption: 'Golden halibut over sweet corn and crab succotash with tomato butter and basil oil.',
      ingredients: ['Halibut', 'Crab', 'Corn', 'Tomato', 'Butter', 'Basil', 'Lima beans'],
      cost: 13.1,
      price: 41,
      prep: 'Sear halibut, fold crab into warm succotash, mount tomato butter, and finish with basil oil.',
      reason: 'Premium seafood special with seasonal American flavors and high check average.',
      pairing: 'Albariño or unoaked Chardonnay'
    },
    {
      name: 'Coffee-Rubbed Pork Chop with Apple Mostarda',
      caption: 'Thick-cut pork chop with coffee spice crust, apple mostarda, sweet potato mash, and cider pan sauce.',
      ingredients: ['Pork chop', 'Coffee', 'Brown sugar', 'Apples', 'Mustard seed', 'Sweet potatoes', 'Cider'],
      cost: 7.4,
      price: 29,
      prep: 'Season and sear pork chop, roast to temp, prepare apple mostarda, and reduce cider pan sauce.',
      reason: 'Memorable flavor profile, affordable food cost, and strong fall/winter appeal.',
      pairing: 'Zinfandel or hard cider'
    }
  ],
  Chinese: [
    {
      name: 'Tea-Smoked Duck with Plum-Hoisin Glaze',
      caption: 'Fragrant tea-smoked duck breast with plum-hoisin glaze, scallion pancakes, and pickled cucumber.',
      ingredients: ['Duck breast', 'Black tea', 'Rice', 'Brown sugar', 'Plum sauce', 'Hoisin', 'Cucumber'],
      cost: 10.9,
      price: 35,
      prep: 'Smoke duck with tea mixture, render skin, glaze with plum hoisin, and serve with pancakes and pickles.',
      reason: 'Upscale Chinese-inspired dish with tableside aroma and strong visual identity.',
      pairing: 'Pinot Noir or jasmine tea cocktail'
    },
    {
      name: 'Ginger-Scallion Sea Bass with XO Fried Rice',
      caption: 'Steamed sea bass with hot ginger-scallion oil, baby bok choy, and XO-style fried rice.',
      ingredients: ['Sea bass', 'Ginger', 'Scallions', 'Soy', 'Bok choy', 'Rice', 'Dried shrimp or bacon'],
      cost: 11.8,
      price: 38,
      prep: 'Steam fish, pour hot aromatics over top, wok-fry rice, and glaze bok choy.',
      reason: 'Light, elegant, and premium while still practical for a dinner service station.',
      pairing: 'Riesling or Grüner Veltliner'
    },
    {
      name: 'Black Pepper Filet with Wok-Seared Mushrooms',
      caption: 'Tender filet tips tossed in black pepper sauce with wok-seared mushrooms, snow peas, and jasmine rice.',
      ingredients: ['Filet tips', 'Black pepper', 'Soy', 'Oyster sauce', 'Mushrooms', 'Snow peas', 'Jasmine rice'],
      cost: 12.2,
      price: 37,
      prep: 'Sear filet quickly, reduce pepper sauce, wok vegetables, and plate with aromatic rice.',
      reason: 'Familiar steak appeal with bold Chinese restaurant flavors and premium pricing.',
      pairing: 'Malbec or black tea highball'
    }
  ],
  Italian: [
    {
      name: 'Lobster Ravioli with Saffron Cream',
      caption: 'Handmade-style lobster ravioli in saffron cream with blistered cherry tomatoes, basil, and lemon pangrattato.',
      ingredients: ['Lobster ravioli', 'Saffron', 'Cream', 'Cherry tomatoes', 'Basil', 'Breadcrumbs', 'Lemon'],
      cost: 10.7,
      price: 34,
      prep: 'Cook ravioli, reduce saffron cream, blister tomatoes, and finish with lemon breadcrumbs.',
      reason: 'Premium Italian special with high perceived value and fast pickup.',
      pairing: 'Vermentino or Prosecco'
    },
    {
      name: 'Osso Buco Milanese with Gremolata',
      caption: 'Braised veal shank with saffron risotto, natural jus, and bright parsley-lemon gremolata.',
      ingredients: ['Veal shank', 'White wine', 'Stock', 'Risotto rice', 'Saffron', 'Parsley', 'Lemon'],
      cost: 13.8,
      price: 42,
      prep: 'Braise shanks ahead, prepare saffron risotto to order, reduce jus, and finish with gremolata.',
      reason: 'Classic, premium, and perfect as a limited dinner special.',
      pairing: 'Barolo or Chianti Classico Riserva'
    },
    {
      name: 'Chicken Saltimbocca with Marsala Mushrooms',
      caption: 'Prosciutto-wrapped chicken with sage, Marsala mushrooms, roasted garlic potatoes, and broccolini.',
      ingredients: ['Chicken cutlets', 'Prosciutto', 'Sage', 'Marsala', 'Mushrooms', 'Potatoes', 'Broccolini'],
      cost: 7.2,
      price: 28,
      prep: 'Wrap chicken with prosciutto and sage, pan-sear, build Marsala mushroom sauce, and plate with potatoes.',
      reason: 'Reliable Italian favorite with strong margin and elegant plate presentation.',
      pairing: 'Sangiovese or Pinot Grigio'
    }
  ]
};

function money(value) {
  return `$${value.toFixed(2)}`;
}

function buildImagePrompt(special, cuisine) {
  return `Professional restaurant food photography of ${special.name}, ${special.caption} Elegant upscale ${cuisine} dinner entree, plated on white ceramic dinnerware, refined garnish, soft natural side lighting, shallow depth of field, realistic texture, high-end restaurant presentation.`;
}

function App() {
  const [cuisine, setCuisine] = useState('Greek');
  const [focus, setFocus] = useState('Chef\'s choice');
  const [request, setRequest] = useState('Generate three upscale dinner specials for tonight.');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const [batch, setBatch] = useState(0);

  const specials = useMemo(() => {
    const pool = [...menuData[cuisine]];
    const rotated = pool.slice(batch % pool.length).concat(pool.slice(0, batch % pool.length));
    return rotated.map((item, index) => ({ ...item, id: `${cuisine}-${batch}-${index}` }));
  }, [cuisine, batch]);

  const chosen = selected || specials[0];
  const foodCostPercent = chosen ? Math.round((chosen.cost / chosen.price) * 100) : 0;

  const saveSpecial = () => {
    if (!chosen) return;
    setSaved((current) => current.some((item) => item.name === chosen.name) ? current : [chosen, ...current]);
  };

  const recipeYield = 4;

  return (
    <main>
      <section className="hero">
        <div className="eyebrow"><ChefHat size={18} /> Chef Specials AI</div>
        <h1>Generate upscale dinner specials your kitchen can actually execute tonight.</h1>
        <p>
          Pick a cuisine, describe what the chef needs, review three polished specials, then open the full recipe,
          prep method, food-cost estimate, plating notes, and image prompt.
        </p>
        <div className="hero-actions">
          <a href="#generator" className="primary"><Sparkles size={18} /> Create Tonight's Specials</a>
          <a href="#recipe" className="secondary"><Utensils size={18} /> View Recipe Format</a>
        </div>
      </section>

      <section id="generator" className="panel generator">
        <div className="section-heading">
          <div>
            <span className="eyebrow small"><Search size={15} /> Special Request</span>
            <h2>Dinner special generator</h2>
          </div>
          <button className="ghost" onClick={() => setBatch((value) => value + 1)}><RefreshCw size={16} /> Regenerate</button>
        </div>

        <div className="form-grid">
          <label>
            Cuisine
            <select value={cuisine} onChange={(event) => { setCuisine(event.target.value); setSelected(null); }}>
              {cuisines.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Kitchen focus
            <select value={focus} onChange={(event) => setFocus(event.target.value)}>
              {focuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="wide">
            Chef request
            <textarea value={request} onChange={(event) => setRequest(event.target.value)} />
          </label>
        </div>

        <div className="context-note">
          AI behavior target: upscale {cuisine} cuisine, focus on {focus.toLowerCase()}, inspired by menu trends without copying recipes.
        </div>
      </section>

      <section className="cards">
        {specials.map((special) => (
          <article key={special.id} className={`card ${chosen?.id === special.id ? 'active' : ''}`}>
            <div className="card-top">
              <span>{cuisine}</span>
              <strong>{Math.round((special.cost / special.price) * 100)}% food cost</strong>
            </div>
            <h3>{special.name}</h3>
            <p>{special.caption}</p>
            <div className="ingredients">
              {special.ingredients.slice(0, 5).map((ingredient) => <em key={ingredient}>{ingredient}</em>)}
            </div>
            <div className="metrics">
              <div><DollarSign size={16} /> Cost <b>{money(special.cost)}</b></div>
              <div>Menu price <b>{money(special.price)}</b></div>
            </div>
            <button onClick={() => setSelected(special)} className="primary full">View Full Recipe</button>
          </article>
        ))}
      </section>

      {chosen && (
        <section id="recipe" className="recipe panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow small"><Utensils size={15} /> Chef-ready recipe</span>
              <h2>{chosen.name}</h2>
            </div>
            <div className="recipe-actions">
              <button className="ghost" onClick={saveSpecial}><Bookmark size={16} /> Save</button>
              <button className="ghost" onClick={() => window.print()}><Printer size={16} /> Print</button>
            </div>
          </div>

          <p className="caption">{chosen.caption}</p>

          <div className="recipe-grid">
            <div>
              <h4>Yield</h4>
              <p>{recipeYield} portions</p>
            </div>
            <div>
              <h4>Estimated cost</h4>
              <p>{money(chosen.cost)} per plate · {foodCostPercent}% food cost</p>
            </div>
            <div>
              <h4>Suggested price</h4>
              <p>{money(chosen.price)}</p>
            </div>
            <div>
              <h4>Pairing</h4>
              <p>{chosen.pairing}</p>
            </div>
          </div>

          <div className="two-col">
            <div>
              <h4>Ingredients</h4>
              <ul>
                {chosen.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                <li>Kosher salt and cracked pepper</li>
                <li>Extra virgin olive oil or clarified butter as needed</li>
                <li>Fresh herbs and lemon for finishing</li>
              </ul>
            </div>
            <div>
              <h4>Preparation</h4>
              <ol>
                <li>Prep all vegetables, sauces, garnishes, and starches before dinner service.</li>
                <li>{chosen.prep}</li>
                <li>Fire the protein to order and rest briefly before plating.</li>
                <li>Warm the starch and vegetables, sauce the plate cleanly, and finish with fresh herbs or acid.</li>
                <li>Check seasoning, wipe the rim, and send immediately.</li>
              </ol>
            </div>
          </div>

          <div className="callout">
            <h4>Why this works as a dinner special</h4>
            <p>{chosen.reason}</p>
          </div>

          <div className="image-prompt">
            <div className="eyebrow small"><Image size={15} /> Image generation prompt</div>
            <p>{buildImagePrompt(chosen, cuisine)}</p>
          </div>
        </section>
      )}

      <section className="panel saved">
        <h2>Saved specials</h2>
        {saved.length === 0 ? <p>No saved specials yet. Choose a dish and click Save.</p> : (
          <div className="saved-list">
            {saved.map((item) => <span key={item.name}>{item.name}</span>)}
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
