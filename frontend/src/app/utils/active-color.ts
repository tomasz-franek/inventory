export class ActiveColor {
  public static activeTextColor(active: boolean): string {
    if (!active) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }

  public static fullUsedColor(used: number): string {
    if (used >= 100) {
      return 'text-danger';
    } else {
      return 'text';
    }
  }
}
