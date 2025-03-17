// import React from "react";
import {render,screen} from "@testing-library/react";
import {describe,it,expect} from "vitest";
import Message from "./Message";
import "@testing-library/jest-dom/vitest";

describe("This component shows a message on screen",() => {
    it("It renders default message", () => {
        render(<Message/>);
        expect(screen.getByText("Message is: Hello World!")).toBeInTheDocument();
    });

    it("It renders custom message", () => {
        render(<Message message="I love food!"/>);
        const text = screen.getByText("Message is: I love food!")
        expect(text).toBeInTheDocument();
    });
});

