import { http } from "@/lib/http";

export type CadastrarSalaData = {
    nome: string;
    descricao: string;
    banner: File;
}

export type ListarSalasData = {
    id: number,
    nome: string,
    descricao: string,
    professor: {
        id: number,
        nome: string,
        email: string
    },
}

export class SalasService {
    async cadastrar(data: CadastrarSalaData) {
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

    async listar(): Promise<ListarSalasData[]> {
        const response = await http.get('/salas');

        return response.data;
    }
}

export const salasService = new SalasService();