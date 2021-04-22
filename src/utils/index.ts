export const createElement = (type: string, text?: string): HTMLElement => {
  const element = document.createElement(type)
  element.textContent = text
  return element
}

export const attr = (dom: HTMLElement, key: string, value: string) => {
  dom.setAttribute(key, value);
}