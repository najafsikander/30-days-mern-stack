type Role = {
  role: string,
  can: string[]
}

type Roles = Role[];



  export const roles:Roles = [
    {
      role: 'admin',
      can: ['create', 'edit', 'delete', 'view']
    },
    {
      role: 'editor',
      can: ['create', 'edit', 'view']
    },
    {
      role: 'viewer',
      can: ['view'],
    }
  ]