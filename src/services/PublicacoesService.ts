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
  dataEntrega?: number,
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

export type PadraoResponse = {
  mensagem: string
}

export type BuscarPublicacaoPorIdRequest = {
  idSala: number,
  idPublicacao: number
}

export type AvailableMimetypes =
  | "text/plain"
  | "text/html"
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export type BuscarPublicacaoPorIdResponse = {
	id: number,
  titulo: string
  dataCadastro: number,
  dataEntrega?: number,
	comentarios: Array<any>,
	curtidas: number,
	conteudo: string,
	anexos: Array<{
    caminho: string,
    mimetype: AvailableMimetypes
  }>,
}

export type ResponderAtividadeRequest = {
  idSala: number,
  idPublicacao: number,
  titulo: string,
  conteudo: string,
  arquivos: File[]
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

  async publicar({ idSala, titulo, conteudo, dataEntrega, arquivos }: PublicarRequest): Promise<PadraoResponse> {
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

  async responderAtividade({ idSala, idPublicacao, titulo, conteudo, arquivos }: ResponderAtividadeRequest): Promise<PadraoResponse> {
    const formData = new FormData();

    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    arquivos.forEach(arquivo => {
      formData.append('arquivos', arquivo);
    });

    const response = await http.post(`/salas/${idSala}/posts/${idPublicacao}/respostas`, formData);

    return response.data;
  }
}

export const publicacoesService = new PublicacoesService();
