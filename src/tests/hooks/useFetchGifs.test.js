import "@testing-library/jest-dom";
import { useFetchGifs } from "../../hooks/useFetchGifs";
import { renderHook } from "@testing-library/react-hooks";

/* 
    -- EXPLICACION DEL waitForNextUpdate()--
    Según la documentación de React Hooks  waitForNextUpdate lo que hace es retornar una promesa que se resuelve 
    la próxima vez que el hook sea renderizado, generalmente por una actualización del estado resultante de una actualización asíncrona.

    El renderHook lo que hace es crear un componente de React auxiliar para poder ejecutar nuestro hook. Al ser un componente de React, 
    este se actualiza cuando cambiamos el estado del mismo utilizando setState, cosa que hace nuestro useFetchGifs asíncronamente cuando 
    obtiene el resultado de la API. Es por ello que en el primer ejemplo estamos tomando el valor y luego le decimos que espere al setState. 
    De esta forma tomamos el estado antes de ser actualizado con el resultado. De forma similar, en la segunda prueba nos interesa obtener 
    el estado luego de ser actualizado, por lo que utilizamos waitForNextUpdate para indicarle que espere a la actualización del estado y 
    luego tomamos su valor.
*/

// Por si surge la pregunta...
// No se hace match con snapshot porque no hay nada para renderizar dentro del custom hook !
describe("Pruebas sobre Custom Hook useFetchGifs", () => {
  // Primero ver donde se llama al hook y que retorna
  test("Debe retornar el estado inicial ", async () => {
    // Esto no funciona, porq no se puede llamar a un hook por fuera de un functional component
    // es por esto q tenemos q usar una libreria https://react-hooks-testing-library.com/
    // const { data: images, loading } = useFetchGifs("One Punch");

    // Lo que se tiene q hacer es instalar npm install --save-dev @testing-library/react-hooks
    // Luego usar el hook asi
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs("One Punch")
    );

    // ahora si desestructuro como antes
    const { data, loading } = result.current;

    // le pongo el timeout porque en el hook puse un setTimeout, y el waitForNextUpdate se ejecuta antes
    await waitForNextUpdate({ timeout: 2000 });

    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });

  test("Debe retornar un arreglo de imgs y loading en false", async () => {
    // WaitForNextUpdate nos dice cuando cambió el estado de nuestro custom hook,
    // en este caso, seria cuando ya tenemos 10 gifs traidos con el fetch
    // por ende data dejaria de ser un array vacio y el loading pasa a false
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs("One Punch")
    );

    // ANTES de extraer la info
    await waitForNextUpdate();

    const { data, loading } = result.current;

    expect(data.length).toEqual(10);
    expect(loading).toBe(false);
  });
});
