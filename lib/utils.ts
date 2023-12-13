function generateUniqueKey(text: string, index: number): string {
  return `${text}_${index}`;
}

export { generateUniqueKey };
