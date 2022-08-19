
export interface IcheckUserExists {
  check(id: string): Promise<boolean>
}
