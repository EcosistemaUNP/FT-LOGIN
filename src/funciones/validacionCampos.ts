export const capitalizeFirstLetter = (sentence: string): string => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export const capitalizeWords = (sentence: string): string => {
  const exceptions = ["de", "del", "las", "los", "la", "el"];
  return sentence
    .split(" ")
    .map((word) => {
      return exceptions.includes(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const removeIntermediateSpaces = (sentence: string): string => {
  return sentence.replace(/\s+/g, " ");
};

export const removeAllSpaces = (sentence: string): string => {
  return sentence.replace(/\s+/g, "");
};

export const validateSpecialChar = (sentence: string): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$/.test(sentence);
};

export const validateSpecialCharWithSpcs = (sentence: string): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]*$/.test(sentence);
};

export const validateSpecialCharWithNumsAndSpcsNot = (
  sentence: string
): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s-]*$/.test(sentence);
};

export const validateSpecialCharWithNumsAndSpcs = (
  sentence: string
): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ.,0-9\s-]*$/.test(sentence);
};

export const lowercaseSentence = (sentence: string): string => {
  return sentence.toLowerCase();
};

export const validateOnlyLetters = (sentence: string): boolean => {
  return /^[a-z]+\.[a-z]+$/.test(sentence);
};

// revisar !!!!!
export const validateOnlyNumbers = (sentence: string): boolean => {
  return /^\d+$/.test(sentence);
};

export const validateEmail = (sentence: string): string => {
  return removeAllSpaces(sentence)
    .replace(/[ñÑ]/g, "")
    .replace(/[^a-zA-Z0-9@._-]/g, "")
    .toLowerCase();
};

// --------> Función experimental
// export const validarEstructuraEspanol = (sentence: string): boolean => {
//     if (sentence.trim().length < 2) {
//         return false;
//     }

//     const palabras = sentence.trim().split(/\s+/);

//     const diptongosCrecientes = /(ua|ue|uo|ia|ie|io)/i;
//     const diptongosDecrecientes = /(ai|ei|oi|au|eu|ou)/i;
//     const diptongosHomogeneos = /(iu|ui)/i;
//     const hiatos = /(a[íì]|e[íì]|o[íì]|a[úù]|e[úù]|o[úù])/i;

//     const adiptongos = /([aeiou]{4})/i;

//     const silabas = /([bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*)/i;
//     const bisilabas = /([bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*)/i;
//     const trisilabas = /([bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*[aeiou]+[bcdfghjklmnñpqrstvwxyz]*)/i;

//     const secuenciaInvalida = /[^aeiouáéíóúüñbcdfghjklmnñpqrstvwxyz\s]/i;

//     return palabras.some(palabra =>
//         diptongosCrecientes.test(palabra) ||
//         diptongosDecrecientes.test(palabra) ||
//         diptongosHomogeneos.test(palabra) ||
//         hiatos.test(palabra) ||
//         adiptongos.test(palabra) ||
//         silabas.test(palabra) ||
//         bisilabas.test(palabra) ||
//         trisilabas.test(palabra) ||
//         secuenciaInvalida.test(palabra)
//     );
// };
