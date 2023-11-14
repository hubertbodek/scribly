export const createDefaultHandleFromEmail = (email: string) => {
  return email
    .split('@')[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
}
