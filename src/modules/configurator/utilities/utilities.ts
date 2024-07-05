export const getPropertyTypeName = (propertyName: string) => {
    switch (propertyName) {
      case "color":
        return "Paint color";
      case "wheels":
        return "Wheels";
      case "interior_variants":
        return "Color";
      default:
        return;
    }
  };