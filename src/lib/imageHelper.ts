export const getProductImagePath = (
  productName: string,
  colorName: string,
): string => {
  const basePath = `/src/assets`;

  // iPhone XR
  if (productName.includes("XR")) {
    const color = colorName.toLowerCase();
    if (color === "black") return `${basePath}/XR/xr-black.jpg`;
    if (color === "white") return `${basePath}/XR/xr-white.jpg`;
    if (color === "blue") return `${basePath}/XR/xr-blue.jpg`;
    if (color === "yellow") return `${basePath}/XR/xr-yellow.jpg`;
    if (color === "coral") return `${basePath}/XR/xr-coral.jpg`;
    if (color === "red") return `${basePath}/XR/xr-red.jpg`;
    return `${basePath}/XR/xr-blue.jpg`;
  }

  // iPhone 11 series
  if (productName.includes("11")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "space gray") return `${basePath}/11/11-Pro-space-gray.jpg`;
      if (color === "silver") return `${basePath}/11/11-Pro-silver.jpg`;
      if (color === "gold") return `${basePath}/11/11-Pro-gold.png`;
      if (color === "midnight green")
        return `${basePath}/11/11-Pro-midnight-green.jpg`;
      return `${basePath}/11/11-Pro-silver.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/11/11-black.png`;
      if (color === "white") return `${basePath}/11/11-white.webp`;
      if (color === "green") return `${basePath}/11/11-green.jpg`;
      if (color === "yellow") return `${basePath}/11/11-yellow.jpg`;
      if (color === "red") return `${basePath}/11/11-red.jpg`;
      if (color === "purple") return `${basePath}/11/11-purple.jpg`;
      return `${basePath}/11/11-blue.jpg`;
    }
  }

  // iPhone 12 series
  if (productName.includes("12")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "graphite") return `${basePath}/12/12-Pro-graphite.png`;
      if (color === "silver") return `${basePath}/12/12-Pro-silver.jpg`;
      if (color === "gold") return `${basePath}/12/12-Pro-gold.jpg`;
      if (color === "pacific blue")
        return `${basePath}/12/12-Pro-pacific-blue.png`;
      return `${basePath}/12/12-Pro-silver.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/12/12-black.png`;
      if (color === "white") return `${basePath}/12/12-white.jpg`;
      if (color === "blue") return `${basePath}/12/12-blue.jpg`;
      if (color === "green") return `${basePath}/12/12-green.jpg`;
      if (color === "red") return `${basePath}/12/12-red.jpg`;
      if (color === "purple") return `${basePath}/12/12-purple.png`;
      return `${basePath}/12/12-blue.jpg`;
    }
  }

  // iPhone 13 series
  if (productName.includes("13")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "graphite") return `${basePath}/13/13-Pro-graphite.jpg`;
      if (color === "silver") return `${basePath}/13/13-Pro-silver.jpg`;
      if (color === "gold") return `${basePath}/13/13-Pro-gold.jpg`;
      if (color === "sierra blue")
        return `${basePath}/13/13-Pro-sierra-blue.jpg`;
      if (color === "alpine green")
        return `${basePath}/13/13-Pro-alpine-green.png`;
      return `${basePath}/13/13-Pro-silver.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "midnight") return `${basePath}/13/13-midinight.webp`;
      if (color === "starlight") return `${basePath}/13/13-starlight.webp`;
      if (color === "blue") return `${basePath}/13/13-blue.jpg`;
      if (color === "pink") return `${basePath}/13/13-pink.webp`;
      if (color === "red") return `${basePath}/13/13-red.jpg`;
      if (color === "green") return `${basePath}/13/13-green.jpg`;
      return `${basePath}/13/13-blue.jpg`;
    }
  }

  // iPhone 14 series
  if (productName.includes("14")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "space black")
        return `${basePath}/14/14-Pro-space-black.png`;
      if (color === "silver") return `${basePath}/14/14-Pro-silver.jpg`;
      if (color === "gold") return `${basePath}/14/14-Pro-gold.jpg`;
      if (color === "deep purple")
        return `${basePath}/14/14-Pro-deep-purple.jpg`;
      return `${basePath}/14/14-Pro-silver.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "midnight") return `${basePath}/14/14-midnight.jpg`;
      if (color === "starlight") return `${basePath}/14/14-starlight.jpg`;
      if (color === "blue") return `${basePath}/14/14-blue.jpg`;
      if (color === "purple") return `${basePath}/14/14-purple.jpg`;
      if (color === "red") return `${basePath}/14/14-red.jpg`;
      if (color === "yellow") return `${basePath}/14/14-yellow.webp`;
      return `${basePath}/14/14-blue.jpg`;
    }
  }

  // iPhone 15 series
  if (productName.includes("15")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "black titanium")
        return `${basePath}/15/15-Pro-black-titanium.jpg`;
      if (color === "white titanium")
        return `${basePath}/15/15-Pro-white-titanium.jpg`;
      if (color === "natural titanium")
        return `${basePath}/15/15-Pro-natural-titanium.jpg`;
      if (color === "blue titanium")
        return `${basePath}/15/15-Pro-blue-titanium.jpg`;
      return `${basePath}/15/15-Pro-natural-titanium.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/15/15-black.jpg`;
      if (color === "blue") return `${basePath}/15/15-blue.jpg`;
      if (color === "green") return `${basePath}/15/15-green.webp`;
      if (color === "yellow") return `${basePath}/15/15-yellow.jpg`;
      if (color === "pink") return `${basePath}/15/15-pink.jpg`;
      return `${basePath}/15/15-blue.jpg`;
    }
  }

  // iPhone 16 series
  if (productName.includes("16")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "black titanium")
        return `${basePath}/16/16-Pro-black-titanium.jpg`;
      if (color === "white titanium")
        return `${basePath}/16/16-Pro-white-titanium.png`;
      if (color === "natural titanium")
        return `${basePath}/16/16-Pro-natural-titanium.jpg`;
      if (color === "desert titanium")
        return `${basePath}/16/16-Pro-desert-titanium.jpg`;
      return `${basePath}/16/16-Pro-natural-titanium.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/16/16-black.jpg`;
      if (color === "white") return `${basePath}/16/16-white.jpg`;
      if (color === "pink") return `${basePath}/16/16-pink.jpg`;
      if (color === "teal") return `${basePath}/16/16-teal.jpg`;
      if (color === "ultramarine") return `${basePath}/16/16-ultramarine.png`;
      return `${basePath}/16/16-teal.jpg`;
    }
  }

  // iPhone 17 series
  if (productName.includes("17")) {
    const isPro = productName.includes("Pro");
    const isProMax = productName.includes("Pro Max");

    if (isPro || isProMax) {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/17/17-black.jpg`;
      if (color === "silver") return `${basePath}/17/17-Pro-silver.jpg`;
      if (color === "cosmic orange")
        return `${basePath}/17/17-Pro-cosmic-orange.jpg`;
      if (color === "deep blue") return `${basePath}/17/17-Pro-deep-blue.jpg`;
      return `${basePath}/17/17-Pro-silver.jpg`;
    } else {
      const color = colorName.toLowerCase();
      if (color === "black") return `${basePath}/17/17-black.jpg`;
      if (color === "white") return `${basePath}/17/17-white.jpg`;
      if (color === "lavender") return `${basePath}/17/17-lavender.png`;
      if (color === "sage") return `${basePath}/17/17-sage.jpg`;
      if (color === "mist blue") return `${basePath}/17/17-mist-blue.webp`;
      return `${basePath}/17/17-sage.jpg`;
    }
  }

  return `${basePath}/15/15-blue.jpg`;
};

// Helper to get product image for display
export const getProductImage = (product: any, colorName?: string): string => {
  if (colorName) {
    return getProductImagePath(product.name, colorName);
  }

  // Try to get from colors array first
  if (
    product.colors &&
    Array.isArray(product.colors) &&
    product.colors.length > 0
  ) {
    return product.colors[0].image;
  }

  // Fallback to generated path
  return getProductImagePath(product.name, "Blue");
};
