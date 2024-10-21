import { http, HttpResponse } from "msw";
import products from "./products.json";

export const handlers = [
  http.get("/api/products", async () => HttpResponse.json(products, { status: 200 })),

  http.get("/api/products/:id", async (req) => {
    const { id } = req.params;
    const product = products.find((prod) => prod.id === parseInt(id));
    
    if (product) {
      return HttpResponse.json(product, { status: 200 });
    } else {
      return HttpResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    }
  }),
];
