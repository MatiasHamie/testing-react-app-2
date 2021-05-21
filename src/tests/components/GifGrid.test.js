import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { GifGrid } from "../../components/GifGrid";

/*
    -- Mock: Invocar funciones y simular un valor de retorno de la misma para pruebas sobre el componente --
    1- Importar la funcion que vamos a probar, y hacer un jest.mock('directorio de la funcion')
    Lo que va a hacer eso es LLAMAR a la funcion, por ende si el componente espera un resultado, el test va a tirar error
    El error en este caso seria, que en el data.map() que hacemos para mostrar cada gif, no se puede hacer porque la data es undefined

    2- Simular el valor de retorno de la llamada a esa funcion que mockeamos con nombreFuncion.mockReturnValue()
    Como parámetro, le pasamos la respuesta q esperamos q nos devuelva, por ej, al inicio de este componente, se espera que
    el custom hook useFetchGifs nos devuelva un array de data vacio, junto con el loading en true, hasta que obtenga datos con el fetch

    Entonces la respuesta esperada seria useFetchGifs.mockReturnValue({data: [], loading: true });
    3- se puede hacer un snapshot sin que falle el test ahora
*/
import { useFetchGifs } from "../../hooks/useFetchGifs";
jest.mock("../../hooks/useFetchGifs");

describe("Pruebas en <GifGrid />", () => {
  test("Debe renderizar el componente correctamente", () => {
    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    });

    const wrapper = shallow(<GifGrid category={""} />);
    expect(wrapper).toMatchSnapshot();
  });

  // en este caso simulamos q el mock retorno un objeto como lo queremos, pero con datos ficticios
  // por ej, un array de objetos 'gif', con datos cualquiera, aunque deben ser lo mas parecio a la realidad
  test("Debe mostrar items cuando se cargan imágenes con el useFetchGifs", () => {
    const gifs = [
      {
        id: "ABC",
        url: "https://localhots/cualquier/cosa.jpg",
        title: "Cualquier cosa",
      },
    ];

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    const wrapper = shallow(<GifGrid category={""} />);

    expect(wrapper).toMatchSnapshot();
    // si esta el loading en false, no deberiamos tener el parrafo q diga cargando.. y deberian haber N componentes hijos cargados
    expect(wrapper.find("p").exists()).toBe(false);
    // verificamos si existe un componente viendo si hay un string q sea igual al nombre del componente
    // entonces aca veo, que si hay 2 elementos q trajimos del fetch, tiene q haber 2 componentes gifGrifItem y asi...
    expect(wrapper.find("GifGridItem").length).toBe(gifs.length);
  });
});
