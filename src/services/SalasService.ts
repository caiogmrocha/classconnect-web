import { http } from "@/lib/http";

export type CadastrarSalaRequest = {
    nome: string;
    descricao: string;
    banner: File;
}

export type ListarSalasResponse = {
    id: number,
    nome: string,
    descricao: string,
    professor: {
        id: number,
        nome: string,
        email: string
    },
}

export type BuscarSalaPorIdRequest = {
    id: number;
}

export class SalasService {
    async cadastrar(data: CadastrarSalaRequest) {
        const formData = new FormData();
     
        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('banner', data.banner);
     
        const response = await http.post('/salas', formData, {
            headers: {
                'Accept': 'application/json',
            }
        });
     
        return response.data;
    }

    async listar(): Promise<ListarSalasResponse[]> {
        const response = await http.get('/salas');

        return response.data;
    }

    async buscarPorId({ id }: BuscarSalaPorIdRequest): Promise<ListarSalasResponse> {
        const response = await http.get(`/salas/${id}`);

        return response.data;
    }
}

export const salasService = new SalasService();