export interface createProject {
  id?: number; // O id é gerado automaticamente pelo banco de dados, então é opcional no projetoData
  ownerId: number;
  name: string;
  createdIn: string;
}
