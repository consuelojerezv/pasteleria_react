import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "./Productos";

describe("Productos", () => {
  it("renderiza la sección de productos", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nuestros Productos/i)).toBeInTheDocument();

    // usar getAllByText y verificar al menos una coincidencia
    const matches = screen.getAllByText(
      /Torta Cuadrada de Chocolate|Torta Circular de Vainilla/i
    );
    expect(matches.length).toBeGreaterThan(0);
  });
});
