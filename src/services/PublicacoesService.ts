import { http } from "@/lib/http"
import { format } from "date-fns"

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

export type PublicarRequest = {
  idSala: number,
  titulo: string,
  conteudo: string,
  dataEntrega: Date | null,
  arquivos: File[]
}

export type PublicarResponse = {
  mensagem: string
}

export type BuscarPublicacaoPorIdRequest = {
  idSala: number,
  idPublicacao: number
}

export type BuscarPublicacaoPorIdResponse = {
	id: number,
  titulo: string
  dataCadastro: number,
	comentarios: Array<any>,
	curtidas: number,
	conteudo: string,
	anexos: Array<{
    caminho: string,
  }>,
}

export class PublicacoesService {
  async listar({ idSala }: ListarPublicacoesRequest): Promise<ListarPublicacoesResponse[]> {
    const response = await http.get(`/salas/${idSala}/posts`);

    return response.data;
  }

  async buscarPorId({ idSala, idPublicacao }: BuscarPublicacaoPorIdRequest): Promise<BuscarPublicacaoPorIdResponse> {
    const response = await http.get(`/salas/${idSala}/posts/${idPublicacao}`);

    return response.data;
  }

  async publicar({ idSala, titulo, conteudo, dataEntrega, arquivos }: PublicarRequest): Promise<PublicarResponse> {
    const formData = new FormData();

    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    arquivos.forEach(arquivo => {
      formData.append('arquivos', arquivo);
    });

    if (dataEntrega) {
      formData.append('dataEntrega', format(dataEntrega, 'yyyy-MM-dd HH:mm:ss'));
    }

    const response = await http.post(`/salas/${idSala}/posts`, formData);

    return response.data;
  }
}

export const publicacoesService = new PublicacoesService();
