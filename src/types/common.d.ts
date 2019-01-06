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

export type Project = {
  id: number;
  name: string;
  description: string | null;
  statis: 'running';
  category:
    | 'internal'
    | 'external'
    | 'management' /* management is deprecated, but still present */;
}

export type Task = {
  id?: number;
  description: string | null;
  start: string | null;
  end: string | null;
  duration: number | null;
}
