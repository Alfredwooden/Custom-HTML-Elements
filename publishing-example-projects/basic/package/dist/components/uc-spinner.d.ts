import type { Components, JSX } from "../types/components";

interface UcSpinner extends Components.UcSpinner, HTMLElement {}
export const UcSpinner: {
  prototype: UcSpinner;
  new (): UcSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
