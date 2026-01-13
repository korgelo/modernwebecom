
import { ProductListing } from "../types";

export const downloadJSON = (listings: ProductListing[], filename: string) => {
  // Map data to the exact keys requested by the user
  const exportArray = listings.map(l => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    excerpt: l.excerpt,
    category: l.category,
    date: l.date,
    featuredImage: l.featuredImage,
    content: l.content,
    product: {
      name: l.product.name,
      brand: l.product.brand,
      price: l.product.price,
      rating: l.product.rating,
      specs: l.product.specs,
      pros: l.product.pros,
      cons: l.product.cons,
      amazonLink: l.product.amazonLink,
      imageUrl: l.product.imageUrl
    }
  }));

  // Helper to format values recursively
  const formatValue = (val: any, indent: string): string => {
    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      let str = "[\n";
      val.forEach((item, i) => {
        str += `${indent}  ${formatValue(item, indent + "  ")}${i === val.length - 1 ? "" : ","}\n`;
      });
      return str + `${indent}]`;
    } else if (typeof val === "object" && val !== null) {
      let str = "{\n";
      const entries = Object.entries(val);
      entries.forEach(([k, v], i) => {
        // Unquoted key for simple identifiers
        const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
        str += `${indent}  ${keyStr}: ${formatValue(v, indent + "  ")}${i === entries.length - 1 ? "" : ","}\n`;
      });
      return str + `${indent}}`;
    } else if (typeof val === "string") {
      return `"${val.replace(/"/g, '\\"')}"`;
    }
    return String(val);
  };

  const formatAsUnquotedJS = (arr: any[]) => {
    let str = "[\n";
    arr.forEach((obj, i) => {
      str += `  ${formatValue(obj, "  ")}${i === arr.length - 1 ? "" : ","}\n`;
    });
    return str + "]";
  };

  const output = formatAsUnquotedJS(exportArray);
  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url);
};
