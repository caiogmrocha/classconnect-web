import { http } from "@/lib/http"

export type ListarPublicacoesRequest = {
    idSala: number
}

export type ListarPublicacoesResponse = {
    comentarios: Array<{
        id: number,
        conteudo: string,
    }>,
    curtidas: number,
    dataAtualizacao: number,
    dataCadastro: number,
    professor: {
        nome: string,
        id: number
    },
    titulo: string,
    conteudo: string,
    id: number
}

export class PublicacoesService {
    async listar({ idSala }: ListarPublicacoesRequest): Promise<ListarPublicacoesResponse[]> {
        const response = await http.get(`/salas/${idSala}/posts`);

        return response.data;
    }
}

export const publicacoesService = new PublicacoesService();