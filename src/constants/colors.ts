export const COLOR = {
  tiber: "#173042",
  everglade: "#215738",
  olivine: "#9ec778",
  hippieGreen: "#579663",
  glacier: "#7da1ba",
  calypso: "#246375",
  splash: "#f0e89c",
  chenin: "#dbd963",
  sundance: "#c2b84d",
  coral: "#f48888",
  fireOpal: "#e65c5c",
  apple: "#80bb50",
  tacao: "#ecb183",
  pastelRed: "#ff6262",
  whiteWhale: "#f3f4f5",
};


export const getColorByTemperature = (temperature: number, a: number) => {
  if (temperature > 2.5) {
    return `rgba(230,92,92,${a})`;
  } else if (temperature > 2) {
    return `rgba(194,184,77,${a})`;
  } else if (temperature > 1.5) {
    return `rgba(194,184,77,${a})`;
  } else {
    return `rgba(87,150,99,${a})`;
  }
};
