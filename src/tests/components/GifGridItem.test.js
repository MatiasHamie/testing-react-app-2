import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { GifGridItem } from "../../components/GifGridItem";

describe("Pruebas en <GifGridItem />", () => {
  const title = "un titulo";
  const url = "https://urldeprueba/algo.jpg";
  const wrapper = shallow(<GifGridItem title={title} url={url} />);

  test("Debe mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe tener un párrafo con el title", () => {
    const tituloUsado = wrapper.find("p").text().trim();

    expect(tituloUsado).toBe(title);
  });

  test("La imagen debe tener la URL y ALT igual al title", () => {
    // tambien se puede hacer const src = wrapper.find("img").prop('src'); y listo
    const { src, alt } = wrapper.find("img").props(); //extraigo las props de la img

    expect(src).toBe(url);
    expect(alt).toBe(title);
  });

  test("Tiene que tener si o si la clase animate__fadeIn", () => {
    const divClassName = wrapper.find("div").prop("className");
    
    expect(divClassName.includes("animate__fadeIn")).toBe(true);
  });
});
