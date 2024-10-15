export function validarInputUsuario(input: string): string {
  const sinTildes = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const soloPermitidos = sinTildes.replace(/[^a-z.]/g, "");
  const sinPuntosPrincipio = soloPermitidos.replace(/^\./, "");
  return sinPuntosPrincipio;
}