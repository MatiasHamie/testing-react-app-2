import "@testing-library/jest-dom";
import { getGifs } from "../../helpers/getGifs";

describe("Pruebas con getGifs()", () => {
  // la url del getGif esta configurada para traer 10 elementos
  test("Debe traer 10 elementos", async () => {
    const gifs = await getGifs("Dragon Ball");
    expect(gifs.length).toBe(10);
  });

  test("Sin enviar categoria debe devolver un array vacio", async () => {
    const gifs = await getGifs("");
    expect(gifs.length).toBe(0);
  });
});
