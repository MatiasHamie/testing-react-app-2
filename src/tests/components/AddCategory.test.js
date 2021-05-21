import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("Pruebas en <AddCategory />", () => {
  const setCategories = jest.fn(); //simulando una funcion con jest
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    jest.clearAllMocks(); // todas las llamadas q hice en test previos a n funciones las borro
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("Debe mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe cambiar el input", () => {
    const input = wrapper.find("input");
    const value = "Hola Mundo";

    // para simular un click, se debe hacer elemento.simulate('click');
    // pero para simular un onChange, se pone solo la palabra change
    // elemento.simulate('change');
    // Esto va a llamar al handleInputChange, porque a mano estamos mandando un cambio al input
    // prestar atencion de que el handleInputChange recibe un evento, hay q mandarlo
    input.simulate("change", { target: { value } });

    expect(wrapper.find("p").text().trim()).toBe(value);
  });

  test("No debe postear la informacion despues de un submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(setCategories).not.toHaveBeenCalled();
  });

  test("Debe llamar al setCategories y limpiar la caja de texto", () => {
    const newInputValue = "Hola Mundo";

    // cambio el valor del input y hago un submit
    wrapper
      .find("input")
      .simulate("change", { target: { value: newInputValue } });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    // el setCategories se llama dentro del handleSubmit
    expect(setCategories).toHaveBeenCalled();

    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
