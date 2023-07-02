export interface PasswordPool {
  hash: () => string
  matched: (hashedPassword: string) => Promise<boolean>
}
