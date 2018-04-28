export default class Filter {
  name: string;
  values: Set<string> = new Set<string>();
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }
}
