type Team = {
  id: number;
  name: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  allocations: Array<{ id: number; team: Team }>;
}
