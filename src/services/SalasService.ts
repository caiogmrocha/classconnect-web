import { http } from "@/lib/http";

type CadastrarSalaData = {
    nome: string;
    descricao: string;
    banner: File;
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
}

export const salasService = new SalasService();